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
    title: "Der Ultimative Pizza-Rezept-Generator",
    subtitle: "Erstelle deine perfekte hausgemachte Pizza mit diesem Generator",
    footer: {
      copyright: "© {year} Pizza-Konfigurator",
      description:
        "Erstelle deine perfekte hausgemachte Pizza mit diesem Generator",
    },
  },
  tabs: {
    configuration: "Konfiguration",
    recipe: "Rezept",
    shopping: "Einkaufsliste",
  },
  configuration: {
    title: "Pizza-Rezept-Generator",
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
    tooltips: {
      pizzaCount:
        "Wähle aus, wie viele Pizzen du machen möchtest. Jede Pizza entspricht einem Teigball.",
      pizzaSize:
        "Wähle den Durchmesser deiner Pizza. Größere Pizzen benötigen mehr Teig pro Teigball.",
      preparation:
        "Wähle deine bevorzugte Zubereitungsmethode. Die Verwendung eines Vorteigs verbessert Geschmack und Textur.",
      hydration:
        "Das Verhältnis von Wasser zu Mehl. Niedrigere Prozentsätze (60-65%) sind für Anfänger einfacher zu Verarbeiten, während höhere Prozentsätze (ab 70%) für erfahrene Bäcker geeignet sind und einen luftigeren Pizzaboden erzeugen..",
      yeastType:
        "Wähle zwischen Trockenhefe oder Frischhefe. Frischhefe sorgt für ein etwas besseres Aufgehen, hat aber eine kürzere Haltbarkeit.",
      predoughPercentage:
        "Der Prozentsatz des Gesamtteigs, der als Vorteig zubereitet wird. Höhere Prozentsätze erzeugen komplexere Aromen.",
      kneadingMethod:
        "Wähle, ob du von Hand oder mit einer Maschine kneten möchtest. Kneten von Hand dauert länger, gibt dir aber mehr Kontrolle.",
      ovenType:
        "Wähle deinen Ofentyp. Verschiedene Öfen erfordern unterschiedliche Backtechniken und -zeiten.",
      maxTemperature:
        "Die maximale Temperatur, die dein Ofen erreichen kann. Höhere Temperaturen führen zu kürzeren Backzeiten und geschmacklich besserer Pizza.",
      pizzaSurface:
        "Die Oberfläche, auf der du deine Pizza backen wirst. Pizzasteine und -stähle helfen, eine knusprige Kruste zu erzielen.",
      ovenSize:
        "Die Abmessungen deines Ofens. Dies beeinflusst, wie viele Pizzen du gleichzeitig backen kannst.",
      eatingTime:
        "Lege fest, wann du essen möchtest. Das Rezept berechnet alle Vorbereitungszeiten basierend darauf.",
      toppings:
        "Wähle die gewünschten Belagszutaten. Die Einkaufsliste enthält diese Zutaten sowie die Zutaten für den Teig, Mozzarella, Tomatensauce, Olivenöl und Basilikum.",
    },
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
    detailedSteps: "Detaillierte Einzelschritte",
    nextStep: "Nächster Schritt",
    previousStep: "Zurück",
    allSteps: "Alle Schritte",
    stepCounter: "Schritt {current} von {total}",
    preDough: {
      title: "Vorteig Zubereitung",
      dayBefore: "Ein Tag vorher",
    },
    mainDough: {
      title: "Hauptteig Zubereitung",
      dayAfter: "Ein Tag später",
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
          "Dazu eine Schüssel mit einem Fassungsvermögen von mind. {size}L verwenden",
        addWater: "{amount}ml Wasser hineingeben",
        addYeast: "Dann {amount}g {type} dazu geben und kurz umrühren",
        addHoney: "Danach {amount}g Honig beimischen",
        addFlour:
          "Zum Schluss {amount}g Mehl hinein geben und mit einem Löffel mischen bis kein Mehl mehr zusehen ist",
        letRest: "Dann {time}h zugedeckt bei Zimmertemperatur stehen lassen",
        putInFridge: "Danach zugedeckt in den Kühlschrank geben",
        takeFromFridge:
          "Am nächsten Tag 3-4h vor dem Backen die Schüssel mit dem Vorteig (Poolish) aus dem Kühlschrank nehmen",
      },
      maindough: {
        prepareMixer: "Küchenmaschine mit Knethaken vorbereiten",
        takeBowl:
          "Eine neue Schüssel mit Fassungsvermögen von mind. {size}L nehmen und den Vorteig hinzugeben",
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
          "Dann mit einer Schüssel zudecken und für 15min stehen lassen",
        foldDough:
          "Danach Teig ca. 10mal anheben und auf den Tisch zurück legen sodass er gefaltet wird. Dabei den Teig immer um 90° drehen.",
        formBallAgain:
          "Wieder zu einer Kugel formen und zugedeckt für 1h stehen lassen",
        divideDough:
          "Teig in {count} Teiglinge à {size} teilen und kleine Kugeln formen",
        putInContainer:
          "Kugeln in einen geschlossenen, mit Olivenöl eingeriebenen Behälter, geben",
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
    detailedDescriptions: {
      predough: {
        makePredough:
          "Der Vorteig, auch Poolish genannt, ist eine Mischung aus Mehl, Wasser und einer kleinen Menge Hefe, die über einen längeren Zeitraum fermentiert. Dies verbessert den Geschmack und die Textur des Teigs erheblich. Die angegebene Menge wird für alle Pizzen in diesem Rezept ausreichen.",
        takeBowl:
          "Verwende eine ausreichend große Schüssel, da der Vorteig während der Fermentation aufgehen und sein Volumen vergrößern wird. Die Schüssel sollte mindestens doppelt so groß sein wie das anfängliche Volumen des Vorteigs.",
        addWater:
          "Verwende lauwarmes Wasser (etwa 25-30°C), um die Aktivierung der Hefe zu fördern. Die Wassertemperatur ist wichtig für eine optimale Fermentation.",
        addYeast:
          "Rühre die Hefe vorsichtig ein, bis sie sich vollständig im Wasser aufgelöst hat. Bei Trockenhefe ist es nicht notwendig, sie vorher zu aktivieren.",
        addHoney:
          "Honig dient als Nahrung für die Hefe und beschleunigt den Fermentationsprozess. Er verleiht dem Teig auch einen subtilen Geschmack.",
        addFlour:
          "Verwende hochwertiges Pizzamehl (Tipo 00) für beste Ergebnisse. Mische gründlich, aber nicht zu lange, um eine homogene Masse ohne Mehlklumpen zu erhalten.",
        letRest:
          "Während dieser Zeit bei Raumtemperatur beginnt die Hefe zu arbeiten und der Teig entwickelt erste Aromen. Du wirst bemerken, dass der Teig Blasen bildet und leicht aufgeht.",
        putInFridge:
          "Die Kühlung verlangsamt den Fermentationsprozess und ermöglicht eine längere, kontrollierte Entwicklung der Aromen. Decke die Schüssel mit Frischhaltefolie oder einem feuchten Tuch ab, um ein Austrocknen zu verhindern.",
        takeFromFridge:
          "Nach der Kühlung sollte der Vorteig deutlich an Volumen zugenommen haben und eine blasige, schwammartige Konsistenz aufweisen. Lasse ihn auf Raumtemperatur kommen, bevor du mit dem Hauptteig beginnst.",
      },
      maindough: {
        prepareMixer:
          "Falls du eine Küchenmaschine verwendest, stelle sicher, dass der Knethaken richtig befestigt ist. Die Maschine erleichtert das Kneten erheblich und spart Kraft.",
        takeBowl:
          "Eine saubere, große Schüssel ist wichtig, da der Teig während des Knetens und Ruhens weiter aufgehen wird. Achte darauf, dass genügend Platz für die Expansion vorhanden ist.",
        addPredough:
          "Der fermentierte Vorteig sollte blasig und leicht säuerlich riechen. Er bildet die Basis für deinen Hauptteig und bringt bereits viel Geschmack mit.",
        addWater:
          "Die Wassermenge bestimmt die Hydration (Feuchtigkeit) des Teigs. Ein feuchterer Teig ergibt eine luftigere Kruste, ist aber schwieriger zu handhaben.",
        addSalt:
          "Salz ist entscheidend für den Geschmack und beeinflusst auch die Teigstruktur. Es verlangsamt die Hefeaktivität und stärkt das Glutennetzwerk.",
        addOil:
          "Olivenöl verleiht dem Teig Geschmeidigkeit und einen reicheren Geschmack. Es hilft auch, die Kruste knuspriger zu machen. Verwende hochwertiges natives Olivenöl extra für besten Geschmack.",
        addFlour:
          "Füge das Mehl schrittweise hinzu und vermische es zunächst leicht, um Klumpenbildung zu vermeiden. Die richtige Mehlmenge ist erreicht, wenn der Teig feucht, aber nicht klebrig ist.",
        kneadByMachine:
          "Das maschinelle Kneten entwickelt das Glutennetzwerk effizient. Beginne mit niedriger Geschwindigkeit und erhöhe sie allmählich. Der Teig ist fertig, wenn er glatt, elastisch und leicht klebrig ist.",
        kneadByHand:
          "Beim Kneten von Hand drückst, faltest und dehnst du den Teig wiederholt. Dies entwickelt das Glutennetzwerk, das für eine gute Textur wichtig ist. Der Teig ist fertig, wenn er glatt und elastisch ist und sich leicht dehnen lässt, ohne zu reißen.",
        formBall:
          "Forme den Teig zu einer straffen Kugel, indem du die Ränder nach unten und zur Mitte ziehst. Eine glatte Oberfläche hilft, Feuchtigkeit zu bewahren. Das Olivenöl verhindert das Austrocknen und erleichtert die spätere Handhabung.",
        coverAndRest:
          "Diese erste Ruhezeit ermöglicht es dem Gluten, sich zu entspannen, was das spätere Formen erleichtert. Die Abdeckung verhindert, dass sich eine Kruste auf der Oberfläche bildet.",
        foldDough:
          "Das Falten stärkt die Teigstruktur und verteilt die Gase gleichmäßig. Hebe den Teig an einer Seite an, dehne ihn leicht und falte ihn über sich selbst. Drehe den Teig nach jeder Faltung, um alle Seiten gleichmäßig zu bearbeiten.",
        formBallAgain:
          "Nach dem Falten formst du den Teig erneut zu einer Kugel. Diese längere Ruhezeit ermöglicht eine weitere Fermentation und Aromaentwicklung. Der Teig sollte deutlich an Volumen zunehmen.",
        divideDough:
          "Teile den Teig vorsichtig, ohne zu viel Gas zu entweichen. Wiege jeden Teigling für gleichmäßige Pizzagrößen. Beim Formen der Kugeln ziehst du die Ränder nach unten und zur Mitte, um eine glatte Oberfläche zu erhalten.",
        putInContainer:
          "Ein geschlossener Behälter schützt vor Zugluft und verhindert das Austrocknen. Das Olivenöl erleichtert das spätere Entnehmen der Teiglinge. Die Teiglinge sollten mit ausreichend Abstand zueinander platziert werden, da sie weiter aufgehen werden.",
      },
      baking: {
        preheatOven:
          "Ein gründlich vorgeheizter Ofen ist entscheidend für eine knusprige Kruste. Je höher die Temperatur, desto schneller backt die Pizza und desto besser ist das Ergebnis. Bei Haushaltsöfen solltest du die maximale Temperatur einstellen und ausreichend Zeit zum Vorheizen einplanen.",
        formPizza:
          "Arbeite den Teig vorsichtig mit den Fingerspitzen von der Mitte nach außen, um einen dünnen Boden mit einem dickeren Rand zu formen. Vermeide Nudelholz und übermäßiges Kneten, um die Luftblasen im Teig zu erhalten. Belege die Pizza erst kurz vor dem Backen, um ein Durchweichen zu vermeiden.",
        checkTemperature:
          "Die ideale Backtemperatur hängt vom Ofentyp ab. Bei einem Pizzastein oder -stahl ist es wichtig, dass dieser die richtige Temperatur erreicht hat, bevor du die Pizza darauf legst. Verwende einen Infrarot-Thermometer, um die Temperatur zu überprüfen, falls verfügbar. Die Backzeit ist kurz, also behalte die Pizza im Auge, um ein Verbrennen zu vermeiden.",
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
