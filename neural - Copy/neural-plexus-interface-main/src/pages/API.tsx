// // // import { motion } from 'framer-motion';
// // // import { Zap, Code, Database, Key, Send } from 'lucide-react';
// // // import Navbar from '@/components/Navbar';
// // // import Footer from '@/components/Footer';
// // // import BackgroundPlexus from '@/components/BackgroundPlexus';

// // // export default function API() {
// // //   const endpoints = [
// // //     {
// // //       method: 'POST',
// // //       path: '/chat-folder',
// // //       description: 'Query knowledge base with folder mode',
// // //       parameters: [
// // //         { name: 'query', type: 'string', required: true },
// // //       ],
// // //     },
// // //     {
// // //       method: 'POST',
// // //       path: '/chat-file',
// // //       description: 'Query single file with document upload',
// // //       parameters: [
// // //         { name: 'file', type: 'File', required: true },
// // //         { name: 'query', type: 'string', required: true },
// // //       ],
// // //     },
// // //   ];

// // //   return (
// // //     <div className="min-h-screen relative flex flex-col">
// // //       <BackgroundPlexus />
// // //       <Navbar />
      
// // //       <div className="relative z-10 max-w-7xl mx-auto flex-1 flex flex-col pt-24 pb-8 px-6">
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.5 }}
// // //         >
// // //           <div className="flex items-center gap-3 mb-2">
// // //             <Zap className="w-8 h-8 text-primary" />
// // //             <h1 className="text-4xl font-bold cyber-glow">API Reference</h1>
// // //           </div>
// // //           <p className="text-muted-foreground mb-8">
// // //             Complete API documentation for RAG-OS integration
// // //           </p>

// // //           {/* API Info */}
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
// // //             <motion.div
// // //               initial={{ opacity: 0, scale: 0.9 }}
// // //               animate={{ opacity: 1, scale: 1 }}
// // //               transition={{ delay: 0.1 }}
// // //               className="p-6 rounded-xl bg-card/60 cyber-border backdrop-blur-sm"
// // //             >
// // //               <Database className="w-6 h-6 text-primary mb-3" />
// // //               <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
// // //                 Base URL
// // //               </div>
// // //               <div className="font-mono text-sm">apiURL</div>
// // //             </motion.div>

// // //             <motion.div
// // //               initial={{ opacity: 0, scale: 0.9 }}
// // //               animate={{ opacity: 1, scale: 1 }}
// // //               transition={{ delay: 0.2 }}
// // //               className="p-6 rounded-xl bg-card/60 cyber-border backdrop-blur-sm"
// // //             >
// // //               <Key className="w-6 h-6 text-primary mb-3" />
// // //               <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
// // //                 Authentication
// // //               </div>
// // //               <div className="font-mono text-sm">Bearer Token</div>
// // //             </motion.div>

// // //             <motion.div
// // //               initial={{ opacity: 0, scale: 0.9 }}
// // //               animate={{ opacity: 1, scale: 1 }}
// // //               transition={{ delay: 0.3 }}
// // //               className="p-6 rounded-xl bg-card/60 cyber-border backdrop-blur-sm"
// // //             >
// // //               <Send className="w-6 h-6 text-primary mb-3" />
// // //               <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
// // //                 Rate Limit
// // //               </div>
// // //               <div className="font-mono text-sm">100 req/min</div>
// // //             </motion.div>
// // //           </div>

// // //           {/* Endpoints */}
// // //           <div className="space-y-6">
// // //             {endpoints.map((endpoint, index) => (
// // //               <motion.div
// // //                 key={endpoint.path}
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 transition={{ delay: 0.4 + index * 0.1 }}
// // //                 className="rounded-xl bg-card/60 cyber-border backdrop-blur-sm overflow-hidden"
// // //               >
// // //                 <div className="p-6 border-b border-border/30">
// // //                   <div className="flex items-center gap-3 mb-2">
// // //                     <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary font-mono text-sm font-bold">
// // //                       {endpoint.method}
// // //                     </span>
// // //                     <span className="font-mono text-lg">{endpoint.path}</span>
// // //                   </div>
// // //                   <p className="text-muted-foreground">{endpoint.description}</p>
// // //                 </div>

