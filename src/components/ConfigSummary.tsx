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

interface ConfigSummaryProps {
  config: PizzaConfiguration;
  onEditClick: () => void;
  isMetric?: boolean;
}

const ConfigSummary: React.FC<ConfigSummaryProps> = ({
  config,
  onEditClick,
  isMetric = true,
}) => {
  // Helper function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Translate preparation time to German
  const translatePreparationTime = (prepTime: string) => {
    switch (prepTime) {
      case "Predough a day before":
        return "Vorteig am Tag zuvor";
      case "8h before Eating Time":
        return "8 Stunden vor dem Essen";
      case "Without Predough":
        return "Ohne Vorteig";
      default:
        return prepTime;
    }
  };

  // Translate pizza size to German
  const translatePizzaSize = (size: string) => {
    // Extract the diameter and dough ball weight
    const parts = size.split(" ");
    if (parts.length >= 3) {
      return `${parts[0]} (${parts[2].replace("Dough", "Teig")})`;
    }
    return size;
  };

  return (
    <Card className="bg-white shadow-sm mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Deine Konfiguration</h3>
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
            <span className="font-semibold">Pizzen:</span>
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
            <span className="font-semibold">Datum:</span>
            <span>
              {formatDate(config.eatingDate)}, {config.eatingTime} Uhr
            </span>
          </div>

          {/* Preparation time */}
          <div className="flex items-start gap-2">
            <Timer className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">Vorbereitung:</span>
            <span>{translatePreparationTime(config.preparationTime)}</span>
          </div>

          {/* Hydration */}
          <div className="flex items-start gap-2">
            <Droplet className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">Hydration:</span>
            <span>{config.hydration}</span>
          </div>

          {/* Yeast type */}
          <div className="flex items-start gap-2">
            <Wheat className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">Hefe:</span>
            <span>
              {config.yeastType === "Dry yeast" ? "Trockenhefe" : "Frischhefe"}
            </span>
          </div>

          {/* Predough percentage */}
          <div className="flex items-start gap-2">
            <Percent className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">Vorteiganteil:</span>
            <span>{config.predoughPercentage}</span>
          </div>

          {/* Kneading method */}
          <div className="flex items-start gap-2">
            <Hand className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">Knetmethode:</span>
            <span>
              {config.kneadingMethod === "By Hand"
                ? "Von Hand"
                : "Mit Maschine"}
            </span>
          </div>

          {/* Oven type */}
          <div className="flex items-start gap-2">
            <FlameKindling className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">Ofentyp:</span>
            <span>
              {config.ovenType === "Kitchen oven"
                ? "Backofen"
                : config.ovenType === "Grill"
                  ? "Grill"
                  : config.ovenType === "Pizza oven stone"
                    ? "Pizzaofen (Stein)"
                    : "Pizzaofen (Edelstahl)"}
            </span>
          </div>

          {/* Max temperature */}
          <div className="flex items-start gap-2">
            <Thermometer className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">Max. Temperatur:</span>
            <span>
              {isMetric
                ? config.maxTemperature
                : celsiusToFahrenheit(config.maxTemperature)}
            </span>
          </div>

          {/* Pizza surface */}
          <div className="flex items-start gap-2">
            <Layers className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">Pizzaunterlage:</span>
            <span>
              {config.pizzaSurface === "Pizza stone"
                ? "Pizzastein"
                : config.pizzaSurface === "Pizza steel"
                  ? "Pizzastahl"
                  : "Nicht notwendig"}
            </span>
          </div>

          {/* Oven size */}
          <div className="flex items-start gap-2">
            <Ruler className="h-4 w-4 text-orange-600 flex-shrink-0" />
            <span className="font-semibold">Ofengröße:</span>
            <span>
              {isMetric ? config.ovenSize : ovenSizeToInches(config.ovenSize)}
            </span>
          </div>

          {/* Toppings */}
          {config.toppings.length > 0 && (
            <div className="flex items-start gap-2">
              <Utensils className="h-4 w-4 text-orange-600 flex-shrink-0" />
              <span className="font-semibold">Belag:</span>
              <span>
                {config.toppings
                  .map((topping) => {
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
                      default:
                        return topping;
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
