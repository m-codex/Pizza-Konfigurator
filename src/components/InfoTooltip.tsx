import React from "react";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface InfoTooltipProps {
  content: React.ReactNode;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Tooltip open={isOpen} onOpenChange={setIsOpen}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="focus:outline-none p-1"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-xs">
        {content}
      </TooltipContent>
    </Tooltip>
  );
};
