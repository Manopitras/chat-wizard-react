import { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { useToast } from "@/hooks/use-toast";
import { OPENAI_API_KEY, OPENAI_API_URL } from "@/config/api"; // ✅ mantém aqui

const ChatContainer = () => {
  const [messages, setMessages] = useState([
    { text: "Oie, tudo bem?", isUser: true },
    { text: "Meu nome é Maria. Como posso te ajudar hoje?", isUser: false }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  // ❌ remova esta linha duplicada:
  // const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessageToChatGPT = async (userMessage: string) => {
    setIsTyping(true);

    if (!OPENAI_API_KEY) {
      console.error("API Key não encontrada");
      toast({
        title: "Erro de configuração",
        description: "Chave da API não encontrada no arquivo .env",
        variant: "destructive"
      });
      setMessages(prev => [...prev, { 
        text: "Erro: Chave da API não configurada. Verifique o arquivo .env", 
        isUser: false 
      }]);
      setIsTyping(false);
      return;
    }

    try {
      const response = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
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
        const errorData = await response.json();
        throw new Error(`Erro ${response.status}: ${errorData.error?.message || "Erro desconhecido"}`);
      }

      const data = await response.json();
      const botMessage = data.choices[0].message.content;
      setMessages(prev => [...prev, { text: botMessage, isUser: false }]);
    } catch (error: any) {
      console.error("Erro detalhado:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message || "Erro ao conectar com a API",
        variant: "destructive"
      });
      setMessages(prev => [...prev, { 
        text: `Erro: ${error.message || "Não foi possível processar a mensagem"}`, 
        isUser: false 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (message: string) => {
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
