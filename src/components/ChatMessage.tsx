import { cn } from "@/lib/utils";

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={cn(
      "flex w-full mb-4 animate-fade-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-5 py-3 shadow-sm",
        isUser 
          ? "bg-gradient-to-br from-[hsl(var(--chat-user-message))] to-[hsl(221,83%,60%)] text-[hsl(var(--chat-user-message-foreground))]"
          : "bg-[hsl(var(--chat-bot-message))] text-[hsl(var(--chat-bot-message-foreground))] border border-border"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
