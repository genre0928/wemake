import { Link } from "react-router";
import { Button } from "./ui/button";

interface SectionHeaderProps {
  title: string;
  description: string;
  linkTo?: string;
}

export function SectionHeader({
  title,
  description,
  linkTo,
}: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-4xl font-bold leading-tight tracking-tight">
        {title}
      </h2>
      <p className="text-md font-light text-foreground">{description}</p>
      {linkTo != null && (
        <Button variant="link" asChild className="text-lg pl-0">
          <Link to={linkTo}>더 보기 →</Link>
        </Button>
      )}
    </div>
  );
}
