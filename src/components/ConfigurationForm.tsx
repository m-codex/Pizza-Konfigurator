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
import { Loader2, FileText, Info } from "lucide-react";

import { InfoButton } from "./InfoButton";
import {
  cmToInches,
  celsiusToFahrenheit,
  ovenSizeToInches,
} from "../lib/unitConversions";
import { getTranslation, Language } from "../lib/i18n";

interface ConfigurationFormProps {
  onConfigChange?: (config: PizzaConfiguration) => void;
  onGenerateRecipe?: () => void;
  initialConfig?: PizzaConfiguration;
  isMetric?: boolean;
  isGenerating?: boolean;
  language?: Language;
  isPastStartTime?: boolean;
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
  onGenerateRecipe = () => {},
  initialConfig,
  isMetric = true,
  isGenerating = false,
  language = "de",
  isPastStartTime = false,
}) => {
  const t = getTranslation(language);
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

  // Set locale for date picker based on language
  React.useEffect(() => {
    // This will affect how the date picker displays dates
    if (language === "en") {
      document.documentElement.lang = "en-US";
    } else {
      document.documentElement.lang = "de-DE";
    }
  }, [language]);

  // Update local state when initialConfig changes
  React.useEffect(() => {
    if (initialConfig) {
      setConfig(initialConfig);
    }
  }, [initialConfig]);

  // Convert 24-hour format to 12-hour format with AM/PM
  const getHour12Format = () => {
    const [hours, minutes] = config.eatingTime.split(":");
    const hour = parseInt(hours, 10);
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const period = hour >= 12 ? "PM" : "AM";
    return {
      hour: hour12.toString(),
      minute: minutes,
      period,
    };
  };

  // Convert 12-hour format with AM/PM to 24-hour format
  const handleTimeChange = (hour: string, minute: string, period: string) => {
    const hour12 = parseInt(hour, 10);
    let hour24 =
      period === "AM"
        ? hour12 === 12
          ? 0
          : hour12
        : hour12 === 12
          ? 12
          : hour12 + 12;
    const time24 = `${hour24.toString().padStart(2, "0")}:${minute}`;
    handleChange("eatingTime", time24);
  };

  const handleChange = (field: keyof PizzaConfiguration, value: any) => {
    let newConfig = { ...config, [field]: value };

    // If oven type is changed to a pizza oven, set pizza surface to "Not necessary"
    if (field === "ovenType") {
      const isPizzaOven = value.includes("Pizza wood oven");
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
    <>
      <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t.configuration.title}
        </h2>

        <div className="space-y-4">
          {/* Pizza Count */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="pizzaCount" className="font-semibold">
                {t.configuration.pizzaCount}
              </Label>
              <InfoButton content={t.configuration.tooltips.pizzaCount} />
            </div>
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
            <div className="flex items-center gap-1">
              <Label htmlFor="pizzaSize" className="font-semibold">
                {t.configuration.pizzaSize}
              </Label>
              <InfoButton content={t.configuration.tooltips.pizzaSize} />
            </div>
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
            <div className="flex items-center gap-1">
              <Label htmlFor="preparationTime" className="font-semibold">
                {t.configuration.preparation}
              </Label>
              <InfoButton content={t.configuration.tooltips.preparation} />
            </div>
            <Select
              value={config.preparationTime}
              onValueChange={(value) => handleChange("preparationTime", value)}
            >
              <SelectTrigger id="preparationTime" className="w-full">
                <SelectValue placeholder="Wähle die Vorbereitungszeit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Predough a day before">
                  {language === "de"
                    ? t.configuration.selectOptions.preparationTime.dayBefore
                    : t.configuration.selectOptions.preparationTime.dayBefore}
                </SelectItem>
                <SelectItem value="8h before Eating Time">
                  {language === "de"
                    ? t.configuration.selectOptions.preparationTime.eightHours
                    : t.configuration.selectOptions.preparationTime.eightHours}
                </SelectItem>
                <SelectItem value="Without Predough">
                  {language === "de"
                    ? t.configuration.selectOptions.preparationTime
                        .withoutPredough
                    : t.configuration.selectOptions.preparationTime
                        .withoutPredough}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hydration */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="hydration" className="font-semibold">
                {t.configuration.hydration}
              </Label>
              <InfoButton content={t.configuration.tooltips.hydration} />
            </div>
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
            <div className="flex items-center gap-1">
              <Label htmlFor="yeastType" className="font-semibold">
                {t.configuration.yeastType}
              </Label>
              <InfoButton content={t.configuration.tooltips.yeastType} />
            </div>
            <Select
              value={config.yeastType}
              onValueChange={(value) => handleChange("yeastType", value)}
            >
              <SelectTrigger id="yeastType" className="w-full">
                <SelectValue placeholder="Wähle die Hefeart" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dry yeast">
                  {language === "de"
                    ? t.configuration.selectOptions.yeastType.dry
                    : t.configuration.selectOptions.yeastType.dry}
                </SelectItem>
                <SelectItem value="Fresh yeast">
                  {language === "de"
                    ? t.configuration.selectOptions.yeastType.fresh
                    : t.configuration.selectOptions.yeastType.fresh}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Predough Percentage */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="predoughPercentage" className="font-semibold">
                {t.configuration.predoughPercentage}
              </Label>
              <InfoButton
                content={t.configuration.tooltips.predoughPercentage}
              />
            </div>
            <Select
              value={config.predoughPercentage}
              onValueChange={(value) =>
                handleChange("predoughPercentage", value)
              }
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
                {t.configuration.predoughInfo}
              </p>
            )}
          </div>

          {/* Kneading Method */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="kneadingMethod" className="font-semibold">
                {t.configuration.kneadingMethod}
              </Label>
              <InfoButton content={t.configuration.tooltips.kneadingMethod} />
            </div>
            <Select
              value={config.kneadingMethod}
              onValueChange={(value) => handleChange("kneadingMethod", value)}
            >
              <SelectTrigger id="kneadingMethod" className="w-full">
                <SelectValue placeholder="Wähle die Knetmethode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="By Hand">
                  {language === "de"
                    ? t.configuration.selectOptions.kneadingMethod.byHand
                    : t.configuration.selectOptions.kneadingMethod.byHand}
                </SelectItem>
                <SelectItem value="With Machine">
                  {language === "de"
                    ? t.configuration.selectOptions.kneadingMethod.withMachine
                    : t.configuration.selectOptions.kneadingMethod.withMachine}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Oven Type */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="ovenType" className="font-semibold">
                {t.configuration.ovenType}
              </Label>
              <InfoButton content={t.configuration.tooltips.ovenType} />
            </div>
            <Select
              value={config.ovenType}
              onValueChange={(value) => handleChange("ovenType", value)}
            >
              <SelectTrigger id="ovenType" className="w-full">
                <SelectValue placeholder="Wähle den Ofentyp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kitchen oven">
                  {language === "de"
                    ? t.configuration.selectOptions.ovenType.kitchen
                    : t.configuration.selectOptions.ovenType.kitchen}
                </SelectItem>
                <SelectItem value="Gasgrill">
                  {language === "de"
                    ? t.configuration.selectOptions.ovenType.gasGrill
                    : t.configuration.selectOptions.ovenType.gasGrill}
                </SelectItem>
                <SelectItem value="Pizza wood oven stainless steel">
                  {language === "de"
                    ? t.configuration.selectOptions.ovenType.woodStainless
                    : t.configuration.selectOptions.ovenType.woodStainless}
                </SelectItem>
                <SelectItem value="Pizza wood oven stone">
                  {language === "de"
                    ? t.configuration.selectOptions.ovenType.woodStone
                    : t.configuration.selectOptions.ovenType.woodStone}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Max Temperature */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="maxTemperature" className="font-semibold">
                {t.configuration.maxTemperature}
              </Label>
              <InfoButton content={t.configuration.tooltips.maxTemperature} />
            </div>
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
                <SelectItem value="> 350°C">
                  {isMetric ? "> 350°C" : celsiusToFahrenheit("> 350°C")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pizza Surface */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="pizzaSurface" className="font-semibold">
                {t.configuration.pizzaSurface}
              </Label>
              <InfoButton content={t.configuration.tooltips.pizzaSurface} />
            </div>
            <Select
              value={config.pizzaSurface}
              onValueChange={(value) => handleChange("pizzaSurface", value)}
              disabled={config.ovenType.includes("Pizza wood oven")}
            >
              <SelectTrigger id="pizzaSurface" className="w-full">
                <SelectValue placeholder="Wähle die Pizzaunterlage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pizza stone">
                  {language === "de"
                    ? t.configuration.selectOptions.pizzaSurface.stone
                    : t.configuration.selectOptions.pizzaSurface.stone}
                </SelectItem>
                <SelectItem value="Pizza steel">
                  {language === "de"
                    ? t.configuration.selectOptions.pizzaSurface.steel
                    : t.configuration.selectOptions.pizzaSurface.steel}
                </SelectItem>
                <SelectItem value="Not necessary">
                  {language === "de"
                    ? t.configuration.selectOptions.pizzaSurface.none
                    : t.configuration.selectOptions.pizzaSurface.none}
                </SelectItem>
              </SelectContent>
            </Select>
            {config.ovenType.includes("Pizza wood oven") && (
              <p className="text-sm text-muted-foreground mt-1">
                {t.configuration.pizzaSurfaceInfo}
              </p>
            )}
          </div>

          {/* Oven Size */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="ovenSize" className="font-semibold">
                {t.configuration.ovenSize}
              </Label>
              <InfoButton content={t.configuration.tooltips.ovenSize} />
            </div>
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
            <div className="flex items-center gap-1 mb-2">
              <h3 className="text-lg font-semibold">
                {t.configuration.eatingTime.title}
              </h3>
              <InfoButton content={t.configuration.tooltips.eatingTime} />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="eatingDate" className="font-semibold">
                  {t.configuration.eatingTime.date}
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
                  locale={language === "en" ? "en-US" : "de-DE"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eatingTime" className="font-semibold">
                  {t.configuration.eatingTime.time}
                </Label>
                {language === "de" ? (
                  <input
                    type="time"
                    id="eatingTime"
                    value={config.eatingTime}
                    onChange={(e) => handleChange("eatingTime", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                ) : (
                  <div className="flex gap-1">
                    <div className="flex-1">
                      <Select
                        value={getHour12Format().hour}
                        onValueChange={(value) =>
                          handleTimeChange(
                            value,
                            getHour12Format().minute,
                            getHour12Format().period,
                          )
                        }
                      >
                        <SelectTrigger id="hour" className="w-full pr-1">
                          <SelectValue placeholder="Hour" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (hour) => (
                              <SelectItem key={hour} value={hour.toString()}>
                                {hour}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Select
                        value={getHour12Format().minute}
                        onValueChange={(value) =>
                          handleTimeChange(
                            getHour12Format().hour,
                            value,
                            getHour12Format().period,
                          )
                        }
                      >
                        <SelectTrigger id="minute" className="w-full pr-1">
                          <SelectValue placeholder="Min" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i * 5).map(
                            (minute) => (
                              <SelectItem
                                key={minute}
                                value={minute.toString().padStart(2, "0")}
                              >
                                {minute.toString().padStart(2, "0")}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-20">
                      <Select
                        value={getHour12Format().period}
                        onValueChange={(value) =>
                          handleTimeChange(
                            getHour12Format().hour,
                            getHour12Format().minute,
                            value,
                          )
                        }
                      >
                        <SelectTrigger id="period" className="w-full pr-1">
                          <SelectValue placeholder="AM/PM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AM">AM</SelectItem>
                          <SelectItem value="PM">PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Toppings */}
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <Label className="font-semibold text-lg">
                {t.configuration.toppings.title}
              </Label>
              <InfoButton content={t.configuration.tooltips.toppings} />
            </div>

            {/* Meats */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 border-b pb-1">
                {t.configuration.toppings.categories.meat}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    id: "topping-ham",
                    label: t.configuration.toppings.items["Ham"],
                    value: "Ham",
                  },
                  {
                    id: "topping-salami",
                    label: t.configuration.toppings.items["Salami"],
                    value: "Salami",
                  },
                  {
                    id: "topping-hotsalami",
                    label: t.configuration.toppings.items["Hot Salami"],
                    value: "Hot Salami",
                  },
                  {
                    id: "topping-rawham",
                    label: t.configuration.toppings.items["Raw Ham"],
                    value: "Raw Ham",
                  },
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

            {/* Vegetables */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 border-b pb-1">
                {t.configuration.toppings.categories.vegetables}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    id: "topping-onion",
                    label: t.configuration.toppings.items["Onion"],
                    value: "Onion",
                  },
                  {
                    id: "topping-mushrooms",
                    label: t.configuration.toppings.items["Mushrooms"],
                    value: "Mushrooms",
                  },
                  {
                    id: "topping-pepperoni",
                    label: t.configuration.toppings.items["Pepperoni"],
                    value: "Pepperoni",
                  },
                  {
                    id: "topping-olives",
                    label: t.configuration.toppings.items["Olives"],
                    value: "Olives",
                  },
                  {
                    id: "topping-artichokes",
                    label: t.configuration.toppings.items["Artichokes"],
                    value: "Artichokes",
                  },
                  {
                    id: "topping-garlic",
                    label: t.configuration.toppings.items["Garlic"],
                    value: "Garlic",
                  },
                  {
                    id: "topping-cherry-tomatoes",
                    label: t.configuration.toppings.items["Cherry Tomatoes"],
                    value: "Cherry Tomatoes",
                  },
                  {
                    id: "topping-arugula",
                    label: t.configuration.toppings.items["Arugula"],
                    value: "Arugula",
                  },
                  {
                    id: "topping-pineapple",
                    label: t.configuration.toppings.items["Pineapple"],
                    value: "Pineapple",
                  },
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

            {/* Cheeses */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 border-b pb-1">
                {t.configuration.toppings.categories.cheese}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    id: "topping-mascarpone",
                    label: t.configuration.toppings.items["Mascarpone"],
                    value: "Mascarpone",
                  },
                  {
                    id: "topping-burrata",
                    label: t.configuration.toppings.items["Burrata"],
                    value: "Burrata",
                  },
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

        {isPastStartTime && (
          <div className="text-center mb-4">
            <p className="text-red-600 font-medium">
              {t.configuration.pastStartTimeWarning}
            </p>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={onGenerateRecipe}
            className="w-full bg-orange-600 text-white hover:bg-orange-600/90 h-12 rounded-md px-4 py-2 flex items-center justify-center gap-2 font-medium"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-gray-200">
                  {t.configuration.generateButton.generating}
                </span>
              </>
            ) : (
              <>
                <FileText className="h-5 w-5" />
                <span>{t.configuration.generateButton.default}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfigurationForm;
