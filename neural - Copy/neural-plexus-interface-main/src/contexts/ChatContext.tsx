import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ChatMode = 'folder' | 'file';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  source?: string;
  audioUrl?: string;
  timestamp: Date;
}

interface ChatContextType {
  currentMode: ChatMode;
  setCurrentMode: (mode: ChatMode) => void;
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [currentMode, setCurrentMode] = useState<ChatMode>('folder');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        currentMode,
        setCurrentMode,
        messages,
        addMessage,
        clearMessages,
        isLoading,
        setIsLoading,
        uploadedFile,
        setUploadedFile,
        error,
        setError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
