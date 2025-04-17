import { de } from "./de";
import { en } from "./en";

export type Language = "de" | "en";

export interface Translations {
  common: {
    unitSystem: {
      metric: string;
      us: string;
      label: string;
    };
    language: {
      de: string;
      en: string;
      label: string;
    };
  };
  home: {
    title: string;
    subtitle: string;
    footer: {
      copyright: string;
      description: string;
    };
  };
  tabs: {
    configuration: string;
    recipe: string;
    shopping: string;
  };
  configuration: {
    title: string;
    pizzaCount: string;
    pizzaSize: string;
    preparation: string;
    hydration: string;
    yeastType: string;
    predoughPercentage: string;
    kneadingMethod: string;
    ovenType: string;
    maxTemperature: string;
    pizzaSurface: string;
    ovenSize: string;
    eatingTime: {
      title: string;
      date: string;
      time: string;
    };
    toppings: {
      title: string;
      categories: {
        meat: string;
        vegetables: string;
        cheese: string;
      };
      items: {
        [key: string]: string;
      };
    };
    generateButton: {
      default: string;
      generating: string;
    };
    predoughInfo: string;
    pizzaSurfaceInfo: string;
    pastStartTimeWarning: string;
    tooltips: {
      pizzaCount: string;
      pizzaSize: string;
      preparation: string;
      hydration: string;
      yeastType: string;
      predoughPercentage: string;
      kneadingMethod: string;
      ovenType: string;
      maxTemperature: string;
      pizzaSurface: string;
      ovenSize: string;
      eatingTime: string;
      toppings: string;
    };
    selectOptions: {
      preparationTime: {
        dayBefore: string;
        eightHours: string;
        withoutPredough: string;
      };
      yeastType: {
        dry: string;
        fresh: string;
      };
      kneadingMethod: {
        byHand: string;
        withMachine: string;
      };
      ovenType: {
        kitchen: string;
        gasGrill: string;
        woodStainless: string;
        woodStone: string;
      };
      pizzaSurface: {
        stone: string;
        steel: string;
        none: string;
      };
    };
  };
  recipe: {
    title: string;
    configuration: string;
    editButton: string;
    detailedSteps: string;
    nextStep: string;
    previousStep: string;
    allSteps: string;
    stepCounter: string;
    preDough: {
      title: string;
      dayBefore: string;
    };
    mainDough: {
      title: string;
      dayAfter: string;
    };
    baking: {
      title: string;
    };
    buttons: {
      save: string;
      share: string;
    };
    steps: {
      predough: {
        makePredough: string;
        takeBowl: string;
        addWater: string;
        addYeast: string;
        addHoney: string;
        addFlour: string;
        letRest: string;
        putInFridge: string;
        takeFromFridge: string;
      };
      maindough: {
        prepareMixer: string;
        takeBowl: string;
        addPredough: string;
        addWater: string;
        addSalt: string;
        addOil: string;
        addFlour: string;
        kneadByMachine: string;
        kneadByHand: string;
        formBall: string;
        coverAndRest: string;
        foldDough: string;
        formBallAgain: string;
        divideDough: string;
        putInContainer: string;
      };
      baking: {
        preheatOven: string;
        formPizza: string;
        checkTemperature: string;
      };
    };
    detailedDescriptions: {
      predough: {
        makePredough: string;
        takeBowl: string;
        addWater: string;
        addYeast: string;
        addHoney: string;
        addFlour: string;
        letRest: string;
        putInFridge: string;
        takeFromFridge: string;
      };
      maindough: {
        prepareMixer: string;
        takeBowl: string;
        addPredough: string;
        addWater: string;
        addSalt: string;
        addOil: string;
        addFlour: string;
        kneadByMachine: string;
        kneadByHand: string;
        formBall: string;
        coverAndRest: string;
        foldDough: string;
        formBallAgain: string;
        divideDough: string;
        putInContainer: string;
      };
      baking: {
        preheatOven: string;
        formPizza: string;
        checkTemperature: string;
      };
    };
  };
  shopping: {
    title: string;
    hideChecked: string;
    showChecked: string;
    items: {
      flour: string;
      dryYeast: string;
      freshYeast: string;
      salt: string;
      oliveOil: string;
      honey: string;
      tomatoSauce: string;
      mozzarella: string;
      basil: string;
      ham: string;
      salami: string;
      hotSalami: string;
      rawHam: string;
      onions: string;
      mushrooms: string;
      pepperoni: string;
      pineapple: string;
      olives: string;
      artichokes: string;
      mascarpone: string;
      burrata: string;
      garlic: string;
      cherryTomatoes: string;
      arugula: string;
      piece: string;
      bunch: string;
      clove: string;
      can: string;
    };
  };
  actionButtons: {
    generateRecipe: string;
    generating: string;
    saveRecipe: string;
    shareRecipe: string;
  };
}

export const translations: Record<Language, Translations> = {
  de,
  en,
};

export const getTranslation = (lang: Language): Translations => {
  return translations[lang];
};
