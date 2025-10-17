import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="px-6 py-4 bg-[hsl(var(--chat-input-bg))] border-t border-border rounded-b-3xl"
    >
      <div className="flex gap-3 items-center">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          disabled={disabled}
          className="flex-1 rounded-full border-2 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-[hsl(var(--chat-user-message))] px-5 py-6 text-base"
        />
        <Button
          type="submit"
          disabled={disabled || !message.trim()}
          className="rounded-full w-12 h-12 p-0 bg-gradient-to-br from-[hsl(var(--chat-user-message))] to-[hsl(221,83%,60%)] hover:opacity-90 transition-opacity"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
