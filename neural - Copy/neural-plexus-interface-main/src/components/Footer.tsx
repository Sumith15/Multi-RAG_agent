import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative mt-auto border-t border-primary/20 backdrop-blur-xl bg-background/80"
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Footer Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-border/30">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <span className="font-mono">RAG-OS v2.0.1</span>
            <span className="mx-2">•</span>
            <span>Neural Core Interface System</span>
          </div>

          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Privacy Policy
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Terms of Service
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Documentation
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center text-xs text-muted-foreground">
          © 2025 RAG-OS. All neural pathways reserved.
        </div>
      </div>
    </motion.footer>
  );
}
