const ChatHeader = () => {
  return (
    <div className="bg-[hsl(var(--chat-header))] text-[hsl(var(--chat-header-foreground))] px-8 py-6 rounded-t-3xl shadow-lg">
      <h1 className="text-3xl font-bold mb-2">Chatbot com IA</h1>
      <p className="text-sm opacity-90">
        Envie sua dúvida e seja respondido na hora! Estamos online 24/7!
      </p>
    </div>
  );
};

export default ChatHeader;
