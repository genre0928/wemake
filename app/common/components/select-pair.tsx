import { useState } from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SelectPairProps {
  label: string;
  description?: string;
  name: string;
  required?: boolean;
  placeholder: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
}
export default function SelectPair({
  label,
  description,
  name,
  required,
  placeholder,
  options,
  defaultValue,
}: SelectPairProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-2 flex flex-col">
      <Label
        className="flex flex-col gap-1 items-start"
        onClick={() => setOpen(true)}
      >
        <div>{label}</div>
        <small className="text-muted-foreground">{description}</small>
      </Label>
      <Select
        open={open}
        onOpenChange={setOpen}
        name={name}
        required={required}
        defaultValue={defaultValue}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
