"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, Send, X, Loader2, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

declare global {
  interface Window {
    puter?: {
      ai: {
        chat: (
          prompt: string,
          options?: { model?: string; stream?: boolean }
        ) => Promise<any>;
      };
    };
  }
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "您好！我是 AI 智能助手。我可以協助您分析長輩的徘徊風險、解答照護問題，或提供建議。有什麼我可以幫助您的嗎？",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [puterLoaded, setPuterLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Puter.js script
    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    script.async = true;
    script.onload = () => {
      setPuterLoaded(true);
      console.log("Puter.js loaded successfully");
    };
    script.onerror = () => {
      console.error("Failed to load Puter.js");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (!window.puter?.ai) {
        throw new Error("Puter.js AI not available");
      }

      // Enhanced prompt with context
      const contextPrompt = `你是一個專業的失智症照護助手。請以繁體中文回答。

當前情境：赤土崎多功能館的徘徊預警系統
用戶問題：${input}

請提供簡潔、專業且實用的建議。`;

      const response = await window.puter.ai.chat(contextPrompt, {
        model: "gemini-3-pro-preview",
        stream: false
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: response || "抱歉，我無法處理您的請求。請稍後再試。",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI chat error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "抱歉，AI 服務暫時無法使用。請確認網路連線或稍後再試。",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white shadow-large transition-all hover:bg-primary-600 hover:scale-110 active:scale-95",
          isOpen && "scale-0 opacity-0"
        )}
        aria-label="開啟 AI 助手"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-[600px] w-[400px] flex-col rounded-2xl border border-neutral-200 bg-white shadow-large transition-all",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-4 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">AI 智能助手</h3>
              <p className="text-xs text-white/80">
                {puterLoaded ? "已連線 · Gemini 3 Pro" : "載入中..."}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
            aria-label="關閉"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                  message.role === "user"
                    ? "bg-primary-500 text-white"
                    : "bg-neutral-100 text-neutral-800"
                )}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <span
                  className={cn(
                    "mt-1 block text-xs",
                    message.role === "user" ? "text-white/70" : "text-neutral-500"
                  )}
                >
                  {message.timestamp.toLocaleTimeString("zh-TW", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-neutral-100 rounded-2xl px-4 py-3">
                <Loader2 className="h-5 w-5 animate-spin text-neutral-500" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-neutral-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="輸入您的問題..."
              disabled={!puterLoaded || isLoading}
              className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || !puterLoaded || isLoading}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="發送"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            按 Enter 發送 · Shift+Enter 換行
          </p>
        </div>
      </div>
    </>
  );
}
