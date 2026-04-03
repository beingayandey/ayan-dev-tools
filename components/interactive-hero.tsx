"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Command, Type } from "lucide-react";
import { motion } from "framer-motion";

export function InteractiveHero() {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto-focus on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <section className="relative flex flex-col mt-10 md:mt-16 mb-20 lg:mb-32 overflow-hidden text-center md:text-left rounded-3xl group">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Left Side: Hook Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 w-full flex-1"
        >
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.1]">
              50+ developer tools that run{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 inline-block">
                100% in your browser.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl max-lg:mx-auto">
              No login. No tracking. No limits.
            </p>
          </div>

          {/* Action-Oriented CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center max-lg:justify-center gap-4 pt-4"
          >
            <button 
              onClick={() => {
                inputRef.current?.focus();
                // Optionally highlight the input box briefly
                inputRef.current?.parentElement?.parentElement?.classList.add('ring-2', 'ring-indigo-500');
                setTimeout(() => {
                  inputRef.current?.parentElement?.parentElement?.classList.remove('ring-2', 'ring-indigo-500');
                }, 500);
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-bold text-base hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group"
            >
              <span>Try instantly</span>
              <Command className="size-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-800/50 text-white font-medium text-base hover:bg-zinc-800 hover:scale-105 active:scale-95 border border-white/5 hover:border-white/10 flex items-center justify-center gap-2 transition-all group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({
                  top: document.getElementById('tools-catalog')?.offsetTop || (window.innerHeight * 0.8),
                  behavior: 'smooth'
                })
              }}
            >
              Explore tools
              <ArrowRight className="size-4 text-zinc-500 group-hover:text-white transition-colors group-hover:translate-x-1" />
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side: Instant Interaction Component - Live Word Counter */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full flex-1 max-w-xl mx-auto"
        >
          {/* Decorative floating elements */}
          <div className="absolute -left-8 -top-8 size-32 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -right-8 -bottom-8 size-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="relative group bg-[#0a0a0a] border border-white/10 hover:border-indigo-500/40 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-indigo-500/10 overflow-hidden">
            {/* Header for tool */}
            <div className="flex justify-between items-center px-4 py-3 bg-zinc-900/50 border-b border-white/5">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                <Type className="size-4 text-indigo-400" />
                <span>Live Text Counter</span>
              </div>
              <div className="flex gap-3 text-xs font-medium text-zinc-400">
                <div className="flex items-center gap-1.5 bg-zinc-950/50 px-2 py-1 rounded-md border border-white/5">
                  <span className="text-white">{wordCount}</span> words
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-950/50 px-2 py-1 rounded-md border border-white/5">
                  <span className="text-white">{charCount}</span> chars
                </div>
              </div>
            </div>

            {/* Input area */}
            <div className="relative p-2">
              <textarea
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing without clicking..."
                className="w-full bg-transparent text-white placeholder:text-zinc-600 resize-none p-4 min-h-[220px] focus:outline-none text-lg leading-relaxed rounded-xl transition-all"
                spellCheck="false"
              />
              {!text && mounted && (
                <div className="absolute bottom-6 right-6 text-xs text-indigo-400/80 flex items-center gap-2 pointer-events-none animate-pulse bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
                  <Sparkles className="size-3" />
                  Try typing right now!
                </div>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
