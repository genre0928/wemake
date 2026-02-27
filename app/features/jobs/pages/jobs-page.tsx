import { Hero } from "~/common/components/hero";
import { JobCard } from "~/features/jobs/components/job-card";
import { JOB_SALARY_TYPES, JOB_TYPES, WORK_TYPES } from "../constants";
import { Button } from "~/common/components/ui/button";
import { Link, useSearchParams } from "react-router";
import { cn } from "~/lib/utils";

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // 필터 선택 후 스크롤이 움직이지 않게끔 구현
  const onFilterClick = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams, {
      preventScrollReset: true,
    });
  };
  return (
    <div className="space-y-10">
      <Hero
        title="직업"
        description="기업에서 등록한 모든 구인 공고를 확인해보세요"
      />
      {/* 직업 컨텐츠 섹션 */}
      <div className="grid grid-cols-6 gap-20 items-start">
        {/* 직업 카드 섹션 */}
        <div className="grid grid-cols-4 col-span-4 gap-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <JobCard
              key={index}
              jobId={`jobId-${index}`}
              companyName="회사명"
              timeAgo="12시간 전"
              title="직업 제목"
              tags={["태그1", "태그2", "태그3"]}
              salary={[3500, 4000]}
              location="경상북도 구미시"
            />
          ))}
        </div>
        {/* 직업 검색 필터 섹션 */}
        <div className="grid col-span-2 border border-gray-200 rounded-lg p-5 space-y-5 sticky top-20">
          <h2 className="text-2xl font-bold flex items-center gap-2 justify-center">
            검색 필터 섹션
          </h2>
          <div>
            {/* 필터별 섹션 */}
            <div className="space-y-5">
              {/* 직업 유형 필터 */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold">직업 유형</h3>
                <div className="flex flex-wrap gap-2">
                  {JOB_TYPES.map((type) => (
                    <Button
                      key={type.value}
                      variant={
                        searchParams.get("type") === type.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() => onFilterClick("type", type.value)}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>
              {/* 근무 형태 필터 */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold">근무 형태</h3>
                <div className="flex flex-wrap gap-2">
                  {WORK_TYPES.map((work) => (
                    <Button
                      key={work.value}
                      variant={
                        searchParams.get("work") === work.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() => onFilterClick("work", work.value)}
                    >
                      {work.label}
                    </Button>
                  ))}
                </div>
              </div>
              {/* 급여 필터 */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold">급여</h3>
                <div className="flex flex-wrap gap-2">
                  {JOB_SALARY_TYPES.map((salary) => (
                    <Button
                      key={salary.value}
                      variant={
                        searchParams.get("salary") === salary.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() => onFilterClick("salary", salary.value)}
                    >
                      {salary.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
