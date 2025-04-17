import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { convertMeasurementsInText } from "../lib/unitConversions";
import { getTranslation, Language } from "../lib/i18n";

interface RecipeDisplayProps {
  recipe?: {
    title?: string;
    preDoughSteps?: string[];
    preDoughDate?: string;
    mainDoughSteps?: string[];
    mainDoughDate?: string;
    bakingInstructions?: string;
    bakingDate?: string;
    eatingDate?: string;
    totalTime?: string;
  };
  className?: string;
  isDayBeforePreparation?: boolean;
  isMetric?: boolean;
  language?: Language;
}

const RecipeDisplay = ({
  recipe = {
    title: "Pizza Recipe",
    preDoughSteps: [
      "Am Vortag 1120g Vorteig (Poolish) herstellen",
      "Dazu eine Schüssel mit einem Fassungsvermögen von mind. 2,8L nehmen",
      "560ml Wasser hineingeben",
      "Dann 5g Trockenhefe dazu geben und kurz umrühren",
      "Danach 5g Honig beimischen",
      "Zum Schluss 560g Mehl hinein geben und mit einem Löffel mischen bis kein Mehl mehr zusehen ist",
      "Dann 1h zugedeckt bei Zimmertemperatur stehen lassen",
      "Danach zugedeckt in den Kühlschrank geben",
    ],
    preDoughDate: "Montag, 01.07.2024, 20:00 Uhr",
    mainDoughSteps: [
      "Die Schüssel mit dem Vorteig (Poolish) aus dem Kühlschrank nehmen",
      "Eine neue Schüssel mit Fassungsvermögen von mind. 4,48L nehmen und den Vorteig (Poolish) dort hineingeben",
      "320ml Wasser hinzugeben und von Hand mit dem Vorteig (Poolish) mischen",
      "Dann 39g Salz hinzugeben und umrühren",
      "Danach 800g Mehl dazugeben und mit der Hand alles vermischen",
      "Den Teig auf die Arbeitsplatte geben",
      "Teig mind. 15min kneten",
      "Gekneteter Teig auf Arbeitsplatte zu einer Kugel formen und mit Olivenöl leicht einreiben",
      "Dann mit einer Schüssel zudecken und für 15min stehen lassen",
      "Danach Teig ca. 10mal anheben und auf den Tisch zurück legen sodass er gefaltet wird. Dabei den Teig immer um 90° drehen.",
      "Wieder zu einer Kugel formen und zugedeckt für 1h stehen lassen",
      "Teig in 8 Teiglinge à 280g teilen und kleine Kugeln formen",
    ],
    mainDoughDate: "Dienstag, 02.07.2024, 17:00 Uhr",
    bakingInstructions:
      "Ofen ca. 50min (0,8h) vor dem Backen aufheizen\nTemperatur von Ofen und Stein prüfen\nWenn beides bei ca. über 350°C (660°F) liegt Pizza für ca. 2min backen",
    bakingDate: "Dienstag, 02.07.2024, 19:10 Uhr",
    eatingDate: "Dienstag, 02.07.2024, 20:00 Uhr",
    totalTime: "24 Stunden und 30 Minuten",
  },
  className,
  isDayBeforePreparation = false,
  isMetric = true,
  language = "de",
}: RecipeDisplayProps) => {
  const t = getTranslation(language);
  // State to track checked steps for each section
  const [preDoughCheckedSteps, setPreDoughCheckedSteps] = useState<number[]>(
    [],
  );
  const [mainDoughCheckedSteps, setMainDoughCheckedSteps] = useState<number[]>(
    [],
  );
  const [bakingCheckedSteps, setBakingCheckedSteps] = useState<number[]>([]);

  // State for detailed step-by-step mode
  const [detailedMode, setDetailedMode] = useState(false);
  const [currentSection, setCurrentSection] = useState<
    "preDough" | "mainDough" | "baking"
  >("preDough");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Helper function to determine if a step can be checked
  const canCheckStep = (
    index: number,
    checkedSteps: number[],
    totalSteps: number,
  ): boolean => {
    // First step can always be checked if no steps are checked
    if (index === 0 && checkedSteps.length === 0) {
      return true;
    }

    // Can check the next step after the last checked step
    const lastCheckedIndex = Math.max(...checkedSteps, -1);
    return index === lastCheckedIndex + 1 && index < totalSteps;
  };

  // Handle checking/unchecking a step
  const handleToggleStep = (
    index: number,
    checkedSteps: number[],
    setCheckedSteps: React.Dispatch<React.SetStateAction<number[]>>,
    totalSteps: number,
  ) => {
    // If the step is already checked, uncheck it and all subsequent steps
    if (checkedSteps.includes(index)) {
      setCheckedSteps(checkedSteps.filter((step) => step < index));
    }
    // If the step can be checked, add it to checked steps
    else if (canCheckStep(index, checkedSteps, totalSteps)) {
      setCheckedSteps([...checkedSteps, index]);
    }
  };

  // Determine if a step should be bold (next available step)
  const isNextStep = (
    index: number,
    checkedSteps: number[],
    totalSteps: number,
  ): boolean => {
    return canCheckStep(index, checkedSteps, totalSteps);
  };

  // Get all steps from all sections for step-by-step navigation
  const getAllSteps = () => {
    const preDoughSteps = recipe.preDoughSteps || [];
    const mainDoughSteps = recipe.mainDoughSteps || [];
    const bakingSteps = recipe.bakingInstructions
      ? recipe.bakingInstructions.split("\n")
      : [];

    return {
      steps: [...preDoughSteps, ...mainDoughSteps, ...bakingSteps],
      sections: [
        ...preDoughSteps.map(() => "preDough"),
        ...mainDoughSteps.map(() => "mainDough"),
        ...bakingSteps.map(() => "baking"),
      ] as ("preDough" | "mainDough" | "baking")[],
      indices: [
        ...preDoughSteps.map((_, i) => i),
        ...mainDoughSteps.map((_, i) => i),
        ...bakingSteps.map((_, i) => i),
      ],
    };
  };

  const { steps, sections, indices } = getAllSteps();
  const totalSteps = steps.length;

  // Calculate the overall step number (across all sections)
  const calculateOverallStepIndex = () => {
    if (currentSection === "preDough") {
      return currentStepIndex;
    } else if (currentSection === "mainDough") {
      return (recipe.preDoughSteps?.length || 0) + currentStepIndex;
    } else {
      return (
        (recipe.preDoughSteps?.length || 0) +
        (recipe.mainDoughSteps?.length || 0) +
        currentStepIndex
      );
    }
  };

  const overallStepIndex = calculateOverallStepIndex();

  // Helper function to get the detailed description for a step
  const getDetailedDescription = (section: string, stepKey: string): string => {
    if (section === "preDough" && t.recipe.detailedDescriptions?.predough) {
      return t.recipe.detailedDescriptions.predough[stepKey] || "";
    } else if (
      section === "mainDough" &&
      t.recipe.detailedDescriptions?.maindough
    ) {
      return t.recipe.detailedDescriptions.maindough[stepKey] || "";
    } else if (section === "baking" && t.recipe.detailedDescriptions?.baking) {
      return t.recipe.detailedDescriptions.baking[stepKey] || "";
    }
    return "";
  };

  // Helper function to get the step key from the step text
  const getStepKey = (section: string, index: number): string => {
    if (section === "preDough") {
      const keys = Object.keys(t.recipe.steps.predough);
      return keys[index] || "";
    } else if (section === "mainDough") {
      const keys = Object.keys(t.recipe.steps.maindough);
      return keys[index] || "";
    } else if (section === "baking") {
      const keys = Object.keys(t.recipe.steps.baking);
      return keys[index] || "";
    }
    return "";
  };

  // Helper functions to get different images for each step
  const getPreDoughImage = (index: number, stepText: string = "") => {
    // Direct mapping of specific pre-dough steps to unique images
    const exactStepImages = {
      // Step 1: Making pre-dough (Poolish)
      "am vortag 1120g vorteig (poolish) herstellen":
        "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=800&q=80",
      // Step 2: Taking a bowl
      "dazu eine schüssel mit einem fassungsvermögen von mind. 2,8l nehmen":
        "https://images.unsplash.com/photo-1600398138360-766a0e0e7a3a?w=800&q=80",
      // Step 3: Adding water
      "560ml wasser hineingeben":
        "https://images.unsplash.com/photo-1612200058178-28668cc5e3b5?w=800&q=80",
      // Step 4: Adding yeast
      "dann 5g trockenhefe dazu geben und kurz umrühren":
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
      // Step 5: Adding honey
      "danach 5g honig beimischen":
        "https://images.unsplash.com/photo-1587248720327-8eb72564be1e?w=800&q=80",
      // Step 6: Adding flour and mixing
      "zum schluss 560g mehl hinein geben und mit einem löffel mischen bis kein mehl mehr zusehen ist":
        "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80",
      // Step 7: Letting rest at room temperature
      "dann 1h zugedeckt bei zimmertemperatur stehen lassen":
        "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=800&q=80",
      // Step 8: Putting in refrigerator
      "danach zugedeckt in den kühlschrank geben":
        "https://images.unsplash.com/photo-1591981093714-55c8f0f51ec3?w=800&q=80",
    };

    // Additional unique images for each category
    const predoughImages = {
      making: [
        "https://images.unsplash.com/photo-1585478259715-1c195a3c6522?w=800&q=80",
        "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=800&q=80",
        "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&q=80",
        "https://images.unsplash.com/photo-1590544289819-b5f6d0179834?w=800&q=80",
      ],
      bowl: [
        "https://images.unsplash.com/photo-1600398138360-766a0e0e7a3a?w=800&q=80",
        "https://images.unsplash.com/photo-1617651524211-23485a7aaff4?w=800&q=80",
        "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800&q=80",
        "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&q=80",
      ],
      water: [
        "https://images.unsplash.com/photo-1612200058178-28668cc5e3b5?w=800&q=80",
        "https://images.unsplash.com/photo-1548865151-f526008d7abd?w=800&q=80",
        "https://images.unsplash.com/photo-1559628233-100c798642d4?w=800&q=80",
        "https://images.unsplash.com/photo-1617651524211-23485a7aaff4?w=800&q=80",
      ],
      yeast: [
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
        "https://images.unsplash.com/photo-1605971658793-b9898ae9e9cb?w=800&q=80",
        "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&q=80",
        "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=800&q=80",
      ],
      honey: [
        "https://images.unsplash.com/photo-1587248720327-8eb72564be1e?w=800&q=80",
        "https://images.unsplash.com/photo-1601063476271-a159c71ab0b3?w=800&q=80",
        "https://images.unsplash.com/photo-1582486225644-dce1381dc161?w=800&q=80",
        "https://images.unsplash.com/photo-1555174327-5ddc7fd2b9d9?w=800&q=80",
      ],
      flour: [
        "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80",
        "https://images.unsplash.com/photo-1586444267326-4e3d3b6af2b2?w=800&q=80",
        "https://images.unsplash.com/photo-1585478259715-1c195a3c6522?w=800&q=80",
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
      ],
      rest: [
        "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=800&q=80",
        "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800&q=80",
        "https://images.unsplash.com/photo-1590544289819-b5f6d0179834?w=800&q=80",
        "https://images.unsplash.com/photo-1604908176997-125f7c9c7c3a?w=800&q=80",
      ],
      refrigerator: [
        "https://images.unsplash.com/photo-1591981093714-55c8f0f51ec3?w=800&q=80",
        "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800&q=80",
        "https://images.unsplash.com/photo-1584992236310-6ded1d34e5fb?w=800&q=80",
        "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80",
      ],
      poolish: [
        "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=800&q=80",
        "https://images.unsplash.com/photo-1590544289819-b5f6d0179834?w=800&q=80",
        "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&q=80",
        "https://images.unsplash.com/photo-1585478259715-1c195a3c6522?w=800&q=80",
      ],
    };

    // For "without predough" preparation - unique images for each step
    const withoutPredoughImages = [
      "https://images.unsplash.com/photo-1590544289819-b5f6d0179834?w=800&q=80",
      "https://images.unsplash.com/photo-1586444267326-4e3d3b6af2b2?w=800&q=80",
      "https://images.unsplash.com/photo-1612200058178-28668cc5e3b5?w=800&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
      "https://images.unsplash.com/photo-1587248720327-8eb72564be1e?w=800&q=80",
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80",
      "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=800&q=80",
      "https://images.unsplash.com/photo-1591981093714-55c8f0f51ec3?w=800&q=80",
    ];

    // First check for exact step match
    const normalizedStepText = stepText.toLowerCase().trim();
    if (exactStepImages[normalizedStepText]) {
      return exactStepImages[normalizedStepText];
    }

    // Check if this is a "without predough" preparation
    if (
      stepText.toLowerCase().includes("10min stehen lassen") ||
      stepText.toLowerCase().includes("ohne vorteig") ||
      stepText.toLowerCase().includes("without pre-dough")
    ) {
      // Use a unique image based on the exact index to ensure no repetition
      return withoutPredoughImages[index % withoutPredoughImages.length];
    }

    // Keyword-based image selection with index to ensure uniqueness
    if (
      stepText.toLowerCase().includes("vorteig") ||
      stepText.toLowerCase().includes("poolish") ||
      stepText.toLowerCase().includes("pre-dough")
    ) {
      return predoughImages.making[index % predoughImages.making.length];
    }

    if (
      stepText.toLowerCase().includes("schüssel") ||
      stepText.toLowerCase().includes("bowl")
    ) {
      return predoughImages.bowl[index % predoughImages.bowl.length];
    }

    if (
      stepText.toLowerCase().includes("wasser") ||
      stepText.toLowerCase().includes("water")
    ) {
      return predoughImages.water[index % predoughImages.water.length];
    }

    if (
      stepText.toLowerCase().includes("hefe") ||
      stepText.toLowerCase().includes("yeast")
    ) {
      return predoughImages.yeast[index % predoughImages.yeast.length];
    }

    if (
      stepText.toLowerCase().includes("honig") ||
      stepText.toLowerCase().includes("honey")
    ) {
      return predoughImages.honey[index % predoughImages.honey.length];
    }

    if (
      stepText.toLowerCase().includes("mehl") ||
      stepText.toLowerCase().includes("flour")
    ) {
      return predoughImages.flour[index % predoughImages.flour.length];
    }

    if (
      (stepText.toLowerCase().includes("stehen lassen") ||
        stepText.toLowerCase().includes("rest")) &&
      !stepText.toLowerCase().includes("10min")
    ) {
      return predoughImages.rest[index % predoughImages.rest.length];
    }

    if (
      stepText.toLowerCase().includes("kühlschrank") ||
      stepText.toLowerCase().includes("refrigerator")
    ) {
      return predoughImages.refrigerator[
        index % predoughImages.refrigerator.length
      ];
    }

    // Unique fallback based on step index
    const allImages = [
      "https://images.unsplash.com/photo-1585478259715-1c195a3c6522?w=800&q=80",
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=800&q=80",
      "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&q=80",
      "https://images.unsplash.com/photo-1590544289819-b5f6d0179834?w=800&q=80",
      "https://images.unsplash.com/photo-1600398138360-766a0e0e7a3a?w=800&q=80",
      "https://images.unsplash.com/photo-1617651524211-23485a7aaff4?w=800&q=80",
      "https://images.unsplash.com/photo-1612200058178-28668cc5e3b5?w=800&q=80",
      "https://images.unsplash.com/photo-1548865151-f526008d7abd?w=800&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
      "https://images.unsplash.com/photo-1605971658793-b9898ae9e9cb?w=800&q=80",
      "https://images.unsplash.com/photo-1587248720327-8eb72564be1e?w=800&q=80",
      "https://images.unsplash.com/photo-1601063476271-a159c71ab0b3?w=800&q=80",
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80",
      "https://images.unsplash.com/photo-1586444267326-4e3d3b6af2b2?w=800&q=80",
      "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=800&q=80",
      "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800&q=80",
      "https://images.unsplash.com/photo-1591981093714-55c8f0f51ec3?w=800&q=80",
      "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800&q=80",
    ];

    // Ensure a unique image for each step by using the index directly
    return allImages[index % allImages.length];
  };

  const getMainDoughImage = (index: number, stepText: string = "") => {
    // Direct mapping of specific main dough steps to unique images
    const exactStepImages = {
      // Step 1: Taking pre-dough from refrigerator
      "die schüssel mit dem vorteig (poolish) aus dem kühlschrank nehmen":
        "https://images.unsplash.com/photo-1591981093714-55c8f0f51ec3?w=800&q=80",
      // Step 2: Taking a new bowl and adding pre-dough
      "eine neue schüssel mit fassungsvermögen von mind. 4,48l nehmen und den vorteig (poolish) dort hineingeben":
        "https://images.unsplash.com/photo-1600398138360-766a0e0e7a3a?w=800&q=80",
      // Step 3: Adding water and mixing with pre-dough
      "320ml wasser hinzugeben und von hand mit dem vorteig (poolish) mischen":
        "https://images.unsplash.com/photo-1617651524211-23485a7aaff4?w=800&q=80",
      // Step 4: Adding salt
      "dann 39g salz hinzugeben und umrühren":
        "https://images.unsplash.com/photo-1531817681549-5bf9be6e8f95?w=800&q=80",
      // Step 5: Adding flour and mixing by hand
      "danach 800g mehl dazugeben und mit der hand alles vermischen":
        "https://images.unsplash.com/photo-1585478259715-1c195a3c6522?w=800&q=80",
      // Step 6: Putting dough on work surface
      "den teig auf die arbeitsplatte geben":
        "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&q=80",
      // Step 7: Kneading dough
      "teig mind. 15min kneten":
        "https://images.unsplash.com/photo-1590544289819-b5f6d0179834?w=800&q=80",
      // Step 8: Forming ball and adding olive oil
      "gekneteter teig auf arbeitsplate zu einer kugel formen und mit olivenöl mit den händen auftupfen":
        "https://images.unsplash.com/photo-1596458397260-255807e979f1?w=800&q=80",
      // Step 9: Covering with bowl and letting rest
      "dann mit einer schüssel zudecken für 15min stehen lassen":
        "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=800&q=80",
      // Step 10: Folding dough
      "dann teig ca. 10mal anheben und auf den tisch zurück legen sodass er gefaltet wird. dabei den teig immer um 90° drehen.":
        "https://images.unsplash.com/photo-1604908176997-125f7c9c7c3a?w=800&q=80",
      // Step 11: Forming ball again and letting rest
      "wieder zu einer kugel formen und zugedeckt für 1h stehen lassen":
        "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&q=80",
      // Step 12: Dividing dough and forming small balls
      "teig in 8 teiglinge à 280g teilen und kleine kugeln formen":
        "https://images.unsplash.com/photo-1604908554105-088645ba1575?w=800&q=80",

      // Without pre-dough specific steps
      "eine schüssel mit fassungsvermögen von mind. 3l nehmen":
        "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&q=80",
      "800ml wasser hineingeben":
        "https://images.unsplash.com/photo-1559628233-100c798642d4?w=800&q=80",
      "dann 10g trockenhefe dazu geben und kurz umrühren":
        "https://images.unsplash.com/photo-1605971658793-b9898ae9e9cb?w=800&q=80",
      "danach 10g honig beimischen und 10min stehen lassen":
        "https://images.unsplash.com/photo-1582486225644-dce1381dc161?w=800&q=80",
      "dann 1200g mehl dazugeben":
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
      "als nächstes 40g salz hinzugeben und von hand vermischen":
        "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=800&q=80",
      "olivenöl zugeben":
        "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&q=80",
      "teig ca. 10min kneten lassen":
        "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=800&q=80",
      "gekneteter teig auf arbeitsplatte zu einer kugel formen und mit olivenöl leicht einreiben":
        "https://images.unsplash.com/photo-1596458397260-255807e979f1?w=800&q=80",
      "kugeln in einen geschlossenen, mit olivenöl eingeriebenen behälter, geben":
        "https://images.unsplash.com/photo-1584992236310-6ded1d34e5fb?w=800&q=80",
    };

    // Additional unique images for each category
    const mainDoughImages = {
      // Different kneading methods with more unique images
      kneadingByHand: [
        "https://images.unsplash.com/photo-1590544289819-b5f6d0179834?w=800&q=80",
        "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&q=80",
        "https://images.unsplash.com/photo-1586444267326-4e3d3b6af2b2?w=800&q=80",
        "https://images.unsplash.com/photo-1604908176997-125f7c9c7c3a?w=800&q=80",
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
        "https://images.unsplash.com/photo-1585478259715-1c195a3c6522?w=800&q=80",
      ],
      kneadingByMachine: [
        "https://images.unsplash.com/photo-1591981093714-55c8f0f51ec3?w=800&q=80",
        "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=800&q=80",
        "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&q=80",
        "https://images.unsplash.com/photo-1605971658793-b9898ae9e9cb?w=800&q=80",
        "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80",
        "https://images.unsplash.com/photo-1584992236310-6ded1d34e5fb?w=800&q=80",
      ],
      // With predough vs without predough - expanded with more unique images
      withPredough: [
        "https://images.unsplash.com/photo-1591981093714-55c8f0f51ec3?w=800&q=80", // Taking from fridge
        "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=800&q=80", // Poolish
        "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&q=80", // Working with predough
        "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800&q=80", // Refrigerator open
        "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80", // Fermentation
        "https://images.unsplash.com/photo-1584992236310-6ded1d34e5fb?w=800&q=80", // Container
      ],
      withoutPredough: [
        "https://images.unsplash.com/photo-1585478259715-1c195a3c6522?w=800&q=80", // Starting with flour
        "https://images.unsplash.com/photo-1617651524211-23485a7aaff4?w=800&q=80", // Adding water directly
        "https://images.unsplash.com/photo-1590544289819-b5f6d0179834?w=800&q=80", // Direct kneading
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", // More flour
        "https://images.unsplash.com/photo-1559628233-100c798642d4?w=800&q=80", // Water pouring
        "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&q=80", // Bowl
      ],
      // Other step categories with expanded unique images
      refrigerator: [
        "https://images.unsplash.com/photo-1591981093714-55c8f0f51ec3?w=800&q=80",
        "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800&q=80",
        "https://images.unsplash.com/photo-1584992236310-6ded1d34e5fb?w=800&q=80",
        "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80",
      ],
      bowl: [
        "https://images.unsplash.com/photo-1600398138360-766a0e0e7a3a?w=800&q=80",
        "https://images.unsplash.com/photo-1617651524211-23485a7aaff4?w=800&q=80",
        "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&q=80",
        "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800&q=80",
      ],
      water: [
        "https://images.unsplash.com/photo-1617651524211-23485a7aaff4?w=800&q=80",
        "https://images.unsplash.com/photo-1612200058178-28668cc5e3b5?w=800&q=80",
        "https://images.unsplash.com/photo-1559628233-100c798642d4?w=800&q=80",
        "https://images.unsplash.com/photo-1548865151-f526008d7abd?w=800&q=80",
      ],
      salt: [
        "https://images.unsplash.com/photo-1531817681549-5bf9be6e8f95?w=800&q=80",
        "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=800&q=80",
        "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=800&q=80",
        "https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?w=800&q=80",
      ],
      oil: [
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
        "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&q=80",
        "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?w=800&q=80",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
      ],
      flour: [
        "https://images.unsplash.com/photo-1585478259715-1c195a3c6522?w=800&q=80",
        "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80",
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
        "https://images.unsplash.com/photo-1586444267326-4e3d3b6af2b2?w=800&q=80",
      ],
      ball: [
        "https://images.unsplash.com/photo-1596458397260-255807e979f1?w=800&q=80",
        "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&q=80",
        "https://images.unsplash.com/photo-1590544289819-b5f6d0179834?w=800&q=80",
        "https://images.unsplash.com/photo-1604908176997-125f7c9c7c3a?w=800&q=80",
      ],
      covering: [
        "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=800&q=80",
        "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800&q=80",
        "https://images.unsplash.com/photo-1584992236310-6ded1d34e5fb?w=800&q=80",
        "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80",
      ],
      folding: [
        "https://images.unsplash.com/photo-1604908176997-125f7c9c7c3a?w=800&q=80",
        "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&q=80",
        "https://images.unsplash.com/photo-1590544289819-b5f6d0179834?w=800&q=80",
        "https://images.unsplash.com/photo-1596458397260-255807e979f1?w=800&q=80",
      ],
      dividing: [
        "https://images.unsplash.com/photo-1604908554105-088645ba1575?w=800&q=80",
        "https://images.unsplash.com/photo-1596458397260-255807e979f1?w=800&q=80",
        "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&q=80",
        "https://images.unsplash.com/photo-1590544289819-b5f6d0179834?w=800&q=80",
      ],
    };

    // First check for exact step match
    const normalizedStepText = stepText.toLowerCase().trim();
    if (exactStepImages[normalizedStepText]) {
      return exactStepImages[normalizedStepText];
    }

    // Check if this is a "without predough" preparation
    if (
      stepText.toLowerCase().includes("ohne vorteig") ||
      stepText.toLowerCase().includes("without pre-dough")
    ) {
      // Use a unique image based on the exact index to ensure no repetition
      return mainDoughImages.withoutPredough[
        index % mainDoughImages.withoutPredough.length
      ];
    }

    // Keyword-based image selection with index to ensure uniqueness
    if (
      stepText.toLowerCase().includes("vorteig") ||
      stepText.toLowerCase().includes("poolish") ||
      stepText.toLowerCase().includes("pre-dough")
    ) {
      return mainDoughImages.withPredough[
        index % mainDoughImages.withPredough.length
      ];
    }

    if (
      stepText.toLowerCase().includes("kühlschrank") ||
      stepText.toLowerCase().includes("refrigerator")
    ) {
      return mainDoughImages.refrigerator[
        index % mainDoughImages.refrigerator.length
      ];
    }

    if (
      stepText.toLowerCase().includes("schüssel") ||
      stepText.toLowerCase().includes("bowl")
    ) {
      return mainDoughImages.bowl[index % mainDoughImages.bowl.length];
    }

    if (
      stepText.toLowerCase().includes("wasser") ||
      stepText.toLowerCase().includes("water")
    ) {
      return mainDoughImages.water[index % mainDoughImages.water.length];
    }

    if (
      stepText.toLowerCase().includes("salz") ||
      stepText.toLowerCase().includes("salt")
    ) {
      return mainDoughImages.salt[index % mainDoughImages.salt.length];
    }

    if (
      stepText.toLowerCase().includes("olivenöl") ||
      stepText.toLowerCase().includes("olive oil")
    ) {
      return mainDoughImages.oil[index % mainDoughImages.oil.length];
    }

    if (
      stepText.toLowerCase().includes("mehl") ||
      stepText.toLowerCase().includes("flour")
    ) {
      return mainDoughImages.flour[index % mainDoughImages.flour.length];
    }

    if (
      stepText.toLowerCase().includes("kugel") ||
      stepText.toLowerCase().includes("ball")
    ) {
      return mainDoughImages.ball[index % mainDoughImages.ball.length];
    }

    if (
      stepText.toLowerCase().includes("zudecken") ||
      stepText.toLowerCase().includes("cover")
    ) {
      return mainDoughImages.covering[index % mainDoughImages.covering.length];
    }

    if (
      stepText.toLowerCase().includes("falte") ||
      stepText.toLowerCase().includes("fold")
    ) {
      return mainDoughImages.folding[index % mainDoughImages.folding.length];
    }

    if (
      stepText.toLowerCase().includes("teilen") ||
      stepText.toLowerCase().includes("divide")
    ) {
      return mainDoughImages.dividing[index % mainDoughImages.dividing.length];
    }

    if (
      stepText.toLowerCase().includes("kneten") ||
      stepText.toLowerCase().includes("knead")
    ) {
      if (
        stepText.toLowerCase().includes("maschine") ||
        stepText.toLowerCase().includes("machine")
      ) {
        return mainDoughImages.kneadingByMachine[
          index % mainDoughImages.kneadingByMachine.length
        ];
      } else {
        return mainDoughImages.kneadingByHand[
          index % mainDoughImages.kneadingByHand.length
        ];
      }
    }

    // Unique fallback based on step index
    const allImages = [
      "https://images.unsplash.com/photo-1590544289819-b5f6d0179834?w=800&q=80",
      "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&q=80",
      "https://images.unsplash.com/photo-1585478259715-1c195a3c6522?w=800&q=80",
      "https://images.unsplash.com/photo-1604908176997-125f7c9c7c3a?w=800&q=80",
      "https://images.unsplash.com/photo-1596458397260-255807e979f1?w=800&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
      "https://images.unsplash.com/photo-1617651524211-23485a7aaff4?w=800&q=80",
      "https://images.unsplash.com/photo-1600398138360-766a0e0e7a3a?w=800&q=80",
      "https://images.unsplash.com/photo-1591981093714-55c8f0f51ec3?w=800&q=80",
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=800&q=80",
      "https://images.unsplash.com/photo-1531817681549-5bf9be6e8f95?w=800&q=80",
      "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=800&q=80",
    ];

    // Ensure a unique image for each step by using the index directly
    return allImages[index % allImages.length];
  };

  const getBakingImage = (index: number, stepText: string = "") => {
    // Direct mapping of specific baking steps to unique images
    const exactStepImages = {
      // Step 1: Preheating oven
      "ofen ca. 50min (0,8h) vor dem backen aufheizen":
        "https://images.unsplash.com/photo-1586158291800-2665f07bba79?w=800&q=80",
      // Step 2: Checking temperature
      "temperatur von ofen und stein prüfen":
        "https://images.unsplash.com/photo-1593854823322-5a737e326b1c?w=800&q=80",
      // Step 3: Baking pizza
      "wenn beides bei ca. über 350°c (660°f) liegt pizza für ca. 2min backen":
        "https://images.unsplash.com/photo-1593560708920-61b98ae52d42?w=800&q=80",
    };

    // Additional unique images for each category
    const bakingImages = {
      preheating: [
        "https://images.unsplash.com/photo-1586158291800-2665f07bba79?w=800&q=80",
        "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?w=800&q=80",
        "https://images.unsplash.com/photo-1586999768265-24af89630739?w=800&q=80",
        "https://images.unsplash.com/photo-1592985684811-6c0f98adb014?w=800&q=80",
      ],
      temperature: [
        "https://images.unsplash.com/photo-1593854823322-5a737e326b1c?w=800&q=80",
        "https://images.unsplash.com/photo-1593560708920-61b98ae52d42?w=800&q=80",
        "https://images.unsplash.com/photo-1595854341625-f33e32c9cf65?w=800&q=80",
        "https://images.unsplash.com/photo-1513135467880-6c41603e6aa8?w=800&q=80",
      ],
      baking: [
        "https://images.unsplash.com/photo-1593560708920-61b98ae52d42?w=800&q=80",
        "https://images.unsplash.com/photo-1595854341625-f33e32c9cf65?w=800&q=80",
        "https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=800&q=80",
        "https://images.unsplash.com/photo-1571066811602-716837d681de?w=800&q=80",
      ],
      forming: [
        "https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=800&q=80",
        "https://images.unsplash.com/photo-1605591099585-87db8e6e6b8a?w=800&q=80",
        "https://images.unsplash.com/photo-1622883618971-3c9f2a7a1926?w=800&q=80",
        "https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=800&q=80",
      ],
    };

    // First check for exact step match
    const normalizedStepText = stepText.toLowerCase().trim();
    if (exactStepImages[normalizedStepText]) {
      return exactStepImages[normalizedStepText];
    }

    // Keyword-based image selection with index to ensure uniqueness
    if (
      stepText.toLowerCase().includes("aufheizen") ||
      stepText.toLowerCase().includes("preheat")
    ) {
      return bakingImages.preheating[index % bakingImages.preheating.length];
    }

    if (
      stepText.toLowerCase().includes("temperatur") ||
      stepText.toLowerCase().includes("temperature")
    ) {
      return bakingImages.temperature[index % bakingImages.temperature.length];
    }

    if (
      stepText.toLowerCase().includes("backen") ||
      stepText.toLowerCase().includes("bake")
    ) {
      return bakingImages.baking[index % bakingImages.baking.length];
    }

    if (
      stepText.toLowerCase().includes("formen") ||
      stepText.toLowerCase().includes("form")
    ) {
      return bakingImages.forming[index % bakingImages.forming.length];
    }

    // Unique fallback based on step index
    const allImages = [
      "https://images.unsplash.com/photo-1586158291800-2665f07bba79?w=800&q=80",
      "https://images.unsplash.com/photo-1593854823322-5a737e326b1c?w=800&q=80",
      "https://images.unsplash.com/photo-1593560708920-61b98ae52d42?w=800&q=80",
      "https://images.unsplash.com/photo-1595854341625-f33e32c9cf65?w=800&q=80",
    ];

    // Ensure a unique image for each step by using the index directly
    return allImages[index % allImages.length];
  };

  // Render the detailed step-by-step view
  const renderDetailedStep = () => {
    const currentStep = steps[overallStepIndex];
    const currentSectionType = sections[overallStepIndex];
    const currentIndexInSection = indices[overallStepIndex];

    let stepImage = "";
    if (currentSectionType === "preDough") {
      stepImage = getPreDoughImage(currentIndexInSection, currentStep);
    } else if (currentSectionType === "mainDough") {
      stepImage = getMainDoughImage(currentIndexInSection, currentStep);
    } else {
      stepImage = getBakingImage(currentIndexInSection, currentStep);
    }

    // Get the step key for the current step to retrieve the detailed description
    const stepKey = getStepKey(currentSectionType, currentIndexInSection);
    const detailedDescription = getDetailedDescription(
      currentSectionType,
      stepKey,
    );

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {t.recipe.stepCounter
              .replace("{current}", (overallStepIndex + 1).toString())
              .replace("{total}", totalSteps.toString())}
          </h3>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDetailedMode(false)}
            >
              {t.recipe.allSteps}
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={stepImage}
              alt={`Step ${overallStepIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 space-y-4">
            <p className="text-lg font-medium">{currentStep}</p>
            {detailedDescription && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm text-gray-700">
                {detailedDescription}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => {
              if (overallStepIndex > 0) {
                const prevSection = sections[overallStepIndex - 1];
                const prevIndex = indices[overallStepIndex - 1];
                setCurrentSection(prevSection);
                setCurrentStepIndex(prevIndex);
              }
            }}
            disabled={overallStepIndex === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t.recipe.previousStep}
          </Button>
          <Button
            onClick={() => {
              if (overallStepIndex < totalSteps - 1) {
                const nextSection = sections[overallStepIndex + 1];
                const nextIndex = indices[overallStepIndex + 1];
                setCurrentSection(nextSection);
                setCurrentStepIndex(nextIndex);
              }
            }}
            disabled={overallStepIndex === totalSteps - 1}
          >
            {t.recipe.nextStep}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Render a section of steps (pre-dough, main dough, or baking)
  const renderStepSection = (
    title: string,
    steps: string[],
    date: string,
    checkedSteps: number[],
    setCheckedSteps: React.Dispatch<React.SetStateAction<number[]>>,
    sectionType: "preDough" | "mainDough" | "baking",
  ) => {
    return (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
        <ul className="space-y-3">
          {steps.map((step, index) => {
            const isChecked = checkedSteps.includes(index);
            const isNext = isNextStep(index, checkedSteps, steps.length);
            const stepKey = getStepKey(sectionType, index);
            const detailedDescription = detailedMode
              ? getDetailedDescription(sectionType, stepKey)
              : "";

            return (
              <li key={index} className="space-y-2">
                <div
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-md",
                    isChecked
                      ? "bg-green-50 text-green-900"
                      : isNext
                        ? "bg-blue-50 text-blue-900 font-medium"
                        : "bg-gray-50",
                  )}
                >
                  <div
                    className={cn(
                      "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5",
                      isChecked
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : isNext
                          ? "bg-blue-100 text-blue-700 border border-blue-300"
                          : "bg-gray-200 text-gray-500 border border-gray-300",
                    )}
                    onClick={() =>
                      handleToggleStep(
                        index,
                        checkedSteps,
                        setCheckedSteps,
                        steps.length,
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {isChecked ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={cn(isChecked ? "line-through opacity-75" : "")}
                    >
                      {isMetric
                        ? step
                        : convertMeasurementsInText(step, "imperial")}
                    </p>
                    {detailedMode && detailedDescription && (
                      <div className="mt-3 p-3 bg-white rounded-md text-sm text-gray-700 border border-gray-200">
                        {detailedDescription}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">{recipe.title}</h2>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="detailed-mode"
            checked={detailedMode}
            onCheckedChange={(checked) => {
              setDetailedMode(checked);
              // If switching to detailed mode, start with the first step
              if (checked && !detailedMode) {
                setCurrentSection("preDough");
                setCurrentStepIndex(0);
              }
            }}
          />
          <Label htmlFor="detailed-mode">{t.recipe.detailedSteps}</Label>
        </div>

        {detailedMode && renderDetailedStep()}

        {!detailedMode && (
          <div className="space-y-8">
            {recipe.preDoughSteps && recipe.preDoughSteps.length > 0 && (
              <>
                {renderStepSection(
                  isDayBeforePreparation
                    ? `${t.recipe.preDough.title} (${t.recipe.preDough.dayBefore})`
                    : t.recipe.preDough.title,
                  recipe.preDoughSteps,
                  recipe.preDoughDate || "",
                  preDoughCheckedSteps,
                  setPreDoughCheckedSteps,
                  "preDough",
                )}
                <Separator />
              </>
            )}

            {recipe.mainDoughSteps && recipe.mainDoughSteps.length > 0 && (
              <>
                {renderStepSection(
                  isDayBeforePreparation
                    ? `${t.recipe.mainDough.title} (${t.recipe.mainDough.dayAfter})`
                    : t.recipe.mainDough.title,
                  recipe.mainDoughSteps,
                  recipe.mainDoughDate || "",
                  mainDoughCheckedSteps,
                  setMainDoughCheckedSteps,
                  "mainDough",
                )}
                <Separator />
              </>
            )}

            {recipe.bakingInstructions && (
              <>
                {renderStepSection(
                  t.recipe.baking.title,
                  recipe.bakingInstructions.split("\n"),
                  recipe.bakingDate || "",
                  bakingCheckedSteps,
                  setBakingCheckedSteps,
                  "baking",
                )}
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecipeDisplay;
