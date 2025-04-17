import React, { useState } from "react";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface InfoButtonProps {
  content: React.ReactNode;
  title?: string;
}

export const InfoButton: React.FC<InfoButtonProps> = ({
  content,
  title = "Information",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="focus:outline-none p-1"
        onClick={() => setIsOpen(true)}
        aria-label="Show information"
      >
        <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-sm text-foreground">
            {content}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};
