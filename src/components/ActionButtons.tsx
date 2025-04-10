import React from "react";
import { Button } from "./ui/button";
import { Share2, Save, FileText } from "lucide-react";
import { getTranslation, Language } from "../lib/i18n";

interface ActionButtonsProps {
  onGenerateRecipe?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  isGenerating?: boolean;
  isRecipeGenerated?: boolean;
  language?: Language;
}

const ActionButtons = ({
  onGenerateRecipe = () => console.log("Generate recipe clicked"),
  onSave = () => console.log("Save clicked"),
  onShare = () => console.log("Share clicked"),
  isGenerating = false,
  isRecipeGenerated = false,
  language = "de",
}: ActionButtonsProps) => {
  const t = getTranslation(language);
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
      <Button
        onClick={onGenerateRecipe}
        disabled={isGenerating}
        className="w-full sm:w-auto flex items-center gap-2"
        size="lg"
      >
        <FileText className="h-5 w-5" />
        {isGenerating
          ? t.actionButtons.generating
          : t.actionButtons.generateRecipe}
      </Button>

      {isRecipeGenerated && (
        <>
          <Button
            onClick={onSave}
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2"
            size="lg"
          >
            <Save className="h-5 w-5" />
            {t.actionButtons.saveRecipe}
          </Button>

          <Button
            onClick={onShare}
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2"
            size="lg"
          >
            <Share2 className="h-5 w-5" />
            {t.actionButtons.shareRecipe}
          </Button>
        </>
      )}
    </div>
  );
};

export default ActionButtons;
