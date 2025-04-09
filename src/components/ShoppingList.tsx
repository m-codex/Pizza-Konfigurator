import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { Check, ShoppingBasket, CircleCheck, EyeOff, Eye } from "lucide-react";
import { cn } from "../lib/utils";
import { convertAmount, cmToInches } from "../lib/unitConversions";

interface ShoppingListItem {
  name: string;
  amount: string;
  checked: boolean;
}

interface ShoppingListProps {
  items?: ShoppingListItem[];
  title?: string;
  onToggleItem?: (index: number) => void;
  pizzaCount?: number;
  pizzaSize?: string;
  isMetric?: boolean;
}

const ShoppingList = ({
  items = [
    { name: "Mehl (Tipo 00)", amount: "2kg", checked: false },
    { name: "Trockenhefe", amount: "10g", checked: false },
    { name: "Frischhefe", amount: "20g", checked: true },
    { name: "Salz", amount: "40g", checked: false },
    { name: "Olivenöl", amount: "50ml", checked: false },
    { name: "Honig", amount: "10g", checked: false },
    { name: "Tomatensoße", amount: "500ml", checked: false },
    { name: "Mozzarella", amount: "500g", checked: false },
    { name: "Basilikum", amount: "1 Bund", checked: false },
  ],
  title,
  onToggleItem = () => {},
  pizzaCount = 8,
  pizzaSize = "Ø30-32cm",
  isMetric = true,
}: ShoppingListProps) => {
  const [hideCheckedItems, setHideCheckedItems] = useState(false);

  // Generate dynamic title if not provided
  const displayTitle =
    title ||
    `Einkaufsliste für ${pizzaCount} Pizzen mit ${isMetric ? pizzaSize : cmToInches(pizzaSize)}`;

  // Filter items based on the hideCheckedItems state
  const displayedItems = hideCheckedItems
    ? items.filter((item) => !item.checked)
    : items;

  // Count checked items for the button text
  const checkedItemsCount = items.filter((item) => item.checked).length;

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-3 px-3 sm:px-6">
        <CardTitle className="text-2xl font-bold text-gray-800">
          {displayTitle}
          <Button
            variant="outline"
            size="sm"
            className="mt-2 ml-auto flex items-center gap-2"
            onClick={() => setHideCheckedItems(!hideCheckedItems)}
          >
            {hideCheckedItems ? (
              <>
                <CircleCheck className="h-4 w-4" />
                Einblenden ({checkedItemsCount})
              </>
            ) : (
              <>
                <CircleCheck className="h-4 w-4" />
                Ausblenden ({checkedItemsCount})
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="space-y-1">
          {displayedItems.map((item, index) => {
            // Find the original index in the items array
            const originalIndex = items.findIndex(
              (i) => i.name === item.name && i.amount === item.amount,
            );
            return (
              <div key={originalIndex}>
                <div
                  className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-md px-2"
                  onClick={() => onToggleItem(originalIndex)}
                >
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border mr-3",
                        item.checked
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300",
                      )}
                    >
                      {item.checked && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        item.checked ? "text-gray-400" : "text-gray-700",
                      )}
                    >
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {convertAmount(item.amount, isMetric)}
                  </span>
                </div>
                {index < displayedItems.length - 1 && (
                  <Separator className="my-1" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShoppingList;
