import { Translations } from "./index";

export const en: Translations = {
  common: {
    unitSystem: {
      metric: "Metric",
      us: "US Customary",
      label: "Select unit",
    },
    language: {
      de: "German",
      en: "English",
      label: "Select language",
    },
  },
  home: {
    title: "The Ultimate Pizza Recipe Generator",
    subtitle: "Create your perfect homemade pizza with this generator",
    footer: {
      copyright: "© {year} Pizza Configurator",
      description: "Create your perfect homemade pizza with this generator",
    },
  },
  tabs: {
    configuration: "Configuration",
    recipe: "Recipe",
    shopping: "Shopping List",
  },
  configuration: {
    title: "Pizza Recipe Generator",
    pizzaCount: "Number of Pizzas",
    pizzaSize: "Pizza Size",
    preparation: "Preparation",
    hydration: "Dough Hydration",
    yeastType: "Yeast Type",
    predoughPercentage: "Pre-dough Percentage",
    kneadingMethod: "Kneading Method",
    ovenType: "Oven Type",
    maxTemperature: "Maximum Temperature",
    pizzaSurface: "Pizza Surface",
    ovenSize: "Oven Size",
    eatingTime: {
      title: "When would you like to eat?",
      date: "Date",
      time: "Time",
    },
    toppings: {
      title: "Toppings",
      categories: {
        meat: "Meat",
        vegetables: "Vegetables",
        cheese: "Cheese",
      },
      items: {
        Ham: "Ham",
        Salami: "Salami",
        "Hot Salami": "Hot Salami",
        "Raw Ham": "Raw Ham",
        Onion: "Onion",
        Mushrooms: "Mushrooms",
        Pepperoni: "Pepperoni",
        Pineapple: "Pineapple",
        Olives: "Olives",
        Artichokes: "Artichokes",
        Mascarpone: "Mascarpone",
        Burrata: "Burrata",
        Garlic: "Garlic",
        "Cherry Tomatoes": "Cherry Tomatoes",
        Arugula: "Arugula",
      },
    },
    generateButton: {
      default: "Generate Recipe",
      generating: "Generating Recipe...",
    },
    predoughInfo:
      "No pre-dough percentage required when preparing without pre-dough",
    pizzaSurfaceInfo: "No separate surface needed for pizza ovens",
    pastStartTimeWarning:
      "Warning: The start time for the first task is in the past. Please adjust the date or time.",
    tooltips: {
      pizzaCount:
        "Select how many pizzas you want to make. Each pizza will be one dough ball.",
      pizzaSize:
        "Choose the diameter of your pizza. Larger pizzas require more dough per ball.",
      preparation:
        "Select your preferred preparation method. Using a pre-dough improves flavor and texture.",
      hydration:
        "The ratio of water to flour. Lower percentages (60-65%) are easier for beginners to work with, while higher percentages (from 70%) are suitable for experienced bakers and produce a fluffier pizza base.",
      yeastType:
        "Choose between dry or fresh yeast. Fresh yeast provides a slightly better rise but has a shorter shelf life.",
      predoughPercentage:
        "The percentage of the total dough that will be prepared as pre-dough. Higher percentages create more complex flavors.",
      kneadingMethod:
        "Choose whether to knead by hand or with a machine. Hand kneading takes longer but gives you more control.",
      ovenType:
        "Select your oven type. Different ovens require different baking techniques and times.",
      maxTemperature:
        "The maximum temperature your oven can reach. Higher temperatures result in faster baking times and better pizza flavor.",
      pizzaSurface:
        "The surface on which you'll bake your pizza. Pizza stones and steels help achieve a crispy crust.",
      ovenSize:
        "The dimensions of your oven. This affects the heatup-time and how many pizzas you can bake at once.",
      eatingTime:
        "Set when you plan to eat. The recipe will calculate all preparation times based on this.",
      toppings:
        "Choose your favourite toppings. The shopping list will include these ingredients as well as the dough ingredients and mozzarella, tomato sauce, olive oil and basil.",
    },
    selectOptions: {
      preparationTime: {
        dayBefore: "Pre-dough a day before",
        eightHours: "8 hours before eating",
        withoutPredough: "Without pre-dough",
      },
      yeastType: {
        dry: "Dry yeast",
        fresh: "Fresh yeast",
      },
      kneadingMethod: {
        byHand: "By Hand",
        withMachine: "With Machine",
      },
      ovenType: {
        kitchen: "Kitchen oven",
        gasGrill: "Gas grill with lid",
        woodStainless: "Pizza wood oven (stainless steel)",
        woodStone: "Pizza wood oven (stone)",
      },
      pizzaSurface: {
        stone: "Pizza stone",
        steel: "Pizza steel",
        none: "Not necessary",
      },
    },
  },
  recipe: {
    title: "Pizza Recipe",
    configuration: "Your Configuration",
    editButton: "Edit",
    preDough: {
      title: "Pre-dough Preparation",
      dayBefore: "One day before: ",
    },
    mainDough: {
      title: "Main Dough Preparation",
      dayAfter: "One day later: ",
    },
    baking: {
      title: "Baking Instructions",
    },
    buttons: {
      save: "Save Recipe",
      share: "Share Recipe",
    },
    steps: {
      predough: {
        makePredough: "The day before, make {weight}g of pre-dough (poolish)",
        takeBowl: "Take a bowl with a capacity of at least {size}L",
        addWater: "Add {amount}ml of water",
        addYeast: "Then add {amount}g of {type} and stir briefly",
        addHoney: "Next, add {amount}g of honey",
        addFlour:
          "Finally, add {amount}g of flour and mix with a spoon until no flour is visible",
        letRest: "Let it rest covered at room temperature for {time}h",
        putInFridge: "Then cover and place in the refrigerator",
        takeFromFridge:
          "The next day, 3-4 hours before baking, take the bowl with the pre-dough (poolish) out of the refrigerator",
      },
      maindough: {
        prepareMixer: "Prepare the stand mixer with the dough hook",
        takeBowl:
          "Take a new bowl with a capacity of at least {size}L and add the pre-dough",
        addPredough: "Put the pre-dough (poolish) into the mixer bowl",
        addWater: "Add {amount}ml of water",
        addSalt: "Then add {amount}g of salt and stir",
        addOil: "Add olive oil",
        addFlour: "Then add {amount}g of flour and mix by hand",
        kneadByMachine: "Knead the dough for about 10 minutes",
        kneadByHand:
          "Place the dough on the work surface and knead by hand for about 15-20 minutes",
        formBall:
          "Form the kneaded dough into a ball on the work surface and lightly coat with olive oil",
        coverAndRest: "Cover with a bowl and let rest for 15 minutes",
        foldDough:
          "Then lift the dough about 10 times and place it back on the table so that it folds. Always rotate the dough 90° each time.",
        formBallAgain: "Form into a ball again and let rest covered for 1 hour",
        divideDough:
          "Divide the dough into {count} pieces of {size} each and form small balls",
        putInContainer:
          "Place the balls in a closed container coated with olive oil",
      },
      baking: {
        preheatOven:
          "Preheat the oven about {time} before baking (at {clockTime})",
        formPizza:
          "Form the pizza ball into a pizza base by hand and add toppings just before baking",
        checkTemperature:
          "Check the temperature of the oven and {surface}. When both are at {temp}, bake the pizza for about {time} minutes",
      },
    },
  },
  shopping: {
    title: "Shopping List for {count} Pizzas with {size}",
    hideChecked: "Hide ({count})",
    showChecked: "Show ({count})",
    items: {
      flour: "Flour (Tipo 00)",
      dryYeast: "Dry yeast",
      freshYeast: "Fresh yeast",
      salt: "Salt",
      oliveOil: "Olive oil",
      honey: "Honey",
      tomatoSauce: "Tomato sauce",
      mozzarella: "Mozzarella",
      basil: "Basil",
      ham: "Ham",
      salami: "Salami",
      hotSalami: "Hot salami",
      rawHam: "Raw ham",
      onions: "Onions",
      mushrooms: "Mushrooms",
      pepperoni: "Pepperoni",
      pineapple: "Pineapple can",
      olives: "Olives",
      artichokes: "Artichokes",
      mascarpone: "Mascarpone",
      burrata: "Burrata",
      garlic: "Garlic",
      cherryTomatoes: "Cherry tomatoes",
      arugula: "Arugula",
      piece: "piece",
      bunch: "bunch",
      clove: "clove",
      can: "can",
    },
  },
  actionButtons: {
    generateRecipe: "Generate Recipe",
    generating: "Generating Recipe...",
    saveRecipe: "Save Recipe",
    shareRecipe: "Share Recipe",
  },
};
