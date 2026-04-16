import { MessageCircleIcon } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="h-full flex items-center justify-center gap-3">
      <MessageCircleIcon className="size-10" />
      <span>메시지를 클릭해주세요</span>
    </div>
  );
}
