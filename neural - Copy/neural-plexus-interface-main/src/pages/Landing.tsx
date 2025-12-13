// // // src/pages/Landing.tsx
// // import { useMode } from "../contexts/ModeContext";

// // export default function Landing() {
// //   const { selectMode } = useMode();

// //   return (
// //     <div className="min-h-screen bg-black text-cyan-400 flex flex-col items-center justify-center p-4">
// //       <div className="max-w-md w-full text-center space-y-8">
        
// //         {/* Logo or Title */}
// //         <div>
// //           <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
// //             UNI-RAG AGENT
// //           </h1>
// //           <p className="mt-2 text-gray-400">Select Interface Mode</p>
// //         </div>

// //         {/* Selection Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          
// //           <button
// //             onClick={() => selectMode("USER")}
// //             className="p-6 border border-cyan-900 rounded-xl hover:bg-cyan-900/20 hover:border-cyan-400 transition-all group"
// //           >
// //             <h2 className="text-xl font-bold group-hover:text-white">User Mode</h2>
// //             <p className="text-sm text-gray-500 mt-2">Standard Access</p>
// //           </button>

// //           <button
// //             onClick={() => selectMode("ADMIN")}
// //             className="p-6 border border-red-900 rounded-xl hover:bg-red-900/20 hover:border-red-500 transition-all group"
// //           >
// //             <h2 className="text-xl font-bold text-red-400 group-hover:text-white">Admin Mode</h2>
// //             <p className="text-sm text-gray-500 mt-2">Full System Access</p>
// //           </button>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { useState } from "react";
// import { useMode } from "../contexts/ModeContext";
// import { toast } from "sonner"; // Using the toaster you have in App.tsx
// import { Lock, User, ShieldCheck, X } from "lucide-react";

// export default function Landing() {
//   const { selectMode } = useMode();
//   const [showAdminLogin, setShowAdminLogin] = useState(false);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleAdminLogin = (e: React.FormEvent) => {
//     e.preventDefault();

//     // --- CREDENTIAL CHECK ---
//     // You can change these values to whatever you want
//     if (username === "admin" && password === "admin123") {
//       toast.success("Access Granted: Admin Mode");
//       selectMode("ADMIN");
//     } else {
//       toast.error("Access Denied: Invalid Credentials");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-cyan-400 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
//       {/* Background Effect */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black -z-10" />

//       <div className="max-w-md w-full text-center space-y-8 z-10">
        
//         {/* Logo / Title */}
//         <div className="space-y-2">
//           <h1 className="text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
//             UNI-RAG AGENT
//           </h1>
//           <p className="text-gray-400 tracking-wide text-sm uppercase">Neural Core Interface</p>
//         </div>

//         {/* Selection Cards */}
//         {!showAdminLogin ? (
//           <div className="grid grid-cols-1 gap-4 mt-8 animate-in fade-in zoom-in duration-300">
            
//             {/* USER BUTTON */}
//             <button
//               onClick={() => {
//                 toast.info("Entering User Mode...");
//                 selectMode("USER");
//               }}
//               className="p-6 border border-cyan-900/50 bg-cyan-950/10 rounded-xl hover:bg-cyan-900/30 hover:border-cyan-400 transition-all group flex items-center gap-4 text-left"
//             >
//               <div className="p-3 rounded-full bg-cyan-500/10 group-hover:bg-cyan-500/20">
//                 <User className="w-6 h-6 text-cyan-400" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold group-hover:text-white transition-colors">User Mode</h2>
//                 <p className="text-sm text-gray-500">Standard access permissions</p>
//               </div>
//             </button>

//             {/* ADMIN BUTTON */}
//             <button
//               onClick={() => setShowAdminLogin(true)}
//               className="p-6 border border-red-900/50 bg-red-950/10 rounded-xl hover:bg-red-900/30 hover:border-red-500 transition-all group flex items-center gap-4 text-left"
//             >
//               <div className="p-3 rounded-full bg-red-500/10 group-hover:bg-red-500/20">
//                 <ShieldCheck className="w-6 h-6 text-red-400" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-red-400 group-hover:text-white transition-colors">Admin Mode</h2>
//                 <p className="text-sm text-gray-500">Requires authentication</p>
//               </div>
//             </button>

//           </div>
//         ) : (
//           /* ADMIN LOGIN FORM */
//           <div className="bg-zinc-900/50 border border-red-900/30 p-8 rounded-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-300 relative">
            
