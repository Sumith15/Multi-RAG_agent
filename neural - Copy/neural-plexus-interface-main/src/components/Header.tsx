import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative py-8 px-6 text-center"
    >
      <motion.div
        className="inline-flex items-center gap-4"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "linear" 
          }}
        >
          <Brain className="w-12 h-12 text-primary" strokeWidth={1.5} />
        </motion.div>
        <h1 className="text-5xl font-bold tracking-tight cyber-glow">
          UNI-RAG AGENT
        </h1>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-2 text-sm uppercase tracking-widest text-muted-foreground"
      >
        Neural Core Interface
      </motion.p>
    </motion.header>
  );
}
