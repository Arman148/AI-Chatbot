import { useEffect, useState } from "react";
import { TOPICS, TopicData } from "../data/topics";
import { chatService } from "../services/ai/chatService";
import { v4 as uuidv4 } from "uuid";
import { ChatMessage, OpenAIMessage } from "../types/chat";

type ApiClient = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

interface UseChatOptions {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

interface UseChat {
  topics: TopicData[];
  currentTopic: TopicData | null;
  messages: ChatMessage[];
  isTyping: boolean;
  selectTopic: (id: string) => void;
  sendMessage: (content: string) => Promise<void>;
}

export function useChat(
  apiClient: ApiClient,
  { isAuthenticated, isAuthLoading }: UseChatOptions
): UseChat {
  const [topics] = useState<TopicData[]>(TOPICS);
  const [currentTopic, setCurrentTopic] = useState<TopicData | null>(topics[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Load history whenever auth is ready or the topic changes
  useEffect(() => {
    if (isAuthLoading || !isAuthenticated || !currentTopic) return;

    const loadHistory = async () => {
      try {
        const res = await apiClient(
          `http://localhost:5000/api/messages?topicId=${currentTopic.id}`
        );

        if (!res.ok) {
          console.error("Failed to fetch messages");
          return;
        }

        const data = await res.json();
        const mapped: ChatMessage[] = data.map((m: any) => ({
          id: m._id,
          role: m.role,
          content: m.content,
          timestamp: new Date(m.timestamp).getTime(),
        }));
        setMessages(mapped);
      } catch (e) {
        console.error("Failed to load history:", e);
      }
    };

    loadHistory();
  }, [apiClient, isAuthenticated, isAuthLoading, currentTopic?.id]);

  function selectTopic(id: string) {
    const found = topics.find((t) => t.id === id) ?? null;
    setMessages([]); // avoid showing previous topic messages briefly
    setCurrentTopic(found);
  }

  async function sendMessage(content: string) {
    if (!currentTopic || !content.trim()) return;

    const userMsg: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      await apiClient("http://localhost:5000/api/messages", {
        method: "POST",
        body: JSON.stringify({
          content,
          role: "user",
          topicId: currentTopic.id,
        }),
      });
    } catch (e) {
      console.error("Failed to save user message:", e);
    }

    setIsTyping(true);

    try {
      const systemPrompt: OpenAIMessage = {
        role: "system",
        content: `You are a helpful university mathematics tutor. The student has chosen the topic: "${currentTopic.label}". Always answer with a focus on this topic, and use clear, concise language.`,
      };

      // Filter out only valid messages for the AI context
      const apiMessages: OpenAIMessage[] = [
        systemPrompt,
        ...messages
          .filter((m) => m.role === "user" || m.role === "assistant")
          .map((m) => ({
            role: m.role,
            content: m.content,
          })),
        { role: "user", content },
      ];

      const aiContent = await chatService.fetchResponse(apiMessages);

      const aiMsg: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content: aiContent,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMsg]);

      try {
        await apiClient("http://localhost:5000/api/messages", {
          method: "POST",
          body: JSON.stringify({
            content: aiContent,
            role: "assistant",
            topicId: currentTopic.id,
          }),
        });
      } catch (e) {
        console.error("Failed to save assistant message:", e);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "assistant",
          content: "Sorry, an error occurred while getting the AI response.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return {
    topics,
    currentTopic,
    messages,
    isTyping,
    selectTopic,
    sendMessage,
  };
}
