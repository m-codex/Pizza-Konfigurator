import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ConfigurationForm, { PizzaConfiguration } from "./ConfigurationForm";
import RecipeDisplay from "./RecipeDisplay";
import ShoppingList from "./ShoppingList";
import ActionButtons from "./ActionButtons";
import ConfigSummary from "./ConfigSummary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Pizza, ShoppingBasket, FileText, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { convertMeasurementsInText, cmToInches } from "../lib/unitConversions";
import { getTranslation, Language, Translations } from "../lib/i18n";

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

interface PizzaConfiguratorProps {
  language?: Language;
}

const PizzaConfigurator: React.FC<PizzaConfiguratorProps> = ({
  language: initialLanguage = "de",
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get language from URL or localStorage or default to initialLanguage
  const getInitialLanguage = (): Language => {
    const urlLang = searchParams.get("lang") as Language;
    const storedLang = localStorage.getItem("pizzaConfigLanguage") as Language;

    // Check if the URL parameter is valid
    if (urlLang === "de" || urlLang === "en") {
      return urlLang;
    }

    // Check if localStorage has a valid language
    if (storedLang === "de" || storedLang === "en") {
      return storedLang;
    }

    return initialLanguage;
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  // Update URL and localStorage when language changes
  useEffect(() => {
    // Update URL with language parameter
    searchParams.set("lang", language);
    setSearchParams(searchParams);

    // Save to localStorage
    localStorage.setItem("pizzaConfigLanguage", language);

    // Update document language for date formatting
    document.documentElement.lang = language === "en" ? "en-US" : "de-DE";
  }, [language, searchParams, setSearchParams]);

  // Update language when initialLanguage prop changes
  useEffect(() => {
    if (initialLanguage !== language && !searchParams.get("lang")) {
      setLanguage(initialLanguage);
    }
  }, [initialLanguage, language, searchParams]);
  const [unitSystem, setUnitSystem] = useState<"metric" | "us">("metric");
  const t = getTranslation(language);
  const [config, setConfig] = useState<PizzaConfiguration>({
    pizzaCount: 8,
    pizzaSize: "30-32cm (280g Dough ball)",
    preparationTime: "Predough a day before",
    hydration: "65%",
    yeastType: "Dry yeast",
    predoughPercentage: "40%",
    kneadingMethod: "By Hand",
    ovenType: "Pizza wood oven stainless steel",
    maxTemperature: "> 350°C",
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
      const pizzaDiameter = getBallSizeFromConfig(config.pizzaSize).diameter;
      const displayDiameter =
        unitSystem === "metric" ? pizzaDiameter : cmToInches(pizzaDiameter);
      const titleText =
        language === "de"
          ? `Pizza Rezept für ${config.pizzaCount} Pizzen mit ${displayDiameter}`
          : `Pizza Recipe for ${config.pizzaCount} Pizzas with ${displayDiameter}`;
      const generatedRecipe = {
        title: titleText,
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
  useEffect(() => {
    checkIfStartTimeIsPast(config);
  }, []);

  // Update recipe when unit system or language changes
  useEffect(() => {
    if (recipe) {
      // Regenerate the recipe with the new language
      const { preDoughDate, mainDoughDate, bakingDate, eatingDate } =
        calculateDates(config);

      // Split preparation steps into pre-dough and main dough steps
      const { preDoughSteps, mainDoughSteps } = splitPreparationSteps(config);

      // Generate recipe based on configuration
      const pizzaDiameter = getBallSizeFromConfig(config.pizzaSize).diameter;
      const displayDiameter =
        unitSystem === "metric" ? pizzaDiameter : cmToInches(pizzaDiameter);
      const titleText =
        language === "de"
          ? `Pizza Rezept für ${config.pizzaCount} Pizzen mit ${displayDiameter}`
          : `Pizza Recipe for ${config.pizzaCount} Pizzas with ${displayDiameter}`;

      setRecipe({
        ...recipe,
        title: titleText,
        preDoughSteps,
        preDoughDate,
        mainDoughSteps,
        mainDoughDate,
        bakingInstructions: generateBakingInstructions(config),
        bakingDate,
        eatingDate,
      });
    }
  }, [unitSystem, language, config.pizzaCount, config.pizzaSize]);

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
  ): { minutesrounded: number; formatted: string } => {
    let baseMinutes = 0;

    // Base preheating time by oven type
    if (ovenType === "Kitchen oven") baseMinutes = 40;
    else if (ovenType === "Gasgrill") baseMinutes = 30;
    else if (ovenType === "Pizza wood oven stainless steel") baseMinutes = 40;
    else if (ovenType === "Pizza wood oven stone") baseMinutes = 105;

    // Multiplier based on surface size
    let multiplier = 1;
    if (ovenSize === "60x60cm") multiplier = 1.5;
    else if (ovenSize === "80x80cm") multiplier = 2;
    else if (ovenSize === "100x100cm") multiplier = 2.5;

    const minutes = Math.round(baseMinutes * multiplier);
    const minutesfifteen = Math.ceil(minutes / 15);
    const minutesrounded = Math.round(minutesfifteen * 15);
    const hours = Math.floor(minutesrounded / 60);
    const remainingMinutes = minutesrounded % 60;

    let formatted = "";
    if (hours > 0) {
      formatted = `${minutesrounded}min (${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ""})`;
    } else {
      formatted = `${minutesrounded}min`;
    }

    return { minutesrounded, formatted };
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
      const locale = language === "de" ? "de-DE" : "en-US";
      const days =
        language === "de"
          ? [
              "Sonntag",
              "Montag",
              "Dienstag",
              "Mittwoch",
              "Donnerstag",
              "Freitag",
              "Samstag",
            ]
          : [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
      const day = days[date.getDay()];
      const dateStr = date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      // Format time based on locale
      let timeStr;
      if (language === "de") {
        timeStr = date.toLocaleTimeString(locale, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        return `${day}, ${dateStr}, ${timeStr} Uhr`;
      } else {
        timeStr = date.toLocaleTimeString(locale, {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        return `${day}, ${dateStr}, ${timeStr}`;
      }
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
      // Find the index of transition step based on language
      const transitionKeywords =
        language === "de"
          ? ["Ein Tag Später", "nächsten Tag", "Kühlschrank nehmen"]
          : ["next day", "refrigerator", "take the bowl"];

      const transitionIndex = allSteps.findIndex((step) =>
        transitionKeywords.some((keyword) => step.includes(keyword)),
      );

      if (transitionIndex !== -1) {
        // Find the index of the step that puts the dough in the refrigerator
        const refrigeratorKeywords =
          language === "de"
            ? ["Kühlschrank geben"]
            : ["refrigerator", "place in the refrigerator"];

        const refrigeratorIndex = allSteps.findIndex((step) =>
          refrigeratorKeywords.some((keyword) => step.includes(keyword)),
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
      // For 8h preparation, find the step that mentions rest time
      const restKeywords =
        language === "de"
          ? ["6h zugedeckt", "stehen lassen"]
          : ["6h covered", "let it rest"];

      const restStepIndex = allSteps.findIndex((step) =>
        restKeywords.some((keyword) => step.includes(keyword)),
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

    // Get translations
    const t = getTranslation(language);
    const yeastTypeTranslated =
      config.yeastType === "Dry yeast"
        ? t.configuration.selectOptions.yeastType.dry
        : t.configuration.selectOptions.yeastType.fresh;

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
        t.recipe.steps.predough.makePredough.replace(
          "{weight}",
          predoughWeight.toString(),
        ),
        t.recipe.steps.predough.takeBowl.replace(
          "{size}",
          predoughBowlSize.toString(),
        ),
        t.recipe.steps.predough.addWater.replace(
          "{amount}",
          predoughWater.toString(),
        ),
        t.recipe.steps.predough.addYeast
          .replace("{amount}", yeastAmount.toString())
          .replace("{type}", yeastTypeTranslated),
        t.recipe.steps.predough.addHoney.replace(
          "{amount}",
          honeyAmount.toString(),
        ),
        t.recipe.steps.predough.addFlour.replace(
          "{amount}",
          predoughFlour.toString(),
        ),
        t.recipe.steps.predough.letRest.replace("{time}", "1"),
        t.recipe.steps.predough.putInFridge,
        t.recipe.steps.predough.takeFromFridge,
        config.kneadingMethod === "With Machine"
          ? t.recipe.steps.maindough.prepareMixer
          : null,
        config.kneadingMethod === "By Hand"
          ? t.recipe.steps.maindough.takeBowl.replace(
              "{size}",
              mainDoughBowlSize.toString(),
            )
          : null,
        config.kneadingMethod === "With Machine"
          ? t.recipe.steps.maindough.addPredough
          : t.recipe.steps.maindough.addWater.replace(
              "{amount}",
              mainDoughWater.toString(),
            ),
        config.kneadingMethod === "With Machine"
          ? t.recipe.steps.maindough.addWater.replace(
              "{amount}",
              mainDoughWater.toString(),
            )
          : t.recipe.steps.maindough.addSalt.replace(
              "{amount}",
              saltAmount.toString(),
            ),
        config.kneadingMethod === "With Machine"
          ? t.recipe.steps.maindough.addOil
          : null,
        t.recipe.steps.maindough.addFlour.replace(
          "{amount}",
          mainDoughFlour.toString(),
        ),
        config.kneadingMethod === "With Machine"
          ? t.recipe.steps.maindough.kneadByMachine
          : t.recipe.steps.maindough.kneadByHand,
        t.recipe.steps.maindough.formBall,
        t.recipe.steps.maindough.coverAndRest,
        t.recipe.steps.maindough.foldDough,
        t.recipe.steps.maindough.formBallAgain,
        t.recipe.steps.maindough.divideDough
          .replace("{count}", config.pizzaCount.toString())
          .replace("{size}", getBallSizeFromConfig(config.pizzaSize).size),
        t.recipe.steps.maindough.putInContainer,
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
        language === "de"
          ? `Ca. 8h vor dem Backen ${predoughWeight}g Vorteig (Poolish) herstellen`
          : `About 8h before baking, make ${predoughWeight}g of pre-dough (poolish)`,
        t.recipe.steps.predough.takeBowl.replace(
          "{size}",
          predoughBowlSize.toString(),
        ),
        t.recipe.steps.predough.addWater.replace(
          "{amount}",
          predoughWater.toString(),
        ),
        t.recipe.steps.predough.addYeast
          .replace("{amount}", yeastAmount.toString())
          .replace("{type}", yeastTypeTranslated),
        t.recipe.steps.predough.addHoney.replace(
          "{amount}",
          honeyAmount.toString(),
        ),
        t.recipe.steps.predough.addFlour.replace(
          "{amount}",
          predoughFlour.toString(),
        ),
        t.recipe.steps.predough.letRest.replace("{time}", "6"),
        config.kneadingMethod === "With Machine"
          ? t.recipe.steps.maindough.prepareMixer
          : null,
        config.kneadingMethod === "By Hand"
          ? t.recipe.steps.maindough.takeBowl.replace(
              "{size}",
              mainDoughBowlSize.toString(),
            )
          : null,
        config.kneadingMethod === "With Machine"
          ? t.recipe.steps.maindough.addPredough
          : t.recipe.steps.maindough.addWater.replace(
              "{amount}",
              mainDoughWater.toString(),
            ),
        config.kneadingMethod === "With Machine"
          ? t.recipe.steps.maindough.addWater.replace(
              "{amount}",
              mainDoughWater.toString(),
            )
          : t.recipe.steps.maindough.addSalt.replace(
              "{amount}",
              saltAmount.toString(),
            ),
        config.kneadingMethod === "With Machine"
          ? t.recipe.steps.maindough.addOil
          : null,
        t.recipe.steps.maindough.addFlour.replace(
          "{amount}",
          mainDoughFlour.toString(),
        ),
        config.kneadingMethod === "With Machine"
          ? t.recipe.steps.maindough.kneadByMachine
          : t.recipe.steps.maindough.kneadByHand,
        t.recipe.steps.maindough.formBall,
        t.recipe.steps.maindough.coverAndRest,
        t.recipe.steps.maindough.foldDough,
        t.recipe.steps.maindough.formBallAgain,
        t.recipe.steps.maindough.divideDough
          .replace("{count}", config.pizzaCount.toString())
          .replace("{size}", getBallSizeFromConfig(config.pizzaSize).size),
        t.recipe.steps.maindough.putInContainer,
      ]
        .filter((item) => item !== null)
        .flat();
    } else {
      // Without predough
      const totalBowlSize = calculateBowlSize(totalDoughWeight);

      return [
        t.recipe.steps.predough.takeBowl.replace(
          "{size}",
          totalBowlSize.toString(),
        ),
        t.recipe.steps.predough.addWater.replace(
          "{amount}",
          waterAmount.toString(),
        ),
        t.recipe.steps.predough.addYeast
          .replace("{amount}", yeastAmount.toString())
          .replace("{type}", yeastTypeTranslated),
        language === "de"
          ? `Danach ${honeyAmount}g Honig beimischen und 10min stehen lassen`
          : `Next, add ${honeyAmount}g of honey and let it rest for 10 minutes`,
        language === "de"
          ? `Dann ${flourAmount}g Mehl dazugeben`
          : `Then add ${flourAmount}g of flour`,
        language === "de"
          ? `Als nächstes ${saltAmount}g Salz hinzugeben und von Hand vermischen`
          : `Next, add ${saltAmount}g of salt and mix by hand`,
        config.kneadingMethod === "With Machine"
          ? t.recipe.steps.maindough.addOil
          : null,
        config.kneadingMethod === "With Machine"
          ? t.recipe.steps.maindough.kneadByMachine
          : t.recipe.steps.maindough.kneadByHand,
        t.recipe.steps.maindough.formBall,
        t.recipe.steps.maindough.coverAndRest,
        t.recipe.steps.maindough.foldDough,
        t.recipe.steps.maindough.formBallAgain,
        t.recipe.steps.maindough.divideDough
          .replace("{count}", config.pizzaCount.toString())
          .replace("{size}", getBallSizeFromConfig(config.pizzaSize).size),
        t.recipe.steps.maindough.putInContainer,
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
    // Create a proper clone of the Date object
    const preheatStartTime = new Date(bakingDate.getTime());
    // Use minutesrounded instead of minutes which doesn't exist
    preheatStartTime.setMinutes(
      preheatStartTime.getMinutes() - preheatTime.minutesrounded,
    );

    // Format the preheat start time
    const locale = language === "de" ? "de-DE" : "en-US";
    const preheatTimeStr = preheatStartTime.toLocaleTimeString(locale, {
      hour: language === "de" ? "2-digit" : "numeric",
      minute: "2-digit",
      hour12: language === "en",
    });

    // Get translations
    const t = getTranslation(language);

    // Determine surface name based on language
    let surfaceName = "";
    if (config.pizzaSurface === "Pizza stone") {
      surfaceName = language === "de" ? "Stein" : "stone";
    } else if (config.pizzaSurface === "Pizza steel") {
      surfaceName = language === "de" ? "Stahl" : "steel";
    } else {
      surfaceName = language === "de" ? "Oberfläche" : "surface";
    }

    // Build instructions using translation templates
    const preheatInstruction = t.recipe.steps.baking.preheatOven
      .replace("{time}", preheatTime.formatted)
      .replace("{clockTime}", preheatTimeStr);

    const formPizzaInstruction = t.recipe.steps.baking.formPizza;

    const checkTempInstruction = t.recipe.steps.baking.checkTemperature
      .replace("{surface}", surfaceName)
      .replace("{temp}", config.maxTemperature)
      .replace("{time}", bakingTime.toString());

    return `${preheatInstruction}\n${formPizzaInstruction}\n${checkTempInstruction}`;
  };

  const calculateTotalTime = (config: PizzaConfiguration): string => {
    if (language === "de") {
      if (config.preparationTime === "Predough a day before") {
        return "24 Stunden und 30 Minuten";
      } else if (config.preparationTime === "8h before Eating Time") {
        return "8 Stunden und 30 Minuten";
      } else if (config.preparationTime === "Without Predough") {
        return "2 Stunden";
      }
      return "2 Stunden"; // Default fallback
    } else {
      if (config.preparationTime === "Predough a day before") {
        return "24 hours and 30 minutes";
      } else if (config.preparationTime === "8h before Eating Time") {
        return "8 hours and 30 minutes";
      } else if (config.preparationTime === "Without Predough") {
        return "2 hours";
      }
      return "2 hours"; // Default fallback
    }
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

    // Get translations
    const t = getTranslation(language);
    const pieceText = t.shopping.items.piece;
    const bunchText = t.shopping.items.bunch;
    const cloveText = t.shopping.items.clove;

    const baseItems: ShoppingListItem[] = [
      { name: t.shopping.items.flour, amount: flourDisplay, checked: false },
      {
        name:
          config.yeastType === "Dry yeast"
            ? t.shopping.items.dryYeast
            : t.shopping.items.freshYeast,
        amount: yeastDisplay,
        checked: false,
      },
      { name: t.shopping.items.salt, amount: saltDisplay, checked: false },
      { name: t.shopping.items.oliveOil, amount: oilAmount, checked: false },
      { name: t.shopping.items.honey, amount: honeyDisplay, checked: false },
      {
        name: t.shopping.items.tomatoSauce,
        amount: `${config.pizzaCount * 75}ml`,
        checked: false,
      },
      {
        name: t.shopping.items.mozzarella,
        amount: `${config.pizzaCount * 100}g`,
        checked: false,
      },
      {
        name: t.shopping.items.basil,
        amount: `${config.pizzaCount / 8} ${bunchText}`,
        checked: false,
      },
    ];

    // Add toppings to shopping list
    const toppingItems: ShoppingListItem[] = [];
    if (config.toppings.includes("Ham")) {
      toppingItems.push({
        name: t.shopping.items.ham,
        amount: `${config.pizzaCount * 30}g`,
        checked: false,
      });
    }
    if (config.toppings.includes("Salami")) {
      toppingItems.push({
        name: t.shopping.items.salami,
        amount: `${config.pizzaCount * 30}g`,
        checked: false,
      });
    }
    if (config.toppings.includes("Hot Salami")) {
      toppingItems.push({
        name: t.shopping.items.hotSalami,
        amount: `${config.pizzaCount * 30}g`,
        checked: false,
      });
    }
    if (config.toppings.includes("Raw Ham")) {
      toppingItems.push({
        name: t.shopping.items.rawHam,
        amount: `${config.pizzaCount * 30}g`,
        checked: false,
      });
    }
    if (config.toppings.includes("Onion")) {
      toppingItems.push({
        name: t.shopping.items.onions,
        amount: `${Math.ceil(config.pizzaCount / 4)} ${pieceText}`,
        checked: false,
      });
    }
    if (config.toppings.includes("Mushrooms")) {
      toppingItems.push({
        name: t.shopping.items.mushrooms,
        amount: `${config.pizzaCount * 20}g`,
        checked: false,
      });
    }
    if (config.toppings.includes("Pepperoni")) {
      toppingItems.push({
        name: t.shopping.items.pepperoni,
        amount: `${Math.ceil(config.pizzaCount / 4)} ${pieceText}`,
        checked: false,
      });
    }
    if (config.toppings.includes("Pineapple")) {
      toppingItems.push({
        name: t.shopping.items.pineapple,
        amount: `${Math.ceil(config.pizzaCount / 8)} ${pieceText}`,
        checked: false,
      });
    }
    if (config.toppings.includes("Olives")) {
      toppingItems.push({
        name: t.shopping.items.olives,
        amount: `${config.pizzaCount * 15}g`,
        checked: false,
      });
    }
    if (config.toppings.includes("Artichokes")) {
      toppingItems.push({
        name: t.shopping.items.artichokes,
        amount: `${Math.ceil(config.pizzaCount / 4)} ${pieceText}`,
        checked: false,
      });
    }
    if (config.toppings.includes("Mascarpone")) {
      toppingItems.push({
        name: t.shopping.items.mascarpone,
        amount: `${config.pizzaCount * 25}g`,
        checked: false,
      });
    }
    if (config.toppings.includes("Burrata")) {
      toppingItems.push({
        name: t.shopping.items.burrata,
        amount: `${Math.ceil(config.pizzaCount / 2)} ${pieceText}`,
        checked: false,
      });
    }
    if (config.toppings.includes("Garlic")) {
      toppingItems.push({
        name: t.shopping.items.garlic,
        amount: `${Math.ceil(config.pizzaCount / 4)} ${cloveText}`,
        checked: false,
      });
    }
    if (config.toppings.includes("Cherry Tomatoes")) {
      toppingItems.push({
        name: t.shopping.items.cherryTomatoes,
        amount: `${config.pizzaCount * 30}g`,
        checked: false,
      });
    }
    if (config.toppings.includes("Arugula")) {
      toppingItems.push({
        name: t.shopping.items.arugula,
        amount: `${Math.ceil(config.pizzaCount / 4)} ${bunchText}`,
        checked: false,
      });
    }

    return [...baseItems, ...toppingItems];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="text-white text-balance -mx-10 px-10 bg-neutral-800">
        <div className="flex flex-col py-6 gap-2 w-full mx-auto px-2 sm:px-4">
          <div className="flex justify-center">
            <img
              src={import.meta.env.BASE_URL + "Pizza.png"}
              alt="Pizza"
              className="w-32 h-32 mb-2 flex"
            />
          </div>
          <h1 className="text-4xl font-bold text-center">{t.home.title}</h1>
          <p className="text-xl text-center mt-2 max-w-2xl mx-auto">
            {t.home.subtitle}
          </p>
        </div>
      </header>
      <main className="container mx-auto px-1 sm:px-4 py-1">
        <div className="container mx-auto py-4 px-2 sm:px-4 bg-gray-50">
          <div className="flex justify-end gap-4 mb-4">
            <Select
              value={language}
              onValueChange={(value: Language) => {
                setLanguage(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t.common.language.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="de">{t.common.language.de}</SelectItem>
                <SelectItem value="en">{t.common.language.en}</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={unitSystem}
              onValueChange={(value: "metric" | "us") => setUnitSystem(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t.common.unitSystem.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">
                  {t.common.unitSystem.metric}
                </SelectItem>
                <SelectItem value="us">{t.common.unitSystem.us}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full h-full grid-cols-3 mb-4">
              <TabsTrigger
                value="configuration"
                className="flex flex-col text-sm md:text-base md:flex-row items-center gap-2 p-2"
              >
                <Pizza className="h-5 w-5" />
                {t.tabs.configuration}
              </TabsTrigger>
              <TabsTrigger
                value="recipe"
                className="flex flex-col text-sm md:text-base md:flex-row items-center gap-2 p-2"
                disabled={!recipe}
              >
                <FileText className="h-5 w-5" />
                {t.tabs.recipe}
              </TabsTrigger>
              <TabsTrigger
                value="shopping"
                className="flex flex-col text-sm md:text-base md:flex-row items-center gap-2 p-2"
                disabled={!shoppingList.length}
              >
                <ShoppingBasket className="h-5 w-5" />
                {t.tabs.shopping}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="configuration" className="space-y-8">
              <ConfigurationForm
                onConfigChange={handleConfigChange}
                onGenerateRecipe={handleGenerateRecipe}
                initialConfig={config}
                isMetric={unitSystem === "metric"}
                isGenerating={isGenerating}
                language={language}
                isPastStartTime={isPastStartTime}
              />
            </TabsContent>

            <TabsContent value="recipe" className="space-y-8">
              {recipe && (
                <>
                  <ConfigSummary
                    config={config}
                    onEditClick={() => setActiveTab("configuration")}
                    isMetric={unitSystem === "metric"}
                    language={language}
                  />

                  <RecipeDisplay
                    recipe={recipe}
                    isDayBeforePreparation={
                      config.preparationTime === "Predough a day before"
                    }
                    isMetric={unitSystem === "metric"}
                    language={language}
                  />
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
                    language={language}
                  />
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="bg-neutral-800 text-white py-6 mt-12">
        <div className="container mx-auto px-1 sm:px-4 text-center">
          <p>
            {t.home.footer.copyright.replace(
              "{year}",
              new Date().getFullYear().toString(),
            )}
          </p>
          <p className="text-sm mt-2 text-gray-400">
            {t.home.footer.description}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PizzaConfigurator;
