import { Link } from "react-router";
import { Button } from "./ui/button";

interface SectionHeaderProps {
  title: string;
  description: string;
  linkTo?: string;
  linkText?: string;
}

export function SectionHeader({
  title,
  description,
  linkTo,
  linkText,
}: SectionHeaderProps) {
  return (
    <div>
      <h2 className="text-5xl font-bold leading-tight tracking-tight">
        {title}
      </h2>
      <p className="text-xl font-light text-foreground">{description}</p>
      {linkTo != null && linkText != null && (
        <Button variant="link" asChild className="text-lg p-0">
          <Link to={linkTo}>{linkText} →</Link>
        </Button>
      )}
    </div>
  );
}
