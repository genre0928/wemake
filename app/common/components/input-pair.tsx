import { Form } from "react-router";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { InputHTMLAttributes } from "react";
import { Textarea } from "./ui/textarea";

interface InputPairProps {
  label: string;
  description: string;
  textArea?: boolean;
}
export default function InputPair({
  label,
  description,
  textArea = false,
  ...rest
}: InputPairProps &
  InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col max-w-2xl gap-2">
      <Label htmlFor={rest.name} className="flex flex-col items-start gap-1">
        <div>{label}</div>
        <small className="text-muted-foreground">{description}</small>
      </Label>
      {textArea ? <Textarea rows={5} {...rest} /> : <Input {...rest} />}
    </div>
  );
}