// // //                 <div className="p-6">
// // //                   <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
// // //                     Parameters
// // //                   </h4>
// // //                   <div className="space-y-2">
// // //                     {endpoint.parameters.map((param) => (
// // //                       <div
// // //                         key={param.name}
// // //                         className="flex items-start gap-3 p-3 rounded-lg bg-background/30"
// // //                       >
// // //                         <Code className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
// // //                         <div className="flex-1">
// // //                           <div className="flex items-center gap-2 mb-1">
// // //                             <span className="font-mono font-semibold">{param.name}</span>
// // //                             <span className="text-xs px-2 py-0.5 rounded bg-secondary/20 text-secondary">
// // //                               {param.type}
// // //                             </span>
// // //                             {param.required && (
// // //                               <span className="text-xs px-2 py-0.5 rounded bg-destructive/20 text-destructive">
// // //                                 required
// // //                               </span>
// // //                             )}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </div>

// // //                 <div className="p-6 bg-background/20">
// // //                   <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
// // //                     Example Request
// // //                   </h4>
// // //                   <div className="bg-background/50 rounded-lg p-4 font-mono text-sm">
// // //                     <div className="text-muted-foreground">
// // //                       <span className="text-primary">POST</span> {endpoint.path}
// // //                     </div>
// // //                     <div className="text-muted-foreground mt-2">
// // //                       Content-Type: application/json
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </motion.div>
// // //             ))}
// // //           </div>
// // //         </motion.div>
// // //       </div>

// // //       <Footer />
// // //     </div>
// // //   );
// // // }




// // import { motion } from 'framer-motion';
// // import { Zap, Code, Database, Key, Send } from 'lucide-react';
// // import Navbar from '@/components/Navbar';
// // import Footer from '@/components/Footer';
// // import BackgroundPlexus from '@/components/BackgroundPlexus';
// // import { useMode } from '../contexts/ModeContext';

// // export default function API() {
// //   const { apiUrl, mode } = useMode();

// //   const endpoints = [
// //     {
// //       method: 'POST',
// //       path: '/chat-folder',
// //       description: 'Query knowledge base with folder mode',
// //       parameters: [
// //         { name: 'query', type: 'string', required: true },
// //       ],
// //     },
// //     {
// //       method: 'POST',
// //       path: '/chat-file',
// //       description: 'Query single file with document upload',
// //       parameters: [
// //         { name: 'file', type: 'File', required: true },
// //         { name: 'query', type: 'string', required: true },
// //       ],
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen relative flex flex-col">
// //       <BackgroundPlexus />
// //       <Navbar />
      
// //       <div className="relative z-10 max-w-7xl mx-auto flex-1 flex flex-col pt-24 pb-8 px-6">
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.5 }}
// //         >
// //           <div className="flex items-center gap-3 mb-2">
// //             <Zap className="w-8 h-8 text-primary" />
// //             <h1 className="text-4xl font-bold cyber-glow">API Reference</h1>
// //             <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary border border-primary/30 font-mono">
// //               MODE: {mode}
// //             </span>
// //           </div>
// //           <p className="text-muted-foreground mb-8">
// //             Complete API documentation for RAG-OS integration
// //           </p>

// //           {/* API Info */}
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
// //             <motion.div
// //               initial={{ opacity: 0, scale: 0.9 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               transition={{ delay: 0.1 }}
// //               className="p-6 rounded-xl bg-card/60 cyber-border backdrop-blur-sm"
// //             >
// //               <Database className="w-6 h-6 text-primary mb-3" />
// //               <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
// //                 Base URL
// //               </div>
// //               {/* DYNAMIC URL HERE */}
// //               <div className="font-mono text-sm text-green-400">{apiUrl}</div>
// //             </motion.div>

// //             <motion.div
// //               initial={{ opacity: 0, scale: 0.9 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               transition={{ delay: 0.2 }}
// //               className="p-6 rounded-xl bg-card/60 cyber-border backdrop-blur-sm"
// //             >
// //               <Key className="w-6 h-6 text-primary mb-3" />
// //               <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
// //                 Authentication
// //               </div>
// //               <div className="font-mono text-sm">Bearer Token</div>
// //             </motion.div>

// //             <motion.div
// //               initial={{ opacity: 0, scale: 0.9 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               transition={{ delay: 0.3 }}
// //               className="p-6 rounded-xl bg-card/60 cyber-border backdrop-blur-sm"
// //             >
// //               <Send className="w-6 h-6 text-primary mb-3" />
// //               <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
// //                 Rate Limit
// //               </div>
// //               <div className="font-mono text-sm">100 req/min</div>
// //             </motion.div>
// //           </div>

