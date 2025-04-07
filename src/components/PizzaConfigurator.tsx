import React, { useState } from "react";
import ConfigurationForm, { PizzaConfiguration } from "./ConfigurationForm";
import RecipeDisplay from "./RecipeDisplay";
import ShoppingList from "./ShoppingList";
import ActionButtons from "./ActionButtons";
import ConfigSummary from "./ConfigSummary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Pizza, ShoppingBasket, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { convertMeasurementsInText } from "../lib/unitConversions";

interface ShoppingListItem {
  name: string;
  amount: string;
  checked: boolean;
}

interface Recipe {
  title: string;
  preDoughSteps?: string[];
  preDoughDate?: string;
  mainDoughSteps?: string[];
  mainDoughDate?: string;
  bakingInstructions: string;
  bakingDate?: string;
  eatingDate?: string;
  totalTime: string;
}

const PizzaConfigurator: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<"metric" | "us">("metric");
  const [config, setConfig] = useState<PizzaConfiguration>({
    pizzaCount: 8,
    pizzaSize: "30-32cm (280g Dough ball)",
    preparationTime: "Predough a day before",
    hydration: "65%",
    yeastType: "Dry yeast",
    predoughPercentage: "40%",
    kneadingMethod: "By Hand",
    ovenType: "Pizza oven stainless steel",
    maxTemperature: "über 350°C",
    pizzaSurface: "Not necessary",
    ovenSize: "60x60cm",
    toppings: [],
    eatingDate: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0], // Tomorrow
    eatingTime: "20:00",
  });

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("configuration");
  const [isPastStartTime, setIsPastStartTime] = useState(false);

  const handleConfigChange = (newConfig: PizzaConfiguration) => {
    setConfig(newConfig);
    checkIfStartTimeIsPast(newConfig);
  };

  // Check if the start time for the first task is in the past
  const checkIfStartTimeIsPast = (configToCheck: PizzaConfiguration) => {
    const now = new Date();
    const { preDoughDate, mainDoughDate } = calculateDates(configToCheck, true);

    // Get the earliest start time (either pre-dough or main dough)
    let earliestDate: Date | null = null;

    if (
      configToCheck.preparationTime === "Predough a day before" ||
      configToCheck.preparationTime === "8h before Eating Time"
    ) {
      earliestDate = preDoughDate as Date;
    } else {
      earliestDate = mainDoughDate as Date;
    }

    // Check if the earliest date is in the past
    if (earliestDate && earliestDate < now) {
      setIsPastStartTime(true);
    } else {
      setIsPastStartTime(false);
    }
  };

  const handleGenerateRecipe = () => {
    setIsGenerating(true);

    // Check if start time is in the past
    checkIfStartTimeIsPast(config);

    // Simulate API call or calculation
    setTimeout(() => {
      // Calculate all the dates based on eating time
      const { preDoughDate, mainDoughDate, bakingDate, eatingDate } =
        calculateDates(config);

      // Split preparation steps into pre-dough and main dough steps
      const { preDoughSteps, mainDoughSteps } = splitPreparationSteps(config);

      // Generate recipe based on configuration
      const generatedRecipe = {
        title: `Pizza Rezept für ${config.pizzaCount} Pizzen mit ${getBallSizeFromConfig(config.pizzaSize).diameter}`,
        preDoughSteps,
        preDoughDate,
        mainDoughSteps,
        mainDoughDate,
        bakingInstructions: generateBakingInstructions(config),
        bakingDate,
        eatingDate,
        totalTime: calculateTotalTime(config),
      };

      // Generate shopping list based on configuration
      const generatedShoppingList = generateShoppingList(config);

      setRecipe(generatedRecipe);
      setShoppingList(generatedShoppingList);
      setIsGenerating(false);
      setActiveTab("recipe");

      // Scroll to top of the page when recipe is generated
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  const handleToggleShoppingItem = (index: number) => {
    const updatedList = [...shoppingList];
    updatedList[index].checked = !updatedList[index].checked;
    setShoppingList(updatedList);
  };

  // Helper functions for recipe generation
  const getBallSizeFromConfig = (
    pizzaSize: string,
  ): { size: string; weight: number; diameter: string } => {
    if (pizzaSize.includes("180g"))
      return { size: "180g", weight: 180, diameter: "Ø20-25cm" };
    if (pizzaSize.includes("210g"))
      return { size: "210g", weight: 210, diameter: "Ø25-28cm" };
    if (pizzaSize.includes("240g"))
      return { size: "240g", weight: 240, diameter: "Ø28-30cm" };
    if (pizzaSize.includes("280g"))
      return { size: "280g", weight: 280, diameter: "Ø30-32cm" };
    return { size: "210g", weight: 210, diameter: "Ø25-28cm" }; // Default
  };

  // Calculate total dough weight
  const calculateTotalDoughWeight = (config: PizzaConfiguration): number => {
    const { weight } = getBallSizeFromConfig(config.pizzaSize);
    return weight * config.pizzaCount;
  };

  // Check if start time is in the past when component mounts
  React.useEffect(() => {
    checkIfStartTimeIsPast(config);
  }, []);

  // Calculate flour amount based on total dough weight and hydration
  const calculateFlourAmount = (
    totalDoughWeight: number,
    hydrationPercentage: number,
  ): number => {
    // Formula: flour = totalDoughWeight / (1 + hydration + yeast + salt + oil + honey)
    // Simplified approximation: flour = totalDoughWeight / (1 + hydration)
    const hydration = hydrationPercentage / 100;
    return Math.round(totalDoughWeight / (1 + hydration));
  };

  // Calculate water amount based on flour and hydration
  const calculateWaterAmount = (
    flourAmount: number,
    hydrationPercentage: number,
  ): number => {
    return Math.round(flourAmount * (hydrationPercentage / 100));
  };

  // Calculate yeast amount based on total dough weight
  const calculateYeastAmount = (
    totalDoughWeight: number,
    yeastType: string,
  ): number => {
    if (yeastType === "Dry yeast") {
      return totalDoughWeight < 5000 ? 5 : 10;
    } else {
      // Fresh yeast
      return totalDoughWeight < 5000 ? 10 : 21;
    }
  };

  // Calculate salt amount based on flour weight
  const calculateSaltAmount = (flourAmount: number): number => {
    return Math.round(flourAmount / 35);
  };

  // Calculate bowl size in liters
  const calculateBowlSize = (doughWeight: number): number => {
    return Math.round(((doughWeight * 2) / 1000) * 10) / 10; // Round to 1 decimal place
  };

  // Calculate preheating time based on oven type and surface size
  const calculatePreheatTime = (
    ovenType: string,
    ovenSize: string,
  ): { minutes: number; formatted: string } => {
    let baseMinutes = 0;

    // Base preheating time by oven type
    if (ovenType === "Kitchen oven") baseMinutes = 45;
    else if (ovenType === "Grill") baseMinutes = 30;
    else if (ovenType === "Pizza oven stainless steel") baseMinutes = 30;
    else if (ovenType === "Pizza oven stone") baseMinutes = 180;

    // Multiplier based on surface size
    let multiplier = 1;
    if (ovenSize === "60x60cm") multiplier = 1.5;
    else if (ovenSize === "80x80cm") multiplier = 2;
    else if (ovenSize === "100x100cm") multiplier = 2.5;

    const minutes = Math.round(baseMinutes * multiplier);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    let formatted = "";
    if (hours > 0) {
      formatted = `${minutes}min (${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ""})`;
    } else {
      formatted = `${minutes}min`;
    }

    return { minutes, formatted };
  };

  // Calculate baking time based on oven type and temperature
  const calculateBakingTime = (
    ovenType: string,
    maxTemperature: string,
  ): number => {
    if (maxTemperature === "250-275°C") return 7;
    if (maxTemperature === "275-300°C") return 5;
    if (maxTemperature === "über 350°C") return 2;
    if (maxTemperature === "300-350°C") return 3;
    return 7; // Default
  };

  // Calculate dates for each step based on eating time
  const calculateDates = (
    config: PizzaConfiguration,
    returnDateObjects = false,
  ) => {
    const eatingDateTime = new Date(
      `${config.eatingDate}T${config.eatingTime}:00`,
    );

    // Format a date to a readable string
    const formatDate = (date: Date): string => {
      const days = [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
      ];
      const day = days[date.getDay()];
      const dateStr = date.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const timeStr = date.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${day}, ${dateStr}, ${timeStr} Uhr`;
    };

    // Calculate baking start time (60 minutes before eating)
    const bakingDate = new Date(eatingDateTime);
    bakingDate.setMinutes(bakingDate.getMinutes() - 60);

    let preDoughDate, mainDoughDate;

    if (config.preparationTime === "Predough a day before") {
      // Pre-dough should be made the day before
      preDoughDate = new Date(eatingDateTime);
      preDoughDate.setDate(preDoughDate.getDate() - 1);
      preDoughDate.setHours(20, 0, 0, 0); // Set to 8 PM the day before

      // Main dough should be started 3 hours before baking
      mainDoughDate = new Date(bakingDate);
      mainDoughDate.setHours(mainDoughDate.getHours() - 3);
    } else if (config.preparationTime === "8h before Eating Time") {
      // Pre-dough should be made 8 hours before eating
      preDoughDate = new Date(eatingDateTime);
      preDoughDate.setHours(preDoughDate.getHours() - 8);

      // Main dough should be started 2 hours before baking
      mainDoughDate = new Date(bakingDate);
      mainDoughDate.setHours(mainDoughDate.getHours() - 2);
    } else {
      // For other preparation methods, just set main dough time
      mainDoughDate = new Date(bakingDate);
      mainDoughDate.setHours(mainDoughDate.getHours() - 2);
    }

    if (returnDateObjects) {
      return {
        preDoughDate: preDoughDate,
        mainDoughDate: mainDoughDate,
        bakingDate: bakingDate,
        eatingDateTime: eatingDateTime,
      };
    }

    return {
      preDoughDate: preDoughDate ? formatDate(preDoughDate) : undefined,
      mainDoughDate: formatDate(mainDoughDate),
      bakingDate: formatDate(bakingDate),
      eatingDate: formatDate(eatingDateTime),
    };
  };

  // Split preparation steps into pre-dough and main dough steps
  const splitPreparationSteps = (config: PizzaConfiguration) => {
    const allSteps = generatePreparationSteps(config);
    let preDoughSteps: string[] = [];
    let mainDoughSteps: string[] = [];

    if (config.preparationTime === "Predough a day before") {
      // Find the index of "Ein Tag Später..." or similar transition step
      const transitionIndex = allSteps.findIndex(
        (step) =>
          step.includes("Ein Tag Später") ||
          step.includes("nächsten Tag") ||
          step.includes("Kühlschrank nehmen"),
      );

      if (transitionIndex !== -1) {
        // Find the index of the step that puts the dough in the refrigerator
        const refrigeratorIndex = allSteps.findIndex((step) =>
          step.includes("Kühlschrank geben"),
        );

        // Split the steps at the transition point, ensuring the refrigerator step is included in preDoughSteps
        if (refrigeratorIndex !== -1 && refrigeratorIndex < transitionIndex) {
          preDoughSteps = allSteps.slice(0, refrigeratorIndex + 1);
          mainDoughSteps = allSteps.slice(transitionIndex);
        } else {
          preDoughSteps = allSteps.slice(0, transitionIndex);
          mainDoughSteps = allSteps.slice(transitionIndex);
        }
      } else {
        // If no transition found, make a best guess split at 1/3 of the steps
        const splitPoint = Math.floor(allSteps.length / 3);
        preDoughSteps = allSteps.slice(0, splitPoint);
        mainDoughSteps = allSteps.slice(splitPoint);
      }
    } else if (config.preparationTime === "8h before Eating Time") {
      // For 8h preparation, find the step that mentions "6h zugedeckt"
      const restStepIndex = allSteps.findIndex((step) =>
        step.includes("6h zugedeckt"),
      );

      if (restStepIndex !== -1) {
        // Include the rest step in the pre-dough steps
        preDoughSteps = allSteps.slice(0, restStepIndex + 1);
        mainDoughSteps = allSteps.slice(restStepIndex + 1);
      } else {
        // Fallback if the specific step isn't found
        const splitPoint = Math.floor(allSteps.length / 3);
        preDoughSteps = allSteps.slice(0, splitPoint);
        mainDoughSteps = allSteps.slice(splitPoint);
      }
    } else {
      // For methods without pre-dough, all steps are main dough steps
      mainDoughSteps = allSteps;
    }

    return { preDoughSteps, mainDoughSteps };
  };

  const generatePreparationSteps = (config: PizzaConfiguration): string[] => {
    const totalDoughWeight = calculateTotalDoughWeight(config);
    const hydrationPercentage = parseInt(config.hydration.replace("%", ""));
    const flourAmount = calculateFlourAmount(
      totalDoughWeight,
      hydrationPercentage,
    );
    const waterAmount = calculateWaterAmount(flourAmount, hydrationPercentage);
    const yeastAmount = calculateYeastAmount(
      totalDoughWeight,
      config.yeastType,
    );
    const saltAmount = calculateSaltAmount(flourAmount);
    const honeyAmount = yeastAmount; // Honey is same as yeast weight

    const predoughPercentage =
      config.predoughPercentage === "Kein Vorteig"
        ? 0
        : parseFloat(config.predoughPercentage.replace("%", "")) / 100;

    if (config.preparationTime === "Predough a day before") {
      // Calculate target predough weight based on total dough weight and percentage
      const targetPredoughWeight = Math.round(
        totalDoughWeight * predoughPercentage,
      );

      // Account for yeast and honey in the predough
      const predoughFlourAndWater =
        targetPredoughWeight - yeastAmount - honeyAmount;

      // For 100% hydration, flour and water are equal parts
      const predoughFlour = Math.round(predoughFlourAndWater / 2);
      const predoughWater = Math.round(predoughFlourAndWater / 2);

      const predoughWeight =
        predoughFlour + predoughWater + yeastAmount + honeyAmount;
      const predoughBowlSize = calculateBowlSize(predoughWeight);

      // Calculate main dough amounts
      const mainDoughFlour = flourAmount - predoughFlour;
      const mainDoughWater = waterAmount - predoughWater;
      const totalWeight =
        predoughWeight + mainDoughFlour + mainDoughWater + saltAmount;
      const mainDoughBowlSize = calculateBowlSize(totalWeight);

      return [
        `Am Vortag ${predoughWeight}g Vorteig (Poolish) herstellen`,
        `Dazu eine Schüssel mit einem Fassungsvermögen von mind. ${predoughBowlSize}L nehmen`,
        `${predoughWater}ml Wasser hineingeben`,
        `Dann ${yeastAmount}g ${config.yeastType === "Dry yeast" ? "Trockenhefe" : "Frischhefe"} dazu geben und kurz umrühren`,
        `Danach ${honeyAmount}g Honig beimischen`,
        `Zum Schluss ${predoughFlour}g Mehl hinein geben und mit einem Löffel mischen bis kein Mehl mehr zusehen ist`,
        "Dann 1h zugedeckt bei Zimmertemperatur stehen lassen",
        "Danach zugedeckt in den Kühlschrank geben",
        "Am nächsten Tag 3h vor dem Backen die Schüssel mit dem Vorteig (Poolish) aus dem Kühlschrank nehmen",
        config.kneadingMethod === "With Machine"
          ? "Küchenmaschine mit Knethaken vorbereiten"
          : null,
        config.kneadingMethod === "With Machine"
          ? "Den Vorteig (Poolish) in den Behälter der Küchemaschine geben"
          : `Eine neue Schüssel mit Fassungsvermögen von mind. ${mainDoughBowlSize}L nehmen und den Vorteig (Poolish) dort hineingeben`,
        config.kneadingMethod === "With Machine"
          ? `${mainDoughWater}ml Wasser langsam Esslöfelweise hinzugeben`
          : `${mainDoughWater}ml Wasser hinzugeben`,
        `Dann ${saltAmount}g Salz hinzugeben und umrühren`,
        config.kneadingMethod === "With Machine" ? "Olivenöl zugeben" : null,
        `Danach ${mainDoughFlour}g Mehl dazugeben und von Hand vermischen`,
        config.kneadingMethod === "With Machine"
          ? "Teig ca. 10min kneten lassen"
          : "Teig auf die Arbeitsplatte geben und Teig ca. 15-20min von Hand kneten",
        "Gekneteter Teig auf Arbeitsplate zu einer Kugel formen und mit Olivenöl leicht einreiben",
        "Dann mit einer Schüssel zudecken für 15min stehen lassen",
        "Dann Teig ca. 10mal anheben und auf den Tisch zurück legen sodass er gefaltet wird. Dabei den Teig immer um 90° drehen.",
        "Wieder zu einer Kugel formen und zugedeckt für 1h stehen lassen",
        `Teig in ${config.pizzaCount} Teiglinge à ${getBallSizeFromConfig(config.pizzaSize).size} teilen und kleine Kugeln formen`,
        "Kugeln in einem geschlossenen, mit Olivenöl eingeriebenen Behälter, geben",
      ]
        .filter((item) => item !== null)
        .flat();
    } else if (config.preparationTime === "8h before Eating Time") {
      // Calculate target predough weight based on total dough weight and percentage
      const targetPredoughWeight = Math.round(
        totalDoughWeight * predoughPercentage,
      );

      // Account for yeast and honey in the predough
      const predoughFlourAndWater =
        targetPredoughWeight - yeastAmount - honeyAmount;

      // For 100% hydration, flour and water are equal parts
      const predoughFlour = Math.round(predoughFlourAndWater / 2);
      const predoughWater = Math.round(predoughFlourAndWater / 2);

      const predoughWeight =
        predoughFlour + predoughWater + yeastAmount + honeyAmount;
      const predoughBowlSize = calculateBowlSize(predoughWeight);

      // Calculate main dough amounts
      const mainDoughFlour = flourAmount - predoughFlour;
      const mainDoughWater = waterAmount - predoughWater;
      const totalWeight =
        predoughWeight + mainDoughFlour + mainDoughWater + saltAmount;
      const mainDoughBowlSize = calculateBowlSize(totalWeight);

      return [
        `Ca. 8h vor dem Backen ${predoughWeight}g Vorteig (Poolish) herstellen`,
        `Eine Schüssel mit einem Fassungsvermögen von mind. ${predoughBowlSize}L nehmen`,
        `${predoughWater}ml Wasser hineingeben`,
        `Dann ${yeastAmount}g ${config.yeastType === "Dry yeast" ? "Trockenhefe" : "Frischhefe"} dazu geben und kurz umrühren`,
        `Danach ${honeyAmount}g Honig beimischen`,
        `Zum Schluss ${predoughFlour}g Mehl hinein geben und mit einem Löffel mischen bis kein Mehl mehr zusehen ist`,
        "Dann ca. 6h zugedeckt bei Zimmertemperatur stehen lassen",
        config.kneadingMethod === "With Machine"
          ? "Küchenmaschine mit Knethaken vorbereiten"
          : null,
        config.kneadingMethod === "With Machine"
          ? "Den Vorteig (Poolish) in den Behälter der Küchemaschine geben"
          : `Eine neue Schüssel mit Fassungsvermögen von mind. ${mainDoughBowlSize}L nehmen und den Vorteig (Poolish) dort hineingeben`,
        config.kneadingMethod === "With Machine"
          ? `${mainDoughWater}ml Wasser langsam Esslöfelweise hinzugeben`
          : `${mainDoughWater}ml Wasser hinzugeben`,
        `Dann ${saltAmount}g Salz hinzugeben und umrühren`,
        config.kneadingMethod === "With Machine" ? "Olivenöl zugeben" : null,
        `Danach ${mainDoughFlour}g Mehl dazugeben und von Hand vermischen`,
        config.kneadingMethod === "With Machine"
          ? "Teig ca. 10min kneten lassen"
          : "Teig auf die Arbeitsplatte geben und Teig ca. 15-20min von Hand kneten",
        "Gekneteter Teig auf Arbeitsplate zu einer Kugel formen und mit Olivenöl leicht einreiben",
        "Dann mit einer Schüssel zudecken für 15min stehen lassen",
        "Dann Teig ca. 10mal anheben und auf den Tisch zurück legen sodass er gefaltet wird. Dabei den Teig immer um 90° drehen.",
        "Wieder zu einer Kugel formen und zugedeckt für 1h stehen lassen",
        `Teig in ${config.pizzaCount} Teiglinge à ${getBallSizeFromConfig(config.pizzaSize).size} teilen und kleine Kugeln formen`,
        "Kugeln in einem geschlossenen, mit Olivenöl eingeriebenen Behälter, geben",
      ]
        .filter((item) => item !== null)
        .flat();
    } else {
      // Without predough
      const totalBowlSize = calculateBowlSize(totalDoughWeight);

      return [
        `Eine Schüssel mit einem Fassungsvermögen von mind. ${totalBowlSize}L nehmen`,
        `${waterAmount}ml Wasser hineingeben`,
        `Dann ${yeastAmount}g ${config.yeastType === "Dry yeast" ? "Trockenhefe" : "Frischhefe"} dazu geben und kurz umrühren`,
        `Danach ${honeyAmount}g Honig beimischen und 10min stehen lassen`,
        `Dann ${flourAmount}g Mehl dazugeben`,
        `Als nächstes ${saltAmount}g Salz hinzugeben und von Hand vermischen`,
        config.kneadingMethod === "With Machine" ? "Olivenöl zugeben" : null,
        config.kneadingMethod === "With Machine"
          ? "Teig ca. 10min kneten lassen"
          : "Teig auf die Arbeitsplatte geben und Teig ca. 15-20min von Hand kneten",
        "Gekneteter Teig auf Arbeitsplate zu einer Kugel formen und mit Olivenöl leicht einreiben",
        "Dann mit einer Schüssel zudecken für 15min stehen lassen",
        "Dann Teig ca. 10mal anheben und auf den Tisch zurück legen sodass er gefaltet wird. Dabei den Teig immer um 90° drehen.",
        "Wieder zu einer Kugel formen und zugedeckt für 1h stehen lassen",
        `Teig in ${config.pizzaCount} Teiglinge à ${getBallSizeFromConfig(config.pizzaSize).size} teilen und kleine Kugeln formen`,
        "Kugeln in einem geschlossenen, mit Olivenöl eingeriebenen Behälter, geben",
      ]
        .filter((item) => item !== null)
        .flat();
    }
  };

  const generateBakingInstructions = (config: PizzaConfiguration): string => {
    const preheatTime = calculatePreheatTime(config.ovenType, config.ovenSize);
    const bakingTime = calculateBakingTime(
      config.ovenType,
      config.maxTemperature,
    );

    // Calculate when to start preheating
    const { bakingDate } = calculateDates(config, true);
    const preheatStartTime = new Date(bakingDate);
    preheatStartTime.setMinutes(
      preheatStartTime.getMinutes() - preheatTime.minutes,
    );

    // Format the preheat start time
    const preheatTimeStr = preheatStartTime.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `Ofen ca. ${preheatTime.formatted} vor dem Backen aufheizen (um ${preheatTimeStr} Uhr)\nTemperatur von Ofen und ${config.pizzaSurface === "Pizza stone" ? "Stein" : config.pizzaSurface === "Pizza steel" ? "Stahl" : "Oberfläche"} prüfen\nWenn beides bei ${config.maxTemperature} liegt Pizza für ca. ${bakingTime}min backen`;
  };

  const calculateTotalTime = (config: PizzaConfiguration): string => {
    if (config.preparationTime === "Predough a day before") {
      return "24 Stunden und 30 Minuten";
    } else if (config.preparationTime === "8h before Eating Time") {
      return "8 Stunden und 30 Minuten";
    } else if (config.preparationTime === "Without Predough") {
      return "2 Stunden";
    }
    return "2 Stunden"; // Default fallback
  };

  const generateShoppingList = (
    config: PizzaConfiguration,
  ): ShoppingListItem[] => {
    const totalDoughWeight = calculateTotalDoughWeight(config);
    const hydrationPercentage = parseInt(config.hydration.replace("%", ""));
    const flourAmount = calculateFlourAmount(
      totalDoughWeight,
      hydrationPercentage,
    );
    const waterAmount = calculateWaterAmount(flourAmount, hydrationPercentage);
    const yeastAmount = calculateYeastAmount(
      totalDoughWeight,
      config.yeastType,
    );
    const saltAmount = calculateSaltAmount(flourAmount);
    const honeyAmount = yeastAmount; // Honey is same as yeast weight

    // Convert to display format
    const flourDisplay =
      flourAmount >= 1000
        ? `${Math.round(flourAmount / 100) / 10}kg`
        : `${flourAmount}g`;
    const waterDisplay = `${waterAmount}ml`;
    const yeastDisplay = `${yeastAmount}g`;
    const saltDisplay = `${saltAmount}g`;
    const honeyDisplay = `${honeyAmount}g`;
    const oilAmount = `${config.pizzaCount * 10}ml`; // 10ml per pizza

    const baseItems: ShoppingListItem[] = [
      { name: "Mehl (Tipo 00)", amount: flourDisplay, checked: false },
      {
        name: config.yeastType === "Dry yeast" ? "Trockenhefe" : "Frischhefe",
        amount: yeastDisplay,
        checked: false,
      },
      { name: "Salz", amount: saltDisplay, checked: false },
      { name: "Olivenöl", amount: oilAmount, checked: false },
      { name: "Honig", amount: honeyDisplay, checked: false },
      {
        name: "Tomatensoße",
        amount: `${config.pizzaCount * 75}ml`,
        checked: false,
      },
      {
        name: "Mozzarella",
        amount: `${config.pizzaCount * 100}g`,
        checked: false,
      },
      {
        name: "Basilikum",
        amount: `${config.pizzaCount / 8} Bund`,
        checked: false,
      },
    ];

    // Add toppings to shopping list
    const toppingItems: ShoppingListItem[] = [];
    if (config.toppings.includes("Ham")) {
      toppingItems.push({
        name: "Schinken",
        amount: `${config.pizzaCount * 30}g`,
        checked: false,
      });
    }
    if (config.toppings.includes("Salami")) {
      toppingItems.push({
        name: "Salami",
        amount: `${config.pizzaCount * 30}g`,
        checked: false,
      });
    }
    if (config.toppings.includes("Hot Salami")) {
      toppingItems.push({
        name: "Scharfe Salami",
        amount: `${config.pizzaCount * 30}g`,
        checked: false,
      });
    }
    if (config.toppings.includes("Raw Ham")) {
      toppingItems.push({
        name: "Rohschinken",
        amount: `${config.pizzaCount * 30}g`,
        checked: false,
      });
    }
    if (config.toppings.includes("Onion")) {
      toppingItems.push({
        name: "Zwiebeln",
        amount: `${Math.ceil(config.pizzaCount / 4)} Stück`,
        checked: false,
      });
    }
    if (config.toppings.includes("Mushrooms")) {
      toppingItems.push({
        name: "Champignons",
        amount: `${config.pizzaCount * 20}g`,
        checked: false,
      });
    }
    if (config.toppings.includes("Pepperoni")) {
      toppingItems.push({
        name: "Peperoni",
        amount: `${Math.ceil(config.pizzaCount / 4)} Stück`,
        checked: false,
      });
    }
    if (config.toppings.includes("Pineapple")) {
      toppingItems.push({
        name: "Ananas Dose",
        amount: `${Math.ceil(config.pizzaCount / 8)} Stück`,
        checked: false,
      });
    }

    return [...baseItems, ...toppingItems];
  };

  return (
    <div className="container mx-auto py-4 px-2 sm:px-4 bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-4">
        <Select
          value={unitSystem}
          onValueChange={(value: "metric" | "us") => setUnitSystem(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Einheit wählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="metric">Metrisch</SelectItem>
            <SelectItem value="us">US Customary</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full h-full grid-cols-3 mb-4">
          <TabsTrigger
            value="configuration"
            className="flex flex-col text-sm md:text-base md:flex-row items-center gap-2 p-2"
          >
            <Pizza className="h-5 w-5" />
            Konfiguration
          </TabsTrigger>
          <TabsTrigger
            value="recipe"
            className="flex flex-col text-sm md:text-base md:flex-row items-center gap-2 p-2"
            disabled={!recipe}
          >
            <FileText className="h-5 w-5" />
            Rezept
          </TabsTrigger>
          <TabsTrigger
            value="shopping"
            className="flex flex-col text-sm md:text-base md:flex-row items-center gap-2 p-2"
            disabled={!shoppingList.length}
          >
            <ShoppingBasket className="h-5 w-5" />
            Einkaufsliste
          </TabsTrigger>
        </TabsList>

        <TabsContent value="configuration" className="space-y-8">
          <ConfigurationForm
            onConfigChange={handleConfigChange}
            initialConfig={config}
            isMetric={unitSystem === "metric"}
          />

          {isPastStartTime && (
            <div className="text-center mb-4">
              <p className="text-red-600 font-medium">
                Achtung: Der Startzeitpunkt für die erste Aufgabe liegt in der
                Vergangenheit. Bitte passe das Datum oder die Uhrzeit an.
              </p>
            </div>
          )}
          <div className="flex justify-center">
            <ActionButtons
              onGenerateRecipe={handleGenerateRecipe}
              isGenerating={isGenerating}
              isRecipeGenerated={!!recipe}
            />
          </div>
        </TabsContent>

        <TabsContent value="recipe" className="space-y-8">
          {recipe && (
            <>
              <ConfigSummary
                config={config}
                onEditClick={() => setActiveTab("configuration")}
                isMetric={unitSystem === "metric"}
              />

              <RecipeDisplay
                recipe={recipe}
                isDayBeforePreparation={
                  config.preparationTime === "Predough a day before"
                }
                isMetric={unitSystem === "metric"}
              />

              <div className="flex justify-center">
                <ActionButtons
                  onGenerateRecipe={handleGenerateRecipe}
                  isGenerating={isGenerating}
                  isRecipeGenerated={true}
                />
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="shopping" className="space-y-8">
          {shoppingList.length > 0 && (
            <>
              <ShoppingList
                items={shoppingList}
                onToggleItem={handleToggleShoppingItem}
                pizzaCount={config.pizzaCount}
                pizzaSize={getBallSizeFromConfig(config.pizzaSize).diameter}
                isMetric={unitSystem === "metric"}
              />

              <div className="flex justify-center">
                <ActionButtons
                  onGenerateRecipe={handleGenerateRecipe}
                  isGenerating={isGenerating}
                  isRecipeGenerated={true}
                />
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PizzaConfigurator;
