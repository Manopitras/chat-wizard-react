import { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { useToast } from "@/hooks/use-toast";

const ChatContainer = () => {
  const [messages, setMessages] = useState([
    { text: "Oie, tudo bem?", isUser: true },
    { text: "Meu nome é Maria. Como posso te ajudar hoje?", isUser: false }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  // Chave da API - substitua pela sua chave real
  const OPENAI_API_KEY = "SUA_CHAVE_API_AQUI";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessageToChatGPT = async (userMessage) => {
    setIsTyping(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { 
              role: "system", 
              content: "Você é Maria, uma assistente virtual prestativa e amigável. Responda de forma clara e objetiva em português do Brasil." 
            },
            ...messages.map(msg => ({
              role: msg.isUser ? "user" : "assistant",
              content: msg.text
            })),
            { role: "user", content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error("Erro ao conectar com a API");
      }

      const data = await response.json();
      const botMessage = data.choices[0].message.content;

      setMessages(prev => [...prev, { text: botMessage, isUser: false }]);
    } catch (error) {
      console.error("Erro:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Verifique se a chave da API está configurada corretamente.",
        variant: "destructive"
      });
      
      // Resposta padrão quando há erro
      setMessages(prev => [...prev, { 
        text: "Desculpe, não consegui processar sua mensagem. Por favor, verifique a configuração da API.", 
        isUser: false 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (message) => {
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    sendMessageToChatGPT(message);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
      <ChatHeader />
      
      <div className="h-[500px] overflow-y-auto px-6 py-6 bg-[hsl(var(--chat-background))] scroll-smooth">
        {messages.map((msg, index) => (
          <ChatMessage 
            key={index} 
            message={msg.text} 
            isUser={msg.isUser} 
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput 
        onSendMessage={handleSendMessage} 
        disabled={isTyping}
      />
    </div>
  );
};

export default ChatContainer;
