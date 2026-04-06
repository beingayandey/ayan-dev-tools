'use client';

import { notFound } from "next/navigation";
import {
  Sparkles,
  Zap,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Share2,
  Download,
  Upload
} from "lucide-react";
import {
  getToolById,
  allTools,
  getToolSEO,
} from "@/lib/tools";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ToolRenderer from "@/components/tool-renderer";
import { SmartSuggestions } from "@/components/smart-suggestions";
import { WorkflowProvider, useWorkflow } from "@/context/workflow-context";
import { WorkflowMode } from "@/components/workflow-mode";
import { CrossLinks } from "@/components/cross-links";
import { WorkspaceShellWithNav } from "@/components/workspace/workspace-shell-with-nav";
import { SuggestionEngine } from "@/components/workspace/suggestion-engine";
import { NextSteps } from "@/components/workspace/next-steps";
import { useDeveloperOS } from "@/context/developer-os-context";
import { useState, useEffect } from "react";

// Wrapper component that checks workflow state to show Next Steps
function NextStepsAfterResult({ toolId }: { toolId: string }) {
  const { isActionCompleted } = useWorkflow();
  const hasOutput = isActionCompleted;

  return <NextSteps toolId={toolId} hasOutput={hasOutput} />;
}

interface ToolPageProps {
  toolId: string;
}

