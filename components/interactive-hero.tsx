"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Type, Code, Link as LinkIcon, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ContentType = "text" | "json" | "url" | "empty";

export function InteractiveHero() {
  const [text, setText] = useState("");
  const [contentType, setContentType] = useState<ContentType>("empty");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto-focus on mount for zero-friction interaction
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Smart content detection
  useEffect(() => {
    if (!text) {
      setContentType("empty");
      return;
    }

    const trimmed = text.trim();

    // URL Detection
    if (/^(https?:\/\/|www\.)\S+$/.test(trimmed)) {
      setContentType("url");
      return;
    }

    // JSON Detection
    try {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed === "object" && parsed !== null) {
        setContentType("json");
        return;
      }
    } catch (e) {
      // Not JSON
    }

    setContentType("text");
  }, [text]);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  // Instant result formatting for JSON
  const getFormattedResult = () => {
    if (contentType === "json") {
      try {
        return JSON.stringify(JSON.parse(text), null, 2);
      } catch (e) {
        return text;
      }
    }
    return null;
  };

  return (
    <section className="relative flex flex-col items-center justify-center py-12 md:py-20 lg:py-32 overflow-hidden text-center max-w-5xl mx-auto">
      {/* Ambient Backgrounds */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="relative z-10 w-full space-y-12">

        {/* 🚀 THE HOOK: High-Impact Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
            50+ tools. Zero tracking.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Instant results.
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 font-medium max-w-xl mx-auto leading-relaxed">
            Run everything directly in your browser. No login. No limits.
          </p>
        </motion.div>

        {/* ⚡ THE INTERACTION: Smart Paste Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full max-w-3xl mx-auto group"
        >
          {/* Glow effect behind the box */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-500" />

          <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-indigo-500/40">

            {/* Dynamic Header based on content type */}
            <div className="flex justify-between items-center px-6 py-4 bg-zinc-900/50 border-b border-white/5">
              <div className="flex items-center gap-3 text-sm font-medium text-zinc-300">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                  {contentType === "json" && <Code className="size-4" />}
                  {contentType === "url" && <LinkIcon className="size-4" />}
                  {contentType === "text" && <Type className="size-4" />}
                  {contentType === "empty" && <Zap className="size-4" />}
                </div>
                <span className="capitalize">
                  {contentType === "empty" ? "Ready for input" : `${contentType} detected`}
                </span>
              </div>

              {/* Real-time metrics */}
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5 bg-zinc-950/50 px-2 py-1 rounded-full border border-white/5 text-[11px] font-mono text-zinc-400">
                  <span className="text-white">{wordCount}</span> words
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-950/50 px-2 py-1 rounded-full border border-white/5 text-[11px] font-mono text-zinc-400">
                  <span className="text-white">{charCount}</span> chars
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="relative p-4">
              <textarea
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste JSON, a URL, or just start typing..."
                className="w-full bg-transparent text-white placeholder:text-zinc-600 resize-none p-2 min-h-[280px] focus:outline-none text-lg leading-relaxed rounded-xl transition-all"
                spellCheck="false"
              />

              {/* Instant Result Overlay (for JSON formatting) */}
              <AnimatePresence>
                {contentType === "json" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute inset-x-4 bottom-4 top-20 bg-zinc-900/90 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-4 shadow-2xl overflow-auto text-left font-mono text-sm text-indigo-300 pointer-events-none"
                  >
                    <div className="flex items-center gap-2 mb-2 text-xs text-zinc-500 uppercase tracking-widest font-bold">
                      <Sparkles className="size-3" /> Formatted Result
                    </div>
                    <pre className="whitespace-pre-wrap">{getFormattedResult()}</pre>
                  </motion.div>
                )}
              </AnimatePresence>

              {!text && mounted && (
                <div className="absolute bottom-8 right-8 text-xs text-indigo-400/80 flex items-center gap-2 pointer-events-none animate-bounce bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
                  <Sparkles className="size-3" />
                  Paste something here!
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* 🧭 Secondary Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center items-center gap-6"
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: document.getElementById('tools-catalog')?.offsetTop || 0,
                behavior: 'smooth'
              })
            }}
            className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-all font-medium text-sm"
          >
            Explore all 50+ tools
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
