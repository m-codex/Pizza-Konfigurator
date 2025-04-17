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
    detailedSteps: "Detailed Step-by-Step",
    nextStep: "Next Step",
    previousStep: "Back",
    allSteps: "Show All Steps",
    stepCounter: "Step {current} of {total}",
    preDough: {
      title: "Pre-dough Preparation",
      dayBefore: "One day before",
    },
    mainDough: {
      title: "Main Dough Preparation",
      dayAfter: "One day later",
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
    detailedDescriptions: {
      predough: {
        makePredough:
          "The pre-dough, also called poolish, is a mixture of flour, water, and a small amount of yeast that ferments over a longer period. This significantly improves the flavor and texture of the dough. The specified amount will be sufficient for all pizzas in this recipe.",
        takeBowl:
          "Use a bowl that's large enough, as the pre-dough will rise and increase in volume during fermentation. The bowl should be at least twice as large as the initial volume of the pre-dough.",
        addWater:
          "Use lukewarm water (about 25-30°C/77-86°F) to promote yeast activation. The water temperature is important for optimal fermentation.",
        addYeast:
          "Stir the yeast gently until it's completely dissolved in the water. With dry yeast, it's not necessary to activate it beforehand.",
        addHoney:
          "Honey serves as food for the yeast and accelerates the fermentation process. It also gives the dough a subtle flavor.",
        addFlour:
          "Use high-quality pizza flour (Tipo 00) for best results. Mix thoroughly but not too long to achieve a homogeneous mass without flour lumps.",
        letRest:
          "During this time at room temperature, the yeast begins to work and the dough develops initial flavors. You'll notice that the dough forms bubbles and rises slightly.",
        putInFridge:
          "Refrigeration slows down the fermentation process and allows for a longer, controlled development of flavors. Cover the bowl with plastic wrap or a damp cloth to prevent drying out.",
        takeFromFridge:
          "After refrigeration, the pre-dough should have significantly increased in volume and have a bubbly, spongy consistency. Let it come to room temperature before starting with the main dough.",
      },
      maindough: {
        prepareMixer:
          "If you're using a stand mixer, make sure the dough hook is properly attached. The machine makes kneading much easier and saves energy.",
        takeBowl:
          "A clean, large bowl is important as the dough will continue to rise during kneading and resting. Make sure there's enough space for expansion.",
        addPredough:
          "The fermented pre-dough should be bubbly and smell slightly sour. It forms the base for your main dough and already brings a lot of flavor.",
        addWater:
          "The amount of water determines the hydration (moisture) of the dough. A moister dough results in an airier crust but is more difficult to handle.",
        addSalt:
          "Salt is crucial for flavor and also affects the dough structure. It slows down yeast activity and strengthens the gluten network.",
        addOil:
          "Olive oil gives the dough suppleness and a richer flavor. It also helps make the crust crispier. Use high-quality extra virgin olive oil for the best flavor.",
        addFlour:
          "Add the flour gradually and mix it lightly at first to avoid lumps. The right amount of flour is achieved when the dough is moist but not sticky.",
        kneadByMachine:
          "Machine kneading develops the gluten network efficiently. Start at low speed and gradually increase it. The dough is ready when it's smooth, elastic, and slightly sticky.",
        kneadByHand:
          "When kneading by hand, you repeatedly press, fold, and stretch the dough. This develops the gluten network, which is important for good texture. The dough is ready when it's smooth and elastic and can be stretched slightly without tearing.",
        formBall:
          "Shape the dough into a tight ball by pulling the edges down and to the center. A smooth surface helps retain moisture. The olive oil prevents drying out and makes later handling easier.",
        coverAndRest:
          "This first rest period allows the gluten to relax, which makes later shaping easier. The cover prevents a crust from forming on the surface.",
        foldDough:
          "Folding strengthens the dough structure and distributes the gases evenly. Lift the dough on one side, stretch it slightly, and fold it over itself. Rotate the dough after each fold to work all sides evenly.",
        formBallAgain:
          "After folding, shape the dough into a ball again. This longer rest period allows for further fermentation and flavor development. The dough should significantly increase in volume.",
        divideDough:
          "Divide the dough carefully without letting too much gas escape. Weigh each piece for uniform pizza sizes. When forming the balls, pull the edges down and to the center to create a smooth surface.",
        putInContainer:
          "A closed container protects against drafts and prevents drying out. The olive oil makes it easier to remove the dough pieces later. The pieces should be placed with sufficient distance from each other as they will continue to rise.",
      },
      baking: {
        preheatOven:
          "A thoroughly preheated oven is crucial for a crispy crust. The higher the temperature, the faster the pizza bakes and the better the result. For household ovens, you should set the maximum temperature and allow sufficient time for preheating.",
        formPizza:
          "Work the dough carefully with your fingertips from the center outward to form a thin base with a thicker edge. Avoid rolling pins and excessive kneading to preserve the air bubbles in the dough. Add toppings just before baking to prevent the dough from becoming soggy.",
        checkTemperature:
          "The ideal baking temperature depends on the oven type. With a pizza stone or steel, it's important that it has reached the right temperature before you place the pizza on it. Use an infrared thermometer to check the temperature if available. The baking time is short, so keep an eye on the pizza to prevent burning.",
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