export default function ToolPageClient({ toolId }: ToolPageProps) {
  const tool = getToolById(toolId);

  if (!tool || !toolId) {
    notFound();
  }

  const seo = getToolSEO(tool);

  // Destructure for cleaner access to nested SEO data
  const { seo: meta, content } = seo;

  return (
    <WorkspaceShellWithNav currentToolId={toolId}>
      <article className="max-w-5xl mx-auto">
        {/* 🧠 SEO: High-Conversion Header Structure */}
        <header className="mb-10 text-center sm:text-left">
          {/* Dynamic Trust Signal */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 text-xs font-semibold tracking-wide border border-emerald-500/20 will-change-transform">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            100% Local Processing • +{allTools.length} Free Tools Available
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            {meta.title?.split("|")[0]?.trim() || tool.name}
          </h1>
          <p className="text-lg sm:text-xl text-primary font-semibold mb-4 leading-relaxed">
            {meta.hook}
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {content.intro}
          </p>
        </header>

        {/* ⚡ Interactive logic lives here */}
        <section className="border border-border/50 rounded-2xl bg-card shadow-sm overflow-hidden">
          <WorkflowProvider>
            <ToolRenderer toolId={toolId} />
            {/* 🔗 Contextual Cross-Linking (always visible) */}
            <CrossLinks toolId={toolId} />
            {/* 🎯 Next Steps Engine - Shows AFTER user gets result */}
            <NextStepsAfterResult toolId={toolId} />
            {/* 🎯 Workflow Mode Pipeline */}
            <WorkflowMode toolId={toolId} />
          </WorkflowProvider>
        </section>

        {/* 🧠 Smart Suggestions (Engagement Engine) */}
        <SmartSuggestions toolId={toolId} />

        {/* 🧾 SEO: High-value Product Deep Dive */}
        <section className="mt-20 space-y-24">
          {/* 🚀 Feature Grid: What & Why */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-8">
              <div className="p-1 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/5 border border-primary/10 shadow-2xl shadow-primary/5">
                <div className="p-8 sm:p-10 rounded-[calc(1.5rem-4px)] bg-card/50 sm:backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Sparkles className="size-5" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground m-0">
                      How it Works
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                    {content.whatItDoes}
                  </p>
                  <div className="mt-10 p-6 rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                      <Zap className="size-20" />
                    </div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] opacity-70 mb-3">
                      Engineered Difference
                    </p>
                    <p className="text-lg font-semibold leading-snug relative z-10">
                      {seo.comparison}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-xl font-bold pl-4 border-l-4 border-primary/50 text-foreground">
                Operational Benefits
              </h3>
              <div className="grid gap-4">
                {(content.whyUseIt || []).map((benefit: string, i: number) => (
                  <div
                    key={i}
                    className="group p-5 rounded-2xl border border-border/50 bg-card hover:bg-muted/50 transition-[transform,shadow,background-color] duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-1.5 rounded-full bg-emerald-500/10 text-emerald-500">
                        <CheckCircle2 className="size-4" />
                      </div>
                      <span className="text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-snug">
                        {benefit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🛠️ Implementation Roadmap & Scenarios */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-border/50">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <BookOpen className="size-5" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground m-0 text-balance">
                  How to Use
                </h2>
              </div>
              <div className="relative pl-8 space-y-10 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:to-transparent">
                {(content.howToUse || []).map((step: string, i: number) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[30px] top-0 size-6 rounded-full bg-background border-2 border-primary flex items-center justify-center text-[10px] font-black text-primary z-10 shadow-sm">
                      {i + 1}
                    </div>
                    <p className="text-lg font-medium text-foreground leading-tight mb-2">
                      Step {i + 1}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-bold tracking-tight text-foreground m-0 pl-1">
                Common Use Cases
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {(seo.useCases || []).map((useCase: string, i: number) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl border border-border/50 bg-muted/20 hover:border-primary/20 transition-[border-color] group"
                  >
                    <div className="size-2 rounded-full bg-primary/40 mb-4 group-hover:scale-x-150 transition-all origin-left" />
                    <p className="text-sm font-semibold text-muted-foreground leading-relaxed">
                      {useCase}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🧠 Contextual Awareness */}
          {seo.queryVariants && seo.queryVariants.length > 0 && (
            <div className="p-8 rounded-3xl bg-muted/30 border border-border/30 flex flex-col md:flex-row items-center gap-6 justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-background border border-border/50 text-muted-foreground">
                  <Sparkles className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Part of Ayan Dey's Tool Suite
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-black">
                    Privacy-First Dev Tools
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                {seo.queryVariants.map((variant: string, i: number) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="px-3 py-1 bg-background/80 hover:bg-primary hover:text-primary-foreground border-border/50 font-medium transition-all cursor-default"
                  >
                    {variant}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* ❓ Pro FAQ: Logic & Architecture */}
          <div className="relative pt-24 border-t border-border/50">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 rounded-2xl bg-background border border-border/50 text-primary animate-bounce-slow">
              <HelpCircle className="size-6" />
            </div>

            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-2xl font-bold text-foreground mb-4 capitalize">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground font-medium max-w-lg mx-auto">
                Everything you need to know about using this tool securely.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
              {(content.faqs || []).map(
                (faq: { question: string; answer: string }, i: number) => (
                  <Card
                    key={i}
                    className="border-border/50 bg-card/30 sm:backdrop-blur-md hover:border-primary/30 transition-shadow duration-500 overflow-hidden group"
                  >
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold text-foreground leading-tight flex items-start gap-3">
                        <span className="text-primary font-black opacity-20 text-3xl select-none leading-none -mt-1 group-hover:opacity-60 transition-opacity">
                          Q.
                        </span>
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed pl-8 border-l border-primary/10">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          </div>
        </section>

        {/* 🛡️ Built by Ayan Dey Footer */}
        <footer className="mt-24 pt-12 border-t border-border/40 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="size-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
              <Sparkles className="size-5 text-indigo-400" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Built by{" "}
              <a
                href="https://github.com/beingayandey"
                className="text-indigo-400 hover:underline"
              >
                Ayan Dey
              </a>{" "}
              • Privacy-first tools for developers.
            </p>
          </div>
        </footer>

        {/* Suggestion Engine - Integrated into the workspace */}
        <SuggestionEngine currentToolId={toolId} />
      </article>
    </WorkspaceShellWithNav>
  );
}