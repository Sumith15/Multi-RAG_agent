// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import Console from "./pages/Console";
// import Docs from "./pages/Docs";
// import API from "./pages/API";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/console" element={<Console />} />
//           <Route path="/docs" element={<Docs />} />
//           <Route path="/api" element={<API />} />
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;




import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// New Context and Landing Page Imports
import { ModeProvider, useMode } from "./contexts/ModeContext";
import Landing from "./pages/Landing";

import Index from "./pages/Index";
import Console from "./pages/Console";
import Docs from "./pages/Docs";
import API from "./pages/API";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// This inner component handles the "Gatekeeper" logic
const AppContent = () => {
  const { mode, logout } = useMode();

  // 1. If no mode is selected, show the Landing Page (Gatekeeper)
  if (!mode) {
    return <Landing />;
  }

  // 2. If mode IS selected, show the main application with a Logout button
  return (
    <>
      {/* Floating Logout Button (Visible on all pages) */}
      <div className="fixed top-3.5 right-3 z-[100]">
        <button
          onClick={logout}
          className="bg-red-950/30 hover:bg-red-600 text-red-400 hover:text-white px-4 py-2 rounded-lg border border-red-600/50 text-xs font-mono transition-all backdrop-blur-sm"
        >
          EXIT {mode} MODE
        </button>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/console" element={<Console />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/api" element={<API />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Wrap everything in the ModeProvider so AppContent can access state */}
      <ModeProvider>
        <AppContent />
      </ModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;