import React from "react";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { cn } from "../lib/utils";

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
}

const RecipeDisplay = ({
  recipe = {
    title: "Pizza Rezept",
    preDoughSteps: [
      "1120g Vorteig (Poolish) herstellen",
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
}: RecipeDisplayProps) => {
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
            <div className="bg-green-50 p-4 rounded-md border border-green-100">
              <ol className="space-y-3 list-decimal list-inside">
                {recipe.preDoughSteps.map((step, index) => (
                  <li key={index} className="text-gray-700">
                    <span className="ml-2">{step}</span>
                  </li>
                ))}
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
            <div className="p-4 bg-blue-50 rounded-md border border-gray-100">
              <ol className="space-y-3 list-decimal list-inside">
                {recipe.mainDoughSteps.map((step, index) => (
                  <li key={index} className="text-gray-700">
                    <span className="ml-2">{step}</span>
                  </li>
                ))}
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
          <div className="bg-orange-50 p-4 rounded-md border border-orange-100">
            <ol className="space-y-3 list-decimal list-inside">
              {recipe.bakingInstructions
                ?.split("\n")
                .map((instruction, index) => (
                  <li key={index} className="text-gray-700">
                    <span className="ml-2">{instruction}</span>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecipeDisplay;