//             <button 
//               onClick={() => setShowAdminLogin(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-white"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             <div className="mb-6 flex flex-col items-center">
//               <div className="p-3 rounded-full bg-red-500/10 mb-3 border border-red-500/20">
//                 <Lock className="w-6 h-6 text-red-500" />
//               </div>
//               <h2 className="text-xl font-bold text-white">Security Clearance</h2>
//               <p className="text-xs text-red-400/70 uppercase tracking-widest mt-1">Authorized Personnel Only</p>
//             </div>

//             <form onSubmit={handleAdminLogin} className="space-y-4">
//               <div className="space-y-2">
//                 <input
//                   type="text"
//                   placeholder="ID / Username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder:text-zinc-600"
//                   autoFocus
//                 />
//               </div>
//               <div className="space-y-2">
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder:text-zinc-600"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg transition-colors mt-2"
//               >
//                 AUTHENTICATE
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useMode } from "../contexts/ModeContext";
import { toast } from "sonner";
import { Lock, User, ShieldCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// 1. Import the shared background component
import BackgroundPlexus from "@/components/BackgroundPlexus";

export default function Landing() {
  const { selectMode } = useMode();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace these with real credentials later
    if (username === "admin" && password === "admin123") {
      toast.success("Access Granted: Admin Mode");
      selectMode("ADMIN");
    } else {
      toast.error("Access Denied: Invalid Credentials");
    }
  };

  return (
    // 2. Main container set to relative so background sits behind
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden text-cyan-400">
      
      {/* 3. Add the shared Background component here */}
      <BackgroundPlexus />

      {/* Content Container with z-index to sit on top */}
      <div className="max-w-md w-full text-center space-y-8 z-10">
        
        {/* Logo / Title */}
        <motion.div 
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-2"
        >
          <h1 className="text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] cyber-glow">
            UNI-RAG AGENT
          </h1>
          <p className="text-gray-400 tracking-wide text-sm uppercase font-mono">Neural Core Interface</p>
        </motion.div>

        {/* Selection Cards / Login Form Switcher */}
        <AnimatePresence mode="wait">
          {!showAdminLogin ? (
            <motion.div 
              key="selection"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 gap-4 mt-8"
            >
              
              {/* USER BUTTON */}
              <button
                onClick={() => {
                  toast.info("Entering User Mode...");
                  selectMode("USER");
                }}
                className="p-6 border border-cyan-900/50 bg-cyan-950/30 rounded-xl hover:bg-cyan-900/50 hover:border-cyan-400 transition-all group flex items-center gap-4 text-left backdrop-blur-md cyber-border"
              >
                <div className="p-3 rounded-full bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                  <User className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold group-hover:text-cyan-300 transition-colors font-mono">User Mode</h2>
                  <p className="text-sm text-gray-500">Standard access permissions</p>
                </div>
              </button>

              {/* ADMIN BUTTON */}
              <button
                onClick={() => setShowAdminLogin(true)}
                className="p-6 border border-red-900/50 bg-red-950/30 rounded-xl hover:bg-red-900/50 hover:border-red-500 transition-all group flex items-center gap-4 text-left backdrop-blur-md"
              >
                <div className="p-3 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-red-400 group-hover:text-red-300 transition-colors font-mono">Admin Mode</h2>
                  <p className="text-sm text-gray-500">Requires authentication</p>
                </div>
              </button>

            </motion.div>
          ) : (
            /* ADMIN LOGIN FORM */
            <motion.div 
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-zinc-900/60 border border-red-900/50 p-8 rounded-2xl backdrop-blur-xl relative shadow-[0_0_30px_rgba(220,38,38,0.2)]"
            >
              
              <button 
                onClick={() => setShowAdminLogin(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 flex flex-col items-center">
                <div className="p-3 rounded-full bg-red-500/10 mb-3 border border-red-500/20">
                  <Lock className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-red-100 font-mono">Security Clearance</h2>
                <p className="text-xs text-red-400/70 uppercase tracking-widest mt-1 font-mono">Authorized Personnel Only</p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="ID / Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder:text-zinc-600 font-mono"
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder:text-zinc-600 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600/80 hover:bg-red-500 text-white font-bold py-3 rounded-lg transition-all mt-2 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] font-mono"
                >
                  AUTHENTICATE
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}