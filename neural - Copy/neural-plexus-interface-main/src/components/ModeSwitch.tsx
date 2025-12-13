import { motion } from 'framer-motion';
import { Folder, FileText } from 'lucide-react';
import { useChatContext, ChatMode } from '@/contexts/ChatContext';

export default function ModeSwitch() {
  const { currentMode, setCurrentMode, clearMessages, setUploadedFile } = useChatContext();

  const handleModeChange = (mode: ChatMode) => {
    if (mode !== currentMode) {
      setCurrentMode(mode);
      clearMessages();
      setUploadedFile(null);
    }
  };

  return (
    <div className="flex justify-center py-6">
      <div className="relative inline-flex items-center gap-2 p-1 rounded-xl bg-card/50 cyber-border backdrop-blur-sm">
        <motion.div
          className="absolute inset-y-1 rounded-lg bg-primary"
          initial={false}
          animate={{
            // FIX: Adjust the x position for 'file' mode
            x: currentMode === 'folder' ? 4 : 'calc(50% + 100px)', 
            // This width accounts for 4px padding + 4px half-gap
            width: 'calc(50% - 8px)', 
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ boxShadow: 'var(--shadow-neon)' }}
        />
        
        <button
          onClick={() => handleModeChange('folder')}
          className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            currentMode === 'folder' ? 'text-background' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Folder className="w-5 h-5" />
          <span className="uppercase tracking-wide text-sm">Knowledge Base</span>
        </button>

        <button
          onClick={() => handleModeChange('file')}
          className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            currentMode === 'file' ? 'text-background' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="uppercase tracking-wide text-sm">Single File</span>
        </button>
      </div>
    </div>
  );
}
