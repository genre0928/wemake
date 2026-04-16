export const COMMUNITY_POST_CATEGORIES = [
  { label: "AI Tools", value: "ai-tools" },
  { label: "Programming", value: "programming" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Business", value: "business" },
] as const;

export const SORT_OPTIONS = [
  { label: "최신 순", value: "newest" },
  { label: "인기 순", value: "popular" },
] as const;

export const PERIOD_OPTIONS = [
  { label: "일간", value: "daily" },
  { label: "주간", value: "weekly" },
  { label: "월간", value: "monthly" },
  { label: "연간", value: "yearly" },
  { label: "전체", value: "all" },
] as const;
