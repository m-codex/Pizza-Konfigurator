import { Translations } from "./index";

export const de: Translations = {
  common: {
    unitSystem: {
      metric: "Metrisch",
      us: "US Customary",
      label: "Einheit wählen",
    },
    language: {
      de: "Deutsch",
      en: "Englisch",
      label: "Sprache wählen",
    },
  },
  home: {
    title: "Der Ultimative Pizza-Konfigurator",
    subtitle:
      "Erstelle deine perfekte hausgemachte Pizza mit unserem Konfigurator",
    footer: {
      copyright: "© {year} Pizza-Konfigurator",
      description:
        "Erstelle deine perfekte hausgemachte Pizza mit unserem Konfigurator",
    },
  },
  tabs: {
    configuration: "Konfiguration",
    recipe: "Rezept",
    shopping: "Einkaufsliste",
  },
  configuration: {
    title: "Pizza Konfigurator",
    pizzaCount: "Anzahl der Pizzen",
    pizzaSize: "Pizzagröße",
    preparation: "Vorbereitung",
    hydration: "Hydration des Teiges",
    yeastType: "Hefeart",
    predoughPercentage: "Vorteiganteil",
    kneadingMethod: "Knetmethode",
    ovenType: "Ofentyp",
    maxTemperature: "Maximale Temperatur",
    pizzaSurface: "Pizzaunterlage",
    ovenSize: "Ofengröße",
    eatingTime: {
      title: "Wann möchtest du essen?",
      date: "Datum",
      time: "Uhrzeit",
    },
    toppings: {
      title: "Belag",
      categories: {
        meat: "Fleisch",
        vegetables: "Gemüse",
        cheese: "Käse",
      },
      items: {
        Ham: "Schinken",
        Salami: "Salami",
        "Hot Salami": "Scharfe Salami",
        "Raw Ham": "Rohschinken",
        Onion: "Zwiebeln",
        Mushrooms: "Champignons",
        Pepperoni: "Peperoni",
        Pineapple: "Ananas",
        Olives: "Oliven",
        Artichokes: "Artischocken",
        Mascarpone: "Mascarpone",
        Burrata: "Burrata",
        Garlic: "Knoblauch",
        "Cherry Tomatoes": "Kirschtomaten",
        Arugula: "Rucola",
      },
    },
    generateButton: {
      default: "Rezept generieren",
      generating: "Rezept wird generiert...",
    },
    predoughInfo:
      "Bei Zubereitung ohne Vorteig ist kein Vorteiganteil erforderlich",
    pizzaSurfaceInfo: "Bei Pizzaöfen ist keine separate Unterlage notwendig",
    pastStartTimeWarning:
      "Achtung: Der Startzeitpunkt für die erste Aufgabe liegt in der Vergangenheit. Bitte passe das Datum oder die Uhrzeit an.",
    selectOptions: {
      preparationTime: {
        dayBefore: "Vorteig ein Tag zuvor",
        eightHours: "Vorteig 8 Stunden vor dem Essen",
        withoutPredough: "Ohne Vorteig",
      },
      yeastType: {
        dry: "Trockenhefe",
        fresh: "Frischhefe",
      },
      kneadingMethod: {
        byHand: "Von Hand",
        withMachine: "Mit Maschine",
      },
      ovenType: {
        kitchen: "Backofen",
        gasGrill: "Gasgrill mit Deckel",
        woodStainless: "Pizzaholzofen aus Edelstahl",
        woodStone: "Pizzaholzofen aus Stein",
      },
      pizzaSurface: {
        stone: "Pizzastein",
        steel: "Pizzastahl",
        none: "Keine",
      },
    },
  },
  recipe: {
    title: "Pizza Rezept",
    configuration: "Deine Konfiguration",
    editButton: "Bearbeiten",
    preDough: {
      title: "Vorteig Zubereitung",
      dayBefore: "Ein Tag vorher: ",
    },
    mainDough: {
      title: "Hauptteig Zubereitung",
      dayAfter: "Ein Tag später: ",
    },
    baking: {
      title: "Backanleitung",
    },
    buttons: {
      save: "Rezept speichern",
      share: "Rezept teilen",
    },
    steps: {
      predough: {
        makePredough: "Am Vortag {weight}g Vorteig (Poolish) herstellen",
        takeBowl:
          "Dazu eine Schüssel mit einem Fassungsvermögen von mind. {size}L nehmen",
        addWater: "{amount}ml Wasser hineingeben",
        addYeast: "Dann {amount}g {type} dazu geben und kurz umrühren",
        addHoney: "Danach {amount}g Honig beimischen",
        addFlour:
          "Zum Schluss {amount}g Mehl hinein geben und mit einem Löffel mischen bis kein Mehl mehr zusehen ist",
        letRest: "Dann {time}h zugedeckt bei Zimmertemperatur stehen lassen",
        putInFridge: "Danach zugedeckt in den Kühlschrank geben",
        takeFromFridge:
          "Am nächsten Tag 3h vor dem Backen die Schüssel mit dem Vorteig (Poolish) aus dem Kühlschrank nehmen",
      },
      maindough: {
        prepareMixer: "Küchenmaschine mit Knethaken vorbereiten",
        addPredough:
          "Den Vorteig (Poolish) in den Behälter der Küchemaschine geben",
        addWater: "{amount}ml Wasser hinzugeben",
        addSalt: "Dann {amount}g Salz hinzugeben und umrühren",
        addOil: "Olivenöl zugeben",
        addFlour: "Danach {amount}g Mehl dazugeben und von Hand vermischen",
        kneadByMachine: "Teig ca. 10min kneten lassen",
        kneadByHand:
          "Teig auf die Arbeitsplatte geben und Teig ca. 15-20min von Hand kneten",
        formBall:
          "Gekneteter Teig auf Arbeitsplatte zu einer Kugel formen und mit Olivenöl leicht einreiben",
        coverAndRest:
          "Dann mit einer Schüssel zudecken für 15min stehen lassen",
        foldDough:
          "Dann Teig ca. 10mal anheben und auf den Tisch zurück legen sodass er gefaltet wird. Dabei den Teig immer um 90° drehen.",
        formBallAgain:
          "Wieder zu einer Kugel formen und zugedeckt für 1h stehen lassen",
        divideDough:
          "Teig in {count} Teiglinge à {size} teilen und kleine Kugeln formen",
        putInContainer:
          "Kugeln in einem geschlossenen, mit Olivenöl eingeriebenen Behälter, geben",
      },
      baking: {
        preheatOven:
          "Ofen ca. {time} vor dem Backen aufheizen (um {clockTime} Uhr)",
        formPizza:
          "Pizzakugel von Hand zu einem Pizzaboden formen und Pizza kurz vor dem Backen belegen",
        checkTemperature:
          "Temperatur von Ofen und {surface} prüfen. Wenn beides bei {temp} liegt Pizza für ca. {time}min backen",
      },
    },
  },
  shopping: {
    title: "Einkaufsliste für {count} Pizzen mit {size}",
    hideChecked: "Ausblenden ({count})",
    showChecked: "Einblenden ({count})",
    items: {
      flour: "Mehl (Tipo 00)",
      dryYeast: "Trockenhefe",
      freshYeast: "Frischhefe",
      salt: "Salz",
      oliveOil: "Olivenöl",
      honey: "Honig",
      tomatoSauce: "Tomatensoße",
      mozzarella: "Mozzarella",
      basil: "Basilikum",
      ham: "Schinken",
      salami: "Salami",
      hotSalami: "Scharfe Salami",
      rawHam: "Rohschinken",
      onions: "Zwiebeln",
      mushrooms: "Champignons",
      pepperoni: "Peperoni",
      pineapple: "Ananas Dose",
      olives: "Oliven",
      artichokes: "Artischocken",
      mascarpone: "Mascarpone",
      burrata: "Burrata",
      garlic: "Knoblauch",
      cherryTomatoes: "Kirschtomaten",
      arugula: "Rucola",
      piece: "Stück",
      bunch: "Bund",
      clove: "Zehen",
      can: "Dose",
    },
  },
  actionButtons: {
    generateRecipe: "Rezept generieren",
    generating: "Rezept wird generiert...",
    saveRecipe: "Rezept speichern",
    shareRecipe: "Rezept teilen",
  },
};
