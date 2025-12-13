import { motion } from 'framer-motion';
import { BookOpen, FileText, Code2, Zap, Shield, Cpu } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackgroundPlexus from '@/components/BackgroundPlexus';

export default function Docs() {
  const sections = [
    {
      title: 'Getting Started',
      icon: Zap,
      items: [
        'Quick Start Guide',
        'Installation',
        'Configuration',
        'First Query',
      ],
    },
    {
      title: 'Core Concepts',
      icon: Cpu,
      items: [
        'RAG Architecture',
        'Knowledge Base Management',
        'Document Processing',
        'Query Optimization',
      ],
    },
    {
      title: 'API Reference',
      icon: Code2,
      items: [
        'Authentication',
        'Endpoints',
        'Request Format',
        'Response Schema',
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        'Data Encryption',
        'Access Control',
        'Best Practices',
        'Compliance',
      ],
    },
  ];

  return (
    <div className="min-h-screen relative flex flex-col">
      <BackgroundPlexus />
      <Navbar />
      
      <div className="relative z-10 max-w-7xl mx-auto flex-1 flex flex-col pt-24 pb-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold cyber-glow">Documentation</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Complete guide to the RAG-OS Neural Core Interface
          </p>

          {/* Documentation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card/60 cyber-border backdrop-blur-sm hover:bg-card/80 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 + itemIndex * 0.05 }}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-primary" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Quick Start Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-8 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 cyber-border backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-4">Quick Start Example</h3>
            <div className="bg-background/50 rounded-lg p-4 font-mono text-sm">
              <div className="text-primary mb-2">// Initialize RAG-OS</div>
              <div className="text-foreground">
                <span className="text-secondary">const</span> ragos = <span className="text-secondary">new</span> RAGOS({'{'}
              </div>
              <div className="text-foreground pl-4">
                mode: <span className="text-accent">'neural'</span>,
              </div>
              <div className="text-foreground pl-4">
                apiKey: <span className="text-accent">'your-api-key'</span>
              </div>
              <div className="text-foreground">{'}'});</div>
              <div className="mt-3 text-primary">// Query the knowledge base</div>
              <div className="text-foreground">
                <span className="text-secondary">const</span> result = <span className="text-secondary">await</span> ragos.query(
                <span className="text-accent">'AI architecture'</span>);
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