// //           {/* Endpoints */}
// //           <div className="space-y-6">
// //             {endpoints.map((endpoint, index) => (
// //               <motion.div
// //                 key={endpoint.path}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 0.4 + index * 0.1 }}
// //                 className="rounded-xl bg-card/60 cyber-border backdrop-blur-sm overflow-hidden"
// //               >
// //                 <div className="p-6 border-b border-border/30">
// //                   <div className="flex items-center gap-3 mb-2">
// //                     <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary font-mono text-sm font-bold">
// //                       {endpoint.method}
// //                     </span>
// //                     <span className="font-mono text-lg">{endpoint.path}</span>
// //                   </div>
// //                   <p className="text-muted-foreground">{endpoint.description}</p>
// //                 </div>

// //                 <div className="p-6">
// //                   <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
// //                     Parameters
// //                   </h4>
// //                   <div className="space-y-2">
// //                     {endpoint.parameters.map((param) => (
// //                       <div
// //                         key={param.name}
// //                         className="flex items-start gap-3 p-3 rounded-lg bg-background/30"
// //                       >
// //                         <Code className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
// //                         <div className="flex-1">
// //                           <div className="flex items-center gap-2 mb-1">
// //                             <span className="font-mono font-semibold">{param.name}</span>
// //                             <span className="text-xs px-2 py-0.5 rounded bg-secondary/20 text-secondary">
// //                               {param.type}
// //                             </span>
// //                             {param.required && (
// //                               <span className="text-xs px-2 py-0.5 rounded bg-destructive/20 text-destructive">
// //                                 required
// //                               </span>
// //                             )}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div className="p-6 bg-background/20">
// //                   <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
// //                     Example Request
// //                   </h4>
// //                   <div className="bg-background/50 rounded-lg p-4 font-mono text-sm">
// //                     <div className="text-muted-foreground">
// //                       <span className="text-primary">POST</span> {apiUrl}{endpoint.path}
// //                     </div>
// //                     <div className="text-muted-foreground mt-2">
// //                       Content-Type: application/json
// //                     </div>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </motion.div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // }




// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Zap, Code, Database, Key, Send, Copy, Check } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import BackgroundPlexus from '@/components/BackgroundPlexus';
// import { useMode } from '../contexts/ModeContext';

// export default function API() {
//   const { apiUrl, mode } = useMode();
//   const [copiedIndex, setCopiedIndex] = useState(null);

//   const endpoints = [
//     {
//       method: 'POST',
//       path: '/chat-folder',
//       description: 'Query knowledge base with folder mode',
//       parameters: [
//         { name: 'query', type: 'string', required: true },
//       ],
//       exampleBody: '{\n  "query": "Summarize the Q3 financial reports"\n}'
//     },
//     {
//       method: 'POST',
//       path: '/chat-file',
//       description: 'Query single file with document upload',
//       parameters: [
//         { name: 'file', type: 'File', required: true },
//         { name: 'query', type: 'string', required: true },
//       ],
//       exampleBody: 'FormData: \n  file: (binary)\n  query: "Extract the main clauses"'
//     },
//     {
//       method: 'POST',
//       path: '/uploadfile/',
//       description: 'Neural Uplink: Uploads and converts images to PDF for ingestion',
//       parameters: [
//         { name: 'file', type: 'File', required: true },
//       ],
//       exampleBody: 'FormData: \n  file: (image/png or application/pdf)'
//     },
//   ];

//   const handleCopy = (text, index) => {
//     navigator.clipboard.writeText(text);
//     setCopiedIndex(index);
//     setTimeout(() => setCopiedIndex(null), 2000);
//   };

//   return (
//     <div className="min-h-screen relative flex flex-col bg-[#050510] text-[#e0e6ed] font-sans overflow-hidden">
      
//       {/* --- NEURAL BACKGROUND --- */}
//       <BackgroundPlexus />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,30,60,0.4)_0%,rgba(5,5,16,1)_70%)] pointer-events-none z-0" />
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

//       <Navbar />
      
