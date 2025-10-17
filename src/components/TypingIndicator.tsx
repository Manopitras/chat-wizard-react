const TypingIndicator = () => {
  return (
    <div className="flex w-full mb-4 justify-start animate-fade-in">
      <div className="bg-[hsl(var(--chat-bot-message))] text-[hsl(var(--chat-bot-message-foreground))] border border-border rounded-2xl px-5 py-3 shadow-sm">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
