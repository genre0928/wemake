import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";

export interface JobCardProps {
  jobId: string;
  companyName: string;
  companyLogoUrl?: string;
  timeAgo: string;
  title: string;
  tags: string[];
  salary: [number, number];
  location: string;
}

export function JobCard({
  jobId,
  companyName,
  companyLogoUrl = "https://github.com/facebook.png",
  timeAgo,
  title,
  tags,
  salary: [minSalary, maxSalary],
  location,
}: JobCardProps) {
  const salaryLabel = `${minSalary.toLocaleString()}만원 ~ ${maxSalary.toLocaleString()}만원`;
  return (
    <Link to={`/jobs/${jobId}`}>
      <Card className="bg-transparent hover:bg-primary/10 transition-colors duration-200 ease-in-out">
        <CardHeader>
          <div className="flex items-center gap-4 mb-8">
            <img
              src={companyLogoUrl}
              alt="회사 로고"
              className="size-10 rounded-full"
            />
            <div className="space-x-2">
              <span className="text-accent-foreground">{companyName}</span>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
            {title}
          </CardTitle>
          <CardContent className="p-0">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </CardContent>
          <CardFooter className="p-0 flex justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground">
                {salaryLabel}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {location}
              </span>
            </div>
            <Button>지원하기</Button>
          </CardFooter>
        </CardHeader>
      </Card>
    </Link>
  );
}
