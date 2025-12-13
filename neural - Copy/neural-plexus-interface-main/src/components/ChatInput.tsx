// import { useState, FormEvent } from 'react';
// import { motion } from 'framer-motion';
// import { Send } from 'lucide-react';
// import { useChatContext } from '@/contexts/ChatContext';
// import axios from 'axios';

// const API_BASE_URL = 'http://127.0.0.1:8000';

// export default function ChatInput() {
//   const [input, setInput] = useState('');
//   const { currentMode, uploadedFile, addMessage, setIsLoading, setError } = useChatContext();

//   const isDisabled = currentMode === 'file' && !uploadedFile;

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || isDisabled) return;

//     const userQuery = input.trim();
//     setInput('');
//     setError(null);

//     addMessage({
//       role: 'user',
//       content: userQuery,
//     });

//     setIsLoading(true);

//     try {
//       if (currentMode === 'folder') {
//         const response = await axios.post(`${API_BASE_URL}/chat-folder`, {
//           query: userQuery,
//         });

//         addMessage({
//           role: 'assistant',
//           content: response.data.response,
//           source: response.data.source,
//           audioUrl: response.data.audio_url,
//         });
//       } else {
//         const formData = new FormData();
//         formData.append('file', uploadedFile!);
//         formData.append('query', userQuery);

//         const response = await axios.post(`${API_BASE_URL}/chat-file`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         addMessage({
//           role: 'assistant',
//           content: response.data.response,
//           source: response.data.source,
//           audioUrl: response.data.audio_url,
//         });
//       }
//     } catch (error) {
//       console.error('API Error:', error);
//       setError('Connection Protocol Failed. Check Agent Status.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="px-6 pb-6">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="relative"
//       >
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           disabled={isDisabled}
//           placeholder={
//             isDisabled
//               ? 'Upload a file to enable query input...'
//               : 'Enter neural query...'
//           }
//           className={`w-full px-6 py-4 pr-14 rounded-xl bg-card/60 cyber-border backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
//             isDisabled ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         />
        
//         <motion.button
//           type="submit"
//           disabled={isDisabled || !input.trim()}
//           whileHover={{ scale: isDisabled ? 1 : 1.1 }}
//           whileTap={{ scale: isDisabled ? 1 : 0.9 }}
//           className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
//             isDisabled || !input.trim()
//               ? 'bg-muted/30 text-muted-foreground cursor-not-allowed'
//               : 'bg-primary text-primary-foreground hover:shadow-neon'
//           }`}
//           style={{
//             boxShadow: !isDisabled && input.trim() ? 'var(--shadow-neon)' : 'none',
//           }}
//         >
//           <Send className="w-5 h-5" />
//         </motion.button>
//       </motion.div>
//     </form>
//   );
// }








import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useChatContext } from '@/contexts/ChatContext';
import { useMode } from '@/contexts/ModeContext'; // Import this!
import axios from 'axios';

export default function ChatInput() {
  const [input, setInput] = useState('');
  
  // Get the dynamic API URL from our ModeContext
  const { apiUrl } = useMode(); 
  
  const { currentMode, uploadedFile, addMessage, setIsLoading, setError } = useChatContext();

  const isDisabled = currentMode === 'file' && !uploadedFile;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isDisabled) return;

    const userQuery = input.trim();
    setInput('');
    setError(null);

    addMessage({
      role: 'user',
      content: userQuery,
    });

    setIsLoading(true);

    try {
      // Use apiUrl here instead of the undefined constant
      if (currentMode === 'folder') {
        const response = await axios.post(`${apiUrl}/chat-folder`, {
          query: userQuery,
        });

        addMessage({
          role: 'assistant',
          content: response.data.response,
          source: response.data.source,
          audioUrl: response.data.audio_url,
        });
      } else {
        const formData = new FormData();
        formData.append('file', uploadedFile!);
        formData.append('query', userQuery);

        const response = await axios.post(`${apiUrl}/chat-file`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        addMessage({
          role: 'assistant',
          content: response.data.response,
          source: response.data.source,
          audioUrl: response.data.audio_url,
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      setError('Connection Protocol Failed. Check Agent Status.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-6 pb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isDisabled}
          placeholder={
            isDisabled
              ? 'Upload a file to enable query input...'
              : 'Enter neural query...'
          }
          className={`w-full px-6 py-4 pr-14 rounded-xl bg-card/60 cyber-border backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
            isDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
        
        <motion.button
          type="submit"
          disabled={isDisabled || !input.trim()}
          whileHover={{ scale: isDisabled ? 1 : 1.1 }}
          whileTap={{ scale: isDisabled ? 1 : 0.9 }}
          className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            isDisabled || !input.trim()
              ? 'bg-muted/30 text-muted-foreground cursor-not-allowed'
              : 'bg-primary text-primary-foreground hover:shadow-neon'
          }`}
          style={{
            boxShadow: !isDisabled && input.trim() ? 'var(--shadow-neon)' : 'none',
          }}
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </form>
  );
}