//       <div className="relative z-10 max-w-7xl mx-auto flex-1 flex flex-col pt-32 pb-12 px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {/* --- HEADER SECTION --- */}
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
//             <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
//               <Zap className="w-8 h-8 text-[#00f3ff]" />
//             </div>
//             <div>
//               <h1 className="text-4xl md:text-5xl font-bold font-['Rajdhani'] uppercase tracking-wider text-white drop-shadow-[0_0_10px_rgba(0,243,255,0.4)]">
//                 Neural <span className="text-[#00f3ff]">API Reference</span>
//               </h1>
//               <div className="flex items-center gap-3 mt-2">
//                 <span className="text-xs px-2 py-1 rounded bg-[#00f3ff]/10 text-[#00f3ff] border border-[#00f3ff]/30 font-mono tracking-widest">
//                   SYSTEM STATUS: ONLINE
//                 </span>
//                 <span className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-mono tracking-widest uppercase">
//                   MODE: {mode}
//                 </span>
//               </div>
//             </div>
//           </div>
          
//           <p className="text-slate-400 mb-12 max-w-2xl text-lg font-light">
//             Direct neural interface documentation for RAG-OS integration. Authenticate via Bearer token to access deep-learning endpoints.
//           </p>

//           {/* --- INFO CARDS --- */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//             {[
//               { icon: Database, label: "Base URL", value: apiUrl, color: "text-green-400" },
//               { icon: Key, label: "Authentication", value: "Bearer <Token>", color: "text-purple-400" },
//               { icon: Send, label: "Rate Limit", value: "100 req/min", color: "text-orange-400" }
//             ].map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 0.1 + (i * 0.1) }}
//                 className="p-6 rounded-xl bg-[#0f1423]/80 border border-[#00f3ff]/20 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:border-[#00f3ff]/50 transition-colors"
//               >
//                 <item.icon className={`w-6 h-6 ${item.color} mb-3`} />
//                 <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">
//                   {item.label}
//                 </div>
//                 <div className={`font-mono text-sm ${item.color} truncate`}>{item.value}</div>
//               </motion.div>
//             ))}
//           </div>

//           {/* --- ENDPOINTS LIST --- */}
//           <div className="space-y-8">
//             {endpoints.map((endpoint, index) => (
//               <motion.div
//                 key={endpoint.path}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 + index * 0.1 }}
//                 className="group rounded-xl bg-[#0f1423]/60 border border-[#00f3ff]/20 backdrop-blur-sm overflow-hidden hover:shadow-[0_0_30px_rgba(0,243,255,0.1)] transition-all duration-300"
//               >
//                 {/* Endpoint Header */}
//                 <div className="p-6 border-b border-[#00f3ff]/10 bg-gradient-to-r from-[#00f3ff]/5 to-transparent">
//                   <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
//                     <span className="px-3 py-1 rounded-md bg-[#00f3ff]/10 text-[#00f3ff] font-mono text-sm font-bold border border-[#00f3ff]/20 shadow-[0_0_10px_rgba(0,243,255,0.1)]">
//                       {endpoint.method}
//                     </span>
//                     <span className="font-mono text-lg text-white tracking-wide">{endpoint.path}</span>
//                   </div>
//                   <p className="text-slate-400 font-light">{endpoint.description}</p>
//                 </div>

//                 <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
//                   {/* Parameters Column */}
//                   <div>
//                     <h4 className="text-xs font-bold uppercase tracking-widest text-[#00f3ff] mb-4 flex items-center gap-2">
//                       <Code className="w-4 h-4" /> Parameters
//                     </h4>
//                     <div className="space-y-3">
//                       {endpoint.parameters.map((param) => (
//                         <div
//                           key={param.name}
//                           className="flex items-start gap-3 p-3 rounded-lg bg-[#000]/40 border border-[#fff]/5"
//                         >
//                           <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] mt-2 box-content shadow-[0_0_5px_#00f3ff]" />
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-1">
//                               <span className="font-mono font-semibold text-slate-200">{param.name}</span>
//                               <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
//                                 {param.type}
//                               </span>
//                               {param.required && (
//                                 <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 uppercase">
//                                   required
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Example Request Column */}
//                   <div>
//                     <div className="flex items-center justify-between mb-4">
//                       <h4 className="text-xs font-bold uppercase tracking-widest text-[#00f3ff]">
//                         Example Payload
//                       </h4>
//                       <button 
//                         onClick={() => handleCopy(endpoint.exampleBody, index)}
//                         className="text-xs flex items-center gap-1 text-slate-500 hover:text-white transition-colors"
//                       >
//                         {copiedIndex === index ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
//                         {copiedIndex === index ? 'COPIED' : 'COPY'}
//                       </button>
//                     </div>
                    
