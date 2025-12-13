import { motion } from 'framer-motion';
import { Terminal, Activity, Code, Database } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackgroundPlexus from '@/components/BackgroundPlexus';

export default function Console() {
  const commands = [
    { cmd: '$ rag-os init --mode=neural', output: 'Neural core initialized successfully', status: 'success' },
    { cmd: '$ rag-os query "AI architecture"', output: 'Retrieved 24 documents from knowledge base', status: 'success' },
    { cmd: '$ rag-os deploy --env=production', output: 'Deployment complete. System online.', status: 'success' },
  ];

  const systemMetrics = [
    { label: 'CPU Usage', value: '34%', icon: Activity },
    { label: 'Memory', value: '2.4 GB', icon: Database },
    { label: 'Active Queries', value: '127', icon: Code },
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
            <Terminal className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold cyber-glow">System Console</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Real-time monitoring and command interface
          </p>

          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {systemMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card/60 cyber-border backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <metric.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl font-bold">{metric.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Command History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl bg-card/40 cyber-border backdrop-blur-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Command History
            </h2>
            
            <div className="space-y-4 font-mono text-sm">
              {commands.map((command, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="space-y-1"
                >
                  <div className="text-primary">{command.cmd}</div>
                  <div className="text-muted-foreground pl-4">→ {command.output}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="flex items-center gap-2">
                <span className="text-primary">$</span>
                <input
                  type="text"
                  placeholder="Enter command..."
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground font-mono"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
