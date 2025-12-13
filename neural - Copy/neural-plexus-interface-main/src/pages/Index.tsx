import { ChatProvider } from '@/contexts/ChatContext';
import BackgroundPlexus from '@/components/BackgroundPlexus';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import ModeSwitch from '@/components/ModeSwitch';
import FileUploadZone from '@/components/FileUploadZone';
import ChatWindow from '@/components/ChatWindow';
import ChatInput from '@/components/ChatInput';
import Footer from '@/components/Footer';
import { useChatContext } from '@/contexts/ChatContext';

function MainContent() {
  const { currentMode } = useChatContext();

  return (
    <div className="min-h-screen relative flex flex-col">
      <BackgroundPlexus />
      <Navbar />
      
      <div className="relative z-10 max-w-7xl mx-auto flex-1 flex flex-col pt-16 pb-8">
        <Header />
        <ModeSwitch />
        
        <main className="mt-8 flex-1 flex flex-col">
          <div className="max-w-5xl mx-auto w-full flex flex-col flex-1">
            {currentMode === 'file' && <FileUploadZone />}
            
            <div className="rounded-2xl bg-card/30 backdrop-blur-md cyber-border overflow-hidden flex flex-col flex-1 mb-8">
              <ChatWindow />
              <ChatInput />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default function Index() {
  return (
    <ChatProvider>
      <MainContent />
    </ChatProvider>
  );
}
