import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { cn } from "../lib/utils";
import { Check } from "lucide-react";
import { convertMeasurementsInText } from "../lib/unitConversions";

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
}

const RecipeDisplay = ({
  recipe = {
    title: "Pizza Rezept",
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
      "Gekneteter Teig auf Arbeitsplate zu einer Kugel formen und mit Olivenöl mit den Händen auftupfen",
      "Dann mit einer Schüssel zudecken für 15min stehen lassen",
      "Dann Teig ca. 10mal anheben und auf den Tisch zurück legen sodass er gefaltet wird. Dabei den Teig immer um 90° drehen.",
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
}: RecipeDisplayProps) => {
  // State to track checked steps for each section
  const [preDoughCheckedSteps, setPreDoughCheckedSteps] = useState<number[]>(
    [],
  );
  const [mainDoughCheckedSteps, setMainDoughCheckedSteps] = useState<number[]>(
    [],
  );
  const [bakingCheckedSteps, setBakingCheckedSteps] = useState<number[]>([]);

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

  return (
    <Card className={cn("bg-white p-3 sm:p-6 shadow-md", className)}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{recipe.title}</h2>
        </div>

        <Separator />

        {recipe.preDoughSteps && recipe.preDoughSteps.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Vorteig Zubereitung
              {recipe.preDoughDate && (
                <span className="flex text-sm font-normal text-gray-500">
                  {isDayBeforePreparation && (
                    <span className="text-amber-600 font-semibold mr-1">
                      Ein Tag vorher:{" "}
                    </span>
                  )}
                  {recipe.preDoughDate}
                </span>
              )}
            </h3>
            <div className="bg-green-50 px-2 py-4 md:p-4 rounded-md border border-green-100">
              <ol className="space-y-3 list-none">
                {recipe.preDoughSteps.map((step, index) => {
                  const isChecked = preDoughCheckedSteps.includes(index);
                  const isNextAvailable = isNextStep(
                    index,
                    preDoughCheckedSteps,
                    recipe.preDoughSteps?.length || 0,
                  );

                  return (
                    <li
                      key={index}
                      className={cn(
                        "flex items-start gap-2",
                        isChecked ? "text-gray-400" : "text-gray-700",
                        isNextAvailable && !isChecked ? "font-semibold" : "",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border mt-0.5 cursor-pointer",
                          isChecked
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300",
                          isNextAvailable && !isChecked
                            ? "border-green-500"
                            : "",
                        )}
                        onClick={() =>
                          handleToggleStep(
                            index,
                            preDoughCheckedSteps,
                            setPreDoughCheckedSteps,
                            recipe.preDoughSteps?.length || 0,
                          )
                        }
                      >
                        {isChecked && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className={cn("ml-1")}>
                        {index + 1}.{" "}
                        {isMetric
                          ? step
                          : convertMeasurementsInText(step, isMetric)}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        )}

        {recipe.mainDoughSteps && recipe.mainDoughSteps.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Hauptteig Zubereitung
              {recipe.mainDoughDate && (
                <span className="flex text-sm font-normal text-gray-500">
                  {isDayBeforePreparation && (
                    <span className="text-amber-600 font-semibold mr-1">
                      Ein Tag später:{" "}
                    </span>
                  )}
                  {recipe.mainDoughDate}
                </span>
              )}
            </h3>
            <div className="px-2 py-4 md:p-4 bg-blue-50 rounded-md border border-gray-100">
              <ol className="space-y-3 list-none">
                {recipe.mainDoughSteps.map((step, index) => {
                  const isChecked = mainDoughCheckedSteps.includes(index);
                  const isNextAvailable = isNextStep(
                    index,
                    mainDoughCheckedSteps,
                    recipe.mainDoughSteps?.length || 0,
                  );

                  return (
                    <li
                      key={index}
                      className={cn(
                        "flex items-start gap-2",
                        isChecked ? "text-gray-400" : "text-gray-700",
                        isNextAvailable && !isChecked ? "font-semibold" : "",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border mt-0.5 cursor-pointer",
                          isChecked
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-300",
                          isNextAvailable && !isChecked
                            ? "border-blue-500"
                            : "",
                        )}
                        onClick={() =>
                          handleToggleStep(
                            index,
                            mainDoughCheckedSteps,
                            setMainDoughCheckedSteps,
                            recipe.mainDoughSteps?.length || 0,
                          )
                        }
                      >
                        {isChecked && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className={cn("ml-1")}>
                        {index + 1}.{" "}
                        {isMetric
                          ? step
                          : convertMeasurementsInText(step, isMetric)}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Backanleitung
            {recipe.bakingDate && (
              <span className="flex text-sm font-normal text-gray-500">
                {recipe.bakingDate}
              </span>
            )}
          </h3>
          <div className="bg-orange-50 px-2 py-4 md:p-4 rounded-md border border-orange-100">
            <ol className="space-y-3 list-none">
              {recipe.bakingInstructions
                ?.split("\n")
                .map((instruction, index) => {
                  const isChecked = bakingCheckedSteps.includes(index);
                  const isNextAvailable = isNextStep(
                    index,
                    bakingCheckedSteps,
                    recipe.bakingInstructions?.split("\n").length || 0,
                  );

                  return (
                    <li
                      key={index}
                      className={cn(
                        "flex items-start gap-2",
                        isChecked ? "text-gray-400" : "text-gray-700",
                        isNextAvailable && !isChecked ? "font-semibold" : "",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border mt-0.5 cursor-pointer",
                          isChecked
                            ? "bg-orange-500 border-orange-500"
                            : "border-gray-300",
                          isNextAvailable && !isChecked
                            ? "border-orange-500"
                            : "",
                        )}
                        onClick={() =>
                          handleToggleStep(
                            index,
                            bakingCheckedSteps,
                            setBakingCheckedSteps,
                            recipe.bakingInstructions?.split("\n").length || 0,
                          )
                        }
                      >
                        {isChecked && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className={cn("ml-1")}>
                        {index + 1}.{" "}
                        {isMetric
                          ? instruction
                          : convertMeasurementsInText(instruction, isMetric)}
                      </span>
                    </li>
                  );
                })}
            </ol>
          </div>
        </div>

        {/* Save and Share Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mt-8">
          <button
            onClick={() => console.log("Save clicked")}
            className="w-full sm:w-auto flex items-center gap-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-save"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Rezept speichern
          </button>

          <button
            onClick={() => console.log("Share clicked")}
            className="w-full sm:w-auto flex items-center gap-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-share-2"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Rezept teilen
          </button>
        </div>
      </div>
    </Card>
  );
};

export default RecipeDisplay;
