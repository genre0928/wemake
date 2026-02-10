interface HeroProps {
  title: string;
  description?: string;
}

export function Hero({ title, description }: HeroProps) {
  return (
    <div className="flex flex-col flex-wrap justify-center items-center rounded-md bg-linear-to-t from-background to-primary/50 py-20">
      <h1 className="text-5xl font-bold mb-4">{title}</h1>
      {description && (
        <p className="text-2xl font-light text-foreground">{description}</p>
      )}
    </div>
  );
}
