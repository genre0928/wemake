import { GithubIcon, LockIcon, MessageCircle } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Separator } from "~/common/components/ui/separator";
import { Link } from "react-router";

export default function AuthButton() {
  return (
    <div className="w-full space-y-10">
      <Separator />
      {/* 소셜 로그인 섹션 */}
      <div className="flex flex-col items-center mx-auto gap-4 w-3/4">
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/kakao/start">
            <MessageCircle />
            KAKAO 로그인
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/github/start">
            <GithubIcon />
            GitHub 로그인
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/otp/start">
            <LockIcon />
            OTP 로그인
          </Link>
        </Button>
      </div>
    </div>
  );
}
