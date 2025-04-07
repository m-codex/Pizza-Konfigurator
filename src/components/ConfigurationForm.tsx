import React from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { DatePicker } from "./ui/date-picker";
import { cn } from "../lib/utils";
import {
  cmToInches,
  celsiusToFahrenheit,
  ovenSizeToInches,
} from "../lib/unitConversions";

interface ConfigurationFormProps {
  onConfigChange?: (config: PizzaConfiguration) => void;
  initialConfig?: PizzaConfiguration;
  isMetric?: boolean;
}

export interface PizzaConfiguration {
  pizzaCount: number;
  pizzaSize: string;
  preparationTime: string;
  hydration: string;
  yeastType: string;
  predoughPercentage: string;
  kneadingMethod: string;
  ovenType: string;
  maxTemperature: string;
  pizzaSurface: string;
  ovenSize: string;
  toppings: string[];
  eatingDate: string;
  eatingTime: string;
}

const ConfigurationForm: React.FC<ConfigurationFormProps> = ({
  onConfigChange = () => {},
  initialConfig,
  isMetric = true,
}) => {
  const defaultConfig: PizzaConfiguration = {
    pizzaCount: 4,
    pizzaSize: "25-28cm (210g Dough ball)",
    preparationTime: "8h before Eating Time",
    hydration: "65%",
    yeastType: "Dry yeast",
    predoughPercentage: "30%",
    kneadingMethod: "By Hand",
    ovenType: "Kitchen oven",
    maxTemperature: "275-300°C",
    pizzaSurface: "Pizza stone",
    ovenSize: "60x60cm",
    toppings: ["Salami", "Mushrooms"],
    eatingDate: new Date().toISOString().split("T")[0],
    eatingTime: "20:00",
  };

  const [config, setConfig] = React.useState<PizzaConfiguration>(
    initialConfig || defaultConfig,
  );

  // Update local state when initialConfig changes
  React.useEffect(() => {
    if (initialConfig) {
      setConfig(initialConfig);
    }
  }, [initialConfig]);

  const handleChange = (field: keyof PizzaConfiguration, value: any) => {
    let newConfig = { ...config, [field]: value };

    // If oven type is changed to a pizza oven, set pizza surface to "Not necessary"
    if (field === "ovenType") {
      const isPizzaOven = value.includes("Pizza oven");
      if (isPizzaOven) {
        newConfig = { ...newConfig, pizzaSurface: "Not necessary" };
      }
    }

    // If preparation time is changed to "Without Predough", set predough percentage to "Kein Vorteig"
    if (field === "preparationTime") {
      if (value === "Without Predough") {
        newConfig = { ...newConfig, predoughPercentage: "Kein Vorteig" };
      } else if (
        config.preparationTime === "Without Predough" &&
        config.predoughPercentage === "Kein Vorteig"
      ) {
        // If changing from "Without Predough" to something else, reset predough percentage to default
        newConfig = { ...newConfig, predoughPercentage: "30%" };
      }
    }

    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  const handleToppingChange = (topping: string, checked: boolean) => {
    let newToppings: string[];
    if (checked) {
      newToppings = [...config.toppings, topping];
    } else {
      newToppings = config.toppings.filter((t) => t !== topping);
    }
    handleChange("toppings", newToppings);
  };

  return (
    <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Pizza Konfigurator
      </h2>

      <div className="space-y-4">
        {/* Pizza Count */}
        <div className="space-y-2">
          <Label htmlFor="pizzaCount" className="font-semibold">
            Anzahl der Pizzen
          </Label>
          <Select
            value={config.pizzaCount.toString()}
            onValueChange={(value) =>
              handleChange("pizzaCount", parseInt(value))
            }
          >
            <SelectTrigger id="pizzaCount" className="w-full">
              <SelectValue placeholder="Wähle die Anzahl" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 31 }, (_, i) => i + 2).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pizza Size */}
        <div className="space-y-2">
          <Label htmlFor="pizzaSize" className="font-semibold">
            Pizzagröße
          </Label>
          <Select
            value={config.pizzaSize}
            onValueChange={(value) => handleChange("pizzaSize", value)}
          >
            <SelectTrigger id="pizzaSize" className="w-full">
              <SelectValue placeholder="Wähle die Größe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20-50cm (180g Dough ball)">
                {isMetric ? "Ø20-50cm" : cmToInches("Ø20-50cm")}
              </SelectItem>
              <SelectItem value="25-28cm (210g Dough ball)">
                {isMetric ? "Ø25-28cm" : cmToInches("Ø25-28cm")}
              </SelectItem>
              <SelectItem value="28-30cm (240g Dough ball)">
                {isMetric ? "Ø28-30cm" : cmToInches("Ø28-30cm")}
              </SelectItem>
              <SelectItem value="30-32cm (280g Dough ball)">
                {isMetric ? "Ø30-32cm" : cmToInches("Ø30-32cm")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Preparation Time */}
        <div className="space-y-2">
          <Label htmlFor="preparationTime" className="font-semibold">
            Vorbereitung
          </Label>
          <Select
            value={config.preparationTime}
            onValueChange={(value) => handleChange("preparationTime", value)}
          >
            <SelectTrigger id="preparationTime" className="w-full">
              <SelectValue placeholder="Wähle die Vorbereitungszeit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Predough a day before">
                Vorteig ein Tag zuvor
              </SelectItem>
              <SelectItem value="8h before Eating Time">
                Vorteig 8 Stunden vor dem Essen
              </SelectItem>
              <SelectItem value="Without Predough">Ohne Vorteig</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Hydration */}
        <div className="space-y-2">
          <Label htmlFor="hydration" className="font-semibold">
            Hydration des Teiges
          </Label>
          <Select
            value={config.hydration}
            onValueChange={(value) => handleChange("hydration", value)}
          >
            <SelectTrigger id="hydration" className="w-full">
              <SelectValue placeholder="Wähle die Hydration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="60%">60%</SelectItem>
              <SelectItem value="65%">65%</SelectItem>
              <SelectItem value="70%">70%</SelectItem>
              <SelectItem value="75%">75%</SelectItem>
              <SelectItem value="80%">80%</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Yeast Type */}
        <div className="space-y-2">
          <Label htmlFor="yeastType" className="font-semibold">
            Hefeart
          </Label>
          <Select
            value={config.yeastType}
            onValueChange={(value) => handleChange("yeastType", value)}
          >
            <SelectTrigger id="yeastType" className="w-full">
              <SelectValue placeholder="Wähle die Hefeart" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Dry yeast">Trockenhefe</SelectItem>
              <SelectItem value="Fresh yeast">Frischhefe</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Predough Percentage */}
        <div className="space-y-2">
          <Label htmlFor="predoughPercentage" className="font-semibold">
            Vorteiganteil
          </Label>
          <Select
            value={config.predoughPercentage}
            onValueChange={(value) => handleChange("predoughPercentage", value)}
            disabled={config.preparationTime === "Without Predough"}
          >
            <SelectTrigger id="predoughPercentage" className="w-full">
              <SelectValue placeholder="Wähle den Vorteiganteil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10%">10%</SelectItem>
              <SelectItem value="20%">20%</SelectItem>
              <SelectItem value="30%">30%</SelectItem>
              <SelectItem value="40%">40%</SelectItem>
              <SelectItem value="50%">50%</SelectItem>
              <SelectItem value="60%">60%</SelectItem>
              {config.preparationTime === "Without Predough" && (
                <SelectItem value="Kein Vorteig">Kein Vorteig</SelectItem>
              )}
            </SelectContent>
          </Select>
          {config.preparationTime === "Without Predough" && (
            <p className="text-sm text-muted-foreground mt-1">
              Bei Zubereitung ohne Vorteig ist kein Vorteiganteil erforderlich
            </p>
          )}
        </div>

        {/* Kneading Method */}
        <div className="space-y-2">
          <Label htmlFor="kneadingMethod" className="font-semibold">
            Knetmethode
          </Label>
          <Select
            value={config.kneadingMethod}
            onValueChange={(value) => handleChange("kneadingMethod", value)}
          >
            <SelectTrigger id="kneadingMethod" className="w-full">
              <SelectValue placeholder="Wähle die Knetmethode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="By Hand">Von Hand</SelectItem>
              <SelectItem value="With Machine">Mit Maschine</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Oven Type */}
        <div className="space-y-2">
          <Label htmlFor="ovenType" className="font-semibold">
            Ofentyp
          </Label>
          <Select
            value={config.ovenType}
            onValueChange={(value) => handleChange("ovenType", value)}
          >
            <SelectTrigger id="ovenType" className="w-full">
              <SelectValue placeholder="Wähle den Ofentyp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Kitchen oven">Backofen</SelectItem>
              <SelectItem value="Grill">Grill</SelectItem>
              <SelectItem value="Pizza oven stainless steel">
                Pizzaofen aus Edelstahl
              </SelectItem>
              <SelectItem value="Pizza oven stone">
                Pizzaofen aus Stein
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Max Temperature */}
        <div className="space-y-2">
          <Label htmlFor="maxTemperature" className="font-semibold">
            Maximale Temperatur
          </Label>
          <Select
            value={config.maxTemperature}
            onValueChange={(value) => handleChange("maxTemperature", value)}
          >
            <SelectTrigger id="maxTemperature" className="w-full">
              <SelectValue placeholder="Wähle die maximale Temperatur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="250-275°C">
                {isMetric ? "250-275°C" : celsiusToFahrenheit("250-275°C")}
              </SelectItem>
              <SelectItem value="275-300°C">
                {isMetric ? "275-300°C" : celsiusToFahrenheit("275-300°C")}
              </SelectItem>
              <SelectItem value="300-350°C">
                {isMetric ? "300-350°C" : celsiusToFahrenheit("300-350°C")}
              </SelectItem>
              <SelectItem value="über 350°C">
                {isMetric ? "über 350°C" : celsiusToFahrenheit("über 350°C")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pizza Surface */}
        <div className="space-y-2">
          <Label htmlFor="pizzaSurface" className="font-semibold">
            Pizzaunterlage
          </Label>
          <Select
            value={config.pizzaSurface}
            onValueChange={(value) => handleChange("pizzaSurface", value)}
            disabled={config.ovenType.includes("Pizza oven")}
          >
            <SelectTrigger id="pizzaSurface" className="w-full">
              <SelectValue placeholder="Wähle die Pizzaunterlage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pizza stone">Pizzastein</SelectItem>
              <SelectItem value="Pizza steel">Pizzastahl</SelectItem>
              <SelectItem value="Not necessary">Nicht notwendig</SelectItem>
            </SelectContent>
          </Select>
          {config.ovenType.includes("Pizza oven") && (
            <p className="text-sm text-muted-foreground mt-1">
              Bei Pizzaöfen ist keine separate Unterlage notwendig
            </p>
          )}
        </div>

        {/* Oven Size */}
        <div className="space-y-2">
          <Label htmlFor="ovenSize" className="font-semibold">
            Ofengröße
          </Label>
          <Select
            value={config.ovenSize}
            onValueChange={(value) => handleChange("ovenSize", value)}
          >
            <SelectTrigger id="ovenSize" className="w-full">
              <SelectValue placeholder="Wähle die Ofengröße" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="40x40cm">
                {isMetric ? "40x40cm" : ovenSizeToInches("40x40cm")}
              </SelectItem>
              <SelectItem value="60x60cm">
                {isMetric ? "60x60cm" : ovenSizeToInches("60x60cm")}
              </SelectItem>
              <SelectItem value="80x80cm">
                {isMetric ? "80x80cm" : ovenSizeToInches("80x80cm")}
              </SelectItem>
              <SelectItem value="100x100cm">
                {isMetric ? "100x100cm" : ovenSizeToInches("100x100cm")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Eating Date and Time */}
        <div className="space-y-2 border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Wann möchtest du essen?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eatingDate" className="font-semibold">
                Datum
              </Label>
              <DatePicker
                date={
                  config.eatingDate ? new Date(config.eatingDate) : undefined
                }
                setDate={(date) => {
                  if (date) {
                    handleChange(
                      "eatingDate",
                      date.toISOString().split("T")[0],
                    );
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eatingTime" className="font-semibold">
                Uhrzeit
              </Label>
              <input
                type="time"
                id="eatingTime"
                value={config.eatingTime}
                onChange={(e) => handleChange("eatingTime", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Toppings */}
        <div className="space-y-2">
          <Label className="font-semibold">Belag</Label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "topping-ham", label: "Schinken", value: "Ham" },
              { id: "topping-salami", label: "Salami", value: "Salami" },
              {
                id: "topping-hotsalami",
                label: "Scharfe Salami",
                value: "Hot Salami",
              },
              { id: "topping-rawham", label: "Rohschinken", value: "Raw Ham" },
              { id: "topping-onion", label: "Zwiebeln", value: "Onion" },
              {
                id: "topping-mushrooms",
                label: "Champignons",
                value: "Mushrooms",
              },
              {
                id: "topping-pepperoni",
                label: "Peperoni",
                value: "Pepperoni",
              },
              { id: "topping-Ananas", label: "Ananas", value: "Pineapple" },
            ].map((topping) => (
              <div key={topping.id} className="flex items-center space-x-2">
                <Checkbox
                  id={topping.id}
                  checked={config.toppings.includes(topping.value)}
                  onCheckedChange={(checked) =>
                    handleToppingChange(topping.value, checked as boolean)
                  }
                />
                <Label
                  htmlFor={topping.id}
                  className={cn(
                    "cursor-pointer",
                    config.toppings.includes(topping.value)
                      ? "font-medium"
                      : "",
                  )}
                >
                  {topping.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationForm;
