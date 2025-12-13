import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatContext } from '@/contexts/ChatContext';
import MessageBubble from './MessageBubble';
import ThinkingOrb from './ThinkingOrb';
import { AlertCircle } from 'lucide-react';

export default function ChatWindow() {
  const { messages, isLoading, error, setError } = useChatContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-6 py-4 neural-grid"
      style={{ maxHeight: 'calc(100vh - 400px)' }}
    >
      <AnimatePresence mode="popLayout">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isLoading && (
          <motion.div
            key="thinking-orb"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center py-8"
          >
            <div className="text-center">
              <ThinkingOrb />
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm text-primary uppercase tracking-widest mt-4"
              >
                Neural Processing...
              </motion.p>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-md"
          >
            <div className="p-6 rounded-xl bg-destructive/10 border-2 border-destructive/50 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-destructive mb-2 uppercase tracking-wide">
                    ERROR: Connection Protocol Failed
                  </h4>
                  <p className="text-sm text-destructive/80">
                    {error}
                  </p>
                  <button
                    onClick={() => setError(null)}
                    className="mt-4 px-4 py-2 rounded-lg bg-destructive/20 hover:bg-destructive/30 text-destructive text-sm font-medium transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {messages.length === 0 && !isLoading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center h-full min-h-[300px]"
          >
            <div className="text-center max-w-md">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 1, 0.5] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center cyber-border"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 cyber-glow">
                Neural Core Ready
              </h3>
              <p className="text-sm text-muted-foreground">
                Initiate query to begin interaction with the RAG system
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
