import { Form } from "react-router";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { InputHTMLAttributes } from "react";
import { Textarea } from "./ui/textarea";

interface InputPairProps {
  label?: string;
  description?: string;
  textArea?: boolean;
  /** Textarea일 때만 사용. 기본 3줄, 전달 시 해당 값 사용 */
  rows?: number;
}
export default function InputPair({
  label,
  description,
  textArea = false,
  rows,
  ...rest
}: InputPairProps &
  InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col max-w-2xl gap-3">
      {(label || description) && (
        <Label htmlFor={rest.name} className="flex flex-col items-start gap-1">
          {label && <div>{label}</div>}
          {description && (
            <small className="text-muted-foreground">{description}</small>
          )}
        </Label>
      )}
      {textArea ? <Textarea {...rest} /> : <Input {...rest} />}
    </div>
  );
}
