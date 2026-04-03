import Link from "next/link";
import { Shield } from "lucide-react";
import { toolCategories, featuredTools } from "@/lib/tools";
import { ClientHome } from "@/components/client-home";
import { InteractiveHero } from "@/components/interactive-hero";

export default function Home() {
  return (
    <div className="p-6 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-20">
      {/* 🚀 DYNAMIC INTERACTIVE HERO: High-conversion hook with live interaction */}
      <InteractiveHero />

      {/* 🛠️ CLIENT BOUNDARY: Pass below-the-fold data to client-side for staggered entry if needed */}
      <div id="tools-catalog">
        <ClientHome
          toolCategories={toolCategories}
          featuredTools={featuredTools}
        />
      </div>

      {/* System Footer Audit: Kept static for crawlability and speed */}
      <footer className="mt-24 pt-20 border-t border-white/5 pb-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Shield className="size-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Built by Ayan Dey • Privacy-first
              </span>
            </div>
            <p className="text-zinc-400 max-w-2xl leading-relaxed text-sm lg:text-base">
              Everything runs locally in your browser. No logs, no keys, no
              private code ever touches a server. Just the way it should be.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 text-sm pt-4">
            <div className="space-y-4">
              <h3 className="font-bold text-white tracking-widest text-[10px] uppercase">
                Project
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-zinc-500 hover:text-indigo-400 transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-500 hover:text-indigo-400 transition-colors"
                  >
                    Architecture
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-500 hover:text-indigo-400 transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-white tracking-widest text-[10px] uppercase">
                Connect
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/beingayandey"
                    className="text-zinc-500 hover:text-indigo-400 transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/beingayandey"
                    className="text-zinc-500 hover:text-indigo-400 transition-colors"
                  >
                    Twitter (X)
                  </a>
                </li>
                <li>
                  <a
                    href="https://ayan-dev-tools.vercel.app"
                    className="text-zinc-500 hover:text-indigo-400 transition-colors"
                  >
                    Portfolio
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