//                     <div className="relative group/code">
//                       <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f3ff]/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover/code:opacity-100 transition duration-500"></div>
//                       <div className="relative bg-[#050510] rounded-lg p-4 font-mono text-sm border border-[#fff]/10">
//                         <div className="text-slate-500 mb-2 border-b border-[#fff]/5 pb-2">
//                           <span className="text-[#00f3ff]">POST</span> {apiUrl}{endpoint.path}
//                         </div>
//                         <pre className="text-green-400 overflow-x-auto whitespace-pre-wrap font-light">
//                           {endpoint.exampleBody}
//                         </pre>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       <Footer />
//     </div>
//   );
// }




import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Smartphone, UploadCloud, ShieldCheck, Wifi } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackgroundPlexus from '@/components/BackgroundPlexus';

export default function API() {
  
  // URL to the QR code image generated by your Python script
  // Ensure 'ingest_qr.png' is inside your React 'public' folder or served correctly
  const qrCodeUrl = "/ingest_qr.png"; 

  return (
    <div className="min-h-screen relative flex flex-col bg-[#050510] text-[#e0e6ed] font-sans overflow-hidden">
      
      {/* --- NEURAL BACKGROUND --- */}
      <BackgroundPlexus />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,30,60,0.4)_0%,rgba(5,5,16,1)_70%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <Navbar />
      
      <div className="relative z-10 max-w-6xl mx-auto flex-1 flex flex-col pt-32 pb-12 px-6 items-center justify-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          {/* HEADER */}
          <div className="text-center mb-12">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#00f3ff]/10 border border-[#00f3ff]/20 text-[#00f3ff] text-xs tracking-[0.2em] mb-4 shadow-[0_0_15px_rgba(0,243,255,0.3)]"
            >
              <Wifi className="w-3 h-3 animate-pulse" />
              NEURAL UPLINK ACTIVE
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold font-['Rajdhani'] uppercase tracking-wider text-white drop-shadow-[0_0_20px_rgba(0,243,255,0.5)]">
              Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#0066ff]">Ingest Node</span>
            </h1>
            <p className="text-slate-400 mt-4 text-lg font-light max-w-2xl mx-auto">
              Establish a direct bridge between physical documents and the Neural Core. Scan the quantum matrix below to initiate mobile upload protocol.
            </p>
          </div>

          {/* MAIN CARD GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* LEFT: QR CODE SCANNER */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-[#00f3ff] to-[#0066ff] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative h-full bg-[#0a0f1c]/90 border border-[#00f3ff]/30 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                
                {/* Scanner Frame */}
                <div className="relative w-64 h-64 mb-8 p-4 border-2 border-[#00f3ff]/20 rounded-xl bg-black/40">
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00f3ff] rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#00f3ff] rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#00f3ff] rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00f3ff] rounded-br-lg"></div>

                  {/* QR Image */}
                  <img 
                      src={qrCodeUrl} 
                      alt="Neural Uplink QR" 
                      className="w-full h-full object-contain rounded-lg opacity-90"
                      onError={(e) => {
                          // Use currentTarget instead of target
                          e.currentTarget.onerror = null; 
                          e.currentTarget.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=MobileServerActive&color=00f3ff&bgcolor=050510";
  }}
/>

                  {/* Scanning Line Animation */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#00f3ff] shadow-[0_0_15px_#00f3ff] opacity-50 animate-[scan_3s_ease-in-out_infinite]"></div>
                </div>

                <div className="flex items-center gap-2 text-[#00f3ff] font-mono text-sm tracking-widest">
                  <QrCode className="w-4 h-4" />
                  <span>SCAN THE QR CODE</span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: INSTRUCTIONS */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col justify-center gap-6"
            >
              {[
                { icon: Smartphone, title: "Connect Device", desc: "Scan the QR code with your mobile camera to access the secure uplink interface." },
                { icon: UploadCloud, title: "Transmit Data", desc: "Capture images or select PDFs. The neural bridge will auto-convert images to PDF." },
                { icon: ShieldCheck, title: "Core Ingestion", desc: "Files are instantly encrypted and routed to the RAG Knowledge Base." }
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-5 p-5 rounded-xl bg-[#0f1423]/60 border border-white/5 hover:border-[#00f3ff]/30 transition-colors group">
                  <div className="p-3 rounded-lg bg-[#00f3ff]/10 text-[#00f3ff] shadow-[0_0_10px_rgba(0,243,255,0.1)] group-hover:scale-110 transition-transform">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-['Rajdhani'] font-bold text-xl uppercase tracking-wide mb-1 group-hover:text-[#00f3ff] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
              
            </motion.div>

          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}