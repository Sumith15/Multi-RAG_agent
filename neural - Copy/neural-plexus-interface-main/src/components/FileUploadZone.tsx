import { useState, DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X } from 'lucide-react';
import { useChatContext } from '@/contexts/ChatContext';

export default function FileUploadZone() {
  const { uploadedFile, setUploadedFile, clearMessages } = useChatContext();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setUploadedFile(file);
        clearMessages();
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
      clearMessages();
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    clearMessages();
  };

  return (
    <div className="mb-6">
      <AnimatePresence mode="wait">
        {!uploadedFile ? (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative overflow-hidden rounded-2xl transition-all ${
              isDragging
                ? 'bg-primary/20 scale-105'
                : 'bg-card/40 hover:bg-card/60'
            }`}
            style={{
              boxShadow: isDragging ? 'var(--shadow-neon)' : 'none',
            }}
          >
            <motion.div
              animate={isDragging ? {
                background: [
                  'radial-gradient(circle at 0% 0%, hsl(185 100% 50% / 0.3), transparent)',
                  'radial-gradient(circle at 100% 100%, hsl(185 100% 50% / 0.3), transparent)',
                  'radial-gradient(circle at 0% 0%, hsl(185 100% 50% / 0.3), transparent)',
                ],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 pointer-events-none"
            />
            
            <div className="relative p-12 text-center cyber-border">
              <input
                type="file"
                accept=".pdf,.docx,.pptx,.jpeg,.jpg,.png"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              
              <motion.div
                animate={isDragging ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Upload className="w-16 h-16 mx-auto mb-4 text-primary" strokeWidth={1.5} />
              </motion.div>
              
              <motion.h3
                animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                className="text-xl font-semibold mb-2"
              >
                {isDragging ? 'DROP FILE TO INITIATE PROTOCOL' : 'DATA PORT ACTIVE'}
              </motion.h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                {isDragging 
                  ? 'Release to upload' 
                  : 'Drag & drop PDF, DOCX, JPEG, PPTX file, or click to browse'
                }
              </p>
              
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
                  .PDF
                </div>
                <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
                  .DOCX
                </div>
                <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
                  .JPEG
                </div>
                <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
                  .PPTX
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="file-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-card/60 cyber-border backdrop-blur-sm"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <File className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRemoveFile}
              className="flex-shrink-0 w-8 h-8 rounded-lg bg-destructive/20 hover:bg-destructive/30 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-destructive" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
