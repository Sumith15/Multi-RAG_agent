import { motion } from 'framer-motion';
import { Message } from '@/contexts/ChatContext';
import { User, Bot, FileAudio } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 50 : -50, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-6`}
    >
      <motion.div
        className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
          isUser ? 'bg-secondary/30' : 'bg-primary/20 cyber-border'
        }`}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        {isUser ? (
          <User className="w-5 h-5 text-secondary" />
        ) : (
          <Bot className="w-5 h-5 text-primary" />
        )}
      </motion.div>

      <motion.div
        className={`flex-1 max-w-2xl ${isUser ? 'text-right' : 'text-left'}`}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className={`inline-block px-6 py-4 rounded-2xl ${
            isUser
              ? 'bg-card/60 backdrop-blur-sm'
              : 'bg-card/80 cyber-border backdrop-blur-sm'
          }`}
        >
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>

          {message.source && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 pt-3 border-t border-border/50"
            >
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Source: <span className="text-primary">{message.source}</span>
              </span>
            </motion.div>
          )}

          {message.audioUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-muted/30"
            >
              <FileAudio className="w-4 h-4 text-primary" />
              <audio
                controls
                src={message.audioUrl}
                className="flex-1 h-8"
                style={{
                  filter: 'hue-rotate(180deg) brightness(1.2)',
                }}
              />
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-1 px-2 text-xs text-muted-foreground"
        >
          {message.timestamp.toLocaleTimeString()}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
