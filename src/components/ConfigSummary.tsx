import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Edit,
  Pizza,
  Clock,
  Droplet,
  Wheat,
  FlameKindling,
  Timer,
  Percent,
  Hand,
  Thermometer,
  Layers,
  Ruler,
  Utensils,
} from "lucide-react";
import { PizzaConfiguration } from "./ConfigurationForm";
import {
  celsiusToFahrenheit,
  cmToInches,
  ovenSizeToInches,
} from "../lib/unitConversions";
import { getTranslation, Language } from "../lib/i18n";

interface ConfigSummaryProps {
  config: PizzaConfiguration;
  onEditClick: () => void;
  isMetric?: boolean;
  language?: Language;
}

const ConfigSummary: React.FC<ConfigSummaryProps> = ({
  config,
  onEditClick,
  isMetric = true,
  language = "de",
}) => {
  const t = getTranslation(language);

  // Helper function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = language === "de" ? "de-DE" : "en-US";
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to format the time
  const formatTime = (timeString: string) => {
    if (language === "de") {
      return `${timeString} Uhr`;
    } else {
      // Convert 24h format to 12h format with AM/PM
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12; // Convert 0 to 12
      return `${hour12}:${minutes} ${ampm}`;
    }
  };

  // Translate preparation time to German
  const translatePreparationTime = (prepTime: string) => {
    switch (prepTime) {
      case "Predough a day before":
        return language === "de"
          ? "Vorteig am Tag zuvor"
          : "Pre-dough a day before";
      case "8h before Eating Time":
        return language === "de"
          ? "8 Stunden vor dem Essen"
          : "8 hours before eating";
      case "Without Predough":
        return language === "de" ? "Ohne Vorteig" : "Without pre-dough";
      default:
        return prepTime;
    }
  };

  // Translate pizza size to German
  const translatePizzaSize = (size: string) => {
    // Extract the diameter and dough ball weight
    const parts = size.split(" ");
    if (parts.length >= 3) {
      return `${parts[0]} (${parts[2].replace("Dough", language === "de" ? "Teig" : "Dough")})`;
    }
    return size;
  };

  return (
    <Card className="bg-white shadow-sm mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{t.recipe.configuration}</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={onEditClick}
            className="flex items-center gap-1"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          {/* Pizza count and size */}
          <div className="flex items-start gap-2">
            <Pizza className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">{t.configuration.pizzaCount}:</span>
            <span>
              {config.pizzaCount} x{" "}
              {isMetric
                ? translatePizzaSize(config.pizzaSize)
                : cmToInches(translatePizzaSize(config.pizzaSize))}
            </span>
          </div>

          {/* Date and time */}
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">
              {t.configuration.eatingTime.date}:
            </span>
            <span>
              {formatDate(config.eatingDate)}, {formatTime(config.eatingTime)}
            </span>
          </div>

          {/* Preparation time */}
          <div className="flex items-start gap-2">
            <Timer className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">
              {t.configuration.preparation}:
            </span>
            <span>{translatePreparationTime(config.preparationTime)}</span>
          </div>

          {/* Hydration */}
          <div className="flex items-start gap-2">
            <Droplet className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">{t.configuration.hydration}:</span>
            <span>{config.hydration}</span>
          </div>

          {/* Yeast type */}
          <div className="flex items-start gap-2">
            <Wheat className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">{t.configuration.yeastType}:</span>
            <span>
              {config.yeastType === "Dry yeast"
                ? language === "de"
                  ? "Trockenhefe"
                  : "Dry yeast"
                : language === "de"
                  ? "Frischhefe"
                  : "Fresh yeast"}
            </span>
          </div>

          {/* Predough percentage */}
          <div className="flex items-start gap-2">
            <Percent className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">
              {t.configuration.predoughPercentage}:
            </span>
            <span>{config.predoughPercentage}</span>
          </div>

          {/* Kneading method */}
          <div className="flex items-start gap-2">
            <Hand className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">
              {t.configuration.kneadingMethod}:
            </span>
            <span>
              {config.kneadingMethod === "By Hand"
                ? language === "de"
                  ? "Von Hand"
                  : "By Hand"
                : language === "de"
                  ? "Mit Maschine"
                  : "With Machine"}
            </span>
          </div>

          {/* Oven type */}
          <div className="flex items-start gap-2">
            <FlameKindling className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">{t.configuration.ovenType}:</span>
            <span>
              {config.ovenType === "Kitchen oven"
                ? language === "de"
                  ? "Backofen"
                  : "Kitchen oven"
                : config.ovenType === "Gasgrill"
                  ? language === "de"
                    ? "Gasgrill mit Deckel"
                    : "Gas grill with lid"
                  : config.ovenType === "Pizza wood oven stone"
                    ? language === "de"
                      ? "Pizzaholzofen aus Stein"
                      : "Pizza wood oven (stone)"
                    : config.ovenType === "Pizza wood oven stainless steel"
                      ? language === "de"
                        ? "Pizzaholzofen aus Edelstahl"
                        : "Pizza wood oven (stainless steel)"
                      : config.ovenType}
            </span>
          </div>

          {/* Max temperature */}
          <div className="flex items-start gap-2">
            <Thermometer className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">
              {t.configuration.maxTemperature}:
            </span>
            <span>
              {isMetric
                ? config.maxTemperature
                : celsiusToFahrenheit(config.maxTemperature)}
            </span>
          </div>

          {/* Pizza surface */}
          <div className="flex items-start gap-2">
            <Layers className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">
              {t.configuration.pizzaSurface}:
            </span>
            <span>
              {config.pizzaSurface === "Pizza stone"
                ? language === "de"
                  ? "Pizzastein"
                  : "Pizza stone"
                : config.pizzaSurface === "Pizza steel"
                  ? language === "de"
                    ? "Pizzastahl"
                    : "Pizza steel"
                  : language === "de"
                    ? "Nicht notwendig"
                    : "Not necessary"}
            </span>
          </div>

          {/* Oven size */}
          <div className="flex items-start gap-2">
            <Ruler className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">{t.configuration.ovenSize}:</span>
            <span>
              {isMetric ? config.ovenSize : ovenSizeToInches(config.ovenSize)}
            </span>
          </div>

          {/* Toppings */}
          {config.toppings.length > 0 && (
            <div className="flex items-start gap-2">
              <Utensils className="h-4 w-4 text-orange-600 flex-shrink-0" />
              <span className="font-semibold">
                {t.configuration.toppings.title}:
              </span>
              <span>
                {config.toppings
                  .map((topping) => {
                    if (language === "de") {
                      switch (topping) {
                        case "Ham":
                          return "Schinken";
                        case "Salami":
                          return "Salami";
                        case "Hot Salami":
                          return "Scharfe Salami";
                        case "Raw Ham":
                          return "Rohschinken";
                        case "Onion":
                          return "Zwiebeln";
                        case "Mushrooms":
                          return "Champignons";
                        case "Pepperoni":
                          return "Peperoni";
                        case "Pineapple":
                          return "Ananas";
                        case "Olives":
                          return "Oliven";
                        case "Artichokes":
                          return "Artischocken";
                        case "Mascarpone":
                          return "Mascarpone";
                        case "Burrata":
                          return "Burrata";
                        case "Garlic":
                          return "Knoblauch";
                        case "Cherry Tomatoes":
                          return "Kirschtomaten";
                        case "Arugula":
                          return "Rucola";
                        default:
                          return topping;
                      }
                    } else {
                      return topping; // English names are already in the correct format
                    }
                  })
                  .join(", ")}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigSummary;
