// as const 선언을 통해 각 타입의 값을 엄격하게 관리할 수 있음
export const JOB_TYPES = [
  { label: "전체", value: "all" },
  { label: "원격근무", value: "remote" },
  { label: "정규직", value: "full-time" },
  { label: "프리랜서", value: "freelance" },
  { label: "인턴십", value: "internship" },
] as const;

export const LOCATION_TYPES = [
  { label: "전국", value: "all" },
  { label: "서울", value: "seoul" },
  { label: "경기", value: "gyeonggi" },
  { label: "인천", value: "incheon" },
  { label: "강원", value: "gangwon" },
  { label: "충청", value: "chungcheong" },
  { label: "전라", value: "jeolla" },
  { label: "경상", value: "gyeongsang" },
  { label: "제주", value: "jeju" },
] as const;

export const JOB_SALARY_TYPES = [
  { label: "전체", value: "all" },
  { label: "1,000만원 이하", value: "1000" },
  { label: "1,000만원 ~ 2,000만원", value: "1000-2000" },
  { label: "2,000만원 ~ 3,000만원", value: "2000-3000" },
  { label: "3,000만원 ~ 4,000만원", value: "3000-4000" },
  { label: "4,000만원 ~ 5,000만원", value: "4000-5000" },
  { label: "5,000만원 ~ 6,000만원", value: "5000-6000" },
  { label: "6,000만원 ~ 7,000만원", value: "6000-7000" },
  { label: "7,000만원 ~ 8,000만원", value: "7000-8000" },
  { label: "8,000만원 ~ 9,000만원", value: "8000-9000" },
  { label: "9,000만원 이상", value: "9000" },
] as const;
