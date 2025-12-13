import { motion } from 'framer-motion';
import { BookOpen, Zap, Terminal, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { icon: Terminal, label: 'Console', href: '/console' },
    { icon: BookOpen, label: 'Sort', href: 'http://127.0.0.1:5000/' },
    { icon: Zap, label: 'Ingest', href: '/api' },
    { icon: Eye, label: 'Vizualize', href: 'http://localhost:2000/' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-primary/20"
    >
        <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center cyber-border">
                <div className="w-4 h-4 rounded-sm bg-primary animate-pulse" />
              </div>
              <span className="font-bold text-lg tracking-tight">UNI-RAG AGENT</span>
            </motion.div>
          </Link>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.label} to={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-card/50 transition-colors text-sm"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Status Indicator */}
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-medium uppercase tracking-wider">Offline</span>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
