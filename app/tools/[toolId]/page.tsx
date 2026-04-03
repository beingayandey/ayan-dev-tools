import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Construction,
  Star,
  Sparkles,
  Zap,
  CheckCircle2,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import {
  getToolById,
  getCategoryByToolId,
  allTools,
  getToolSEO,
} from "@/lib/tools";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { iconMap } from "@/lib/icon-map";

// Dynamic imports for tool components
const toolComponents: Record<string, React.ComponentType> = {
  "px-to-rem": dynamic(() =>
    import("@/components/tools/px-to-rem").then((mod) => mod.PxToRemTool),
  ),
  "word-counter": dynamic(() =>
    import("@/components/tools/word-counter").then(
      (mod) => mod.WordCounterTool,
    ),
  ),
  "character-count-online": dynamic(() =>
    import("@/components/tools/word-counter").then(
      (mod) => mod.WordCounterTool,
    ),
  ),
  "essay-word-counter": dynamic(() =>
    import("@/components/tools/word-counter").then(
      (mod) => mod.WordCounterTool,
    ),
  ),
  "secure-text-analyzer": dynamic(() =>
    import("@/components/tools/word-counter").then(
      (mod) => mod.WordCounterTool,
    ),
  ),
  "seo-content-length-checker": dynamic(() =>
    import("@/components/tools/word-counter").then(
      (mod) => mod.WordCounterTool,
    ),
  ),
  "reading-time-calculator": dynamic(() =>
    import("@/components/tools/word-counter").then(
      (mod) => mod.WordCounterTool,
    ),
  ),
  "bulk-character-count-pro": dynamic(() =>
    import("@/components/tools/word-counter").then(
      (mod) => mod.WordCounterTool,
    ),
  ),
  "qr-generator": dynamic(() =>
    import("@/components/tools/qr-generator").then(
      (mod) => mod.QrGeneratorTool,
    ),
  ),
  "code-generator": dynamic(() =>
    import("@/components/tools/code-generator").then(
      (mod) => mod.CodeGeneratorTool,
    ),
  ),
  "image-converter": dynamic(() =>
    import("@/components/tools/image-converter").then(
      (mod) => mod.ImageConverterTool,
    ),
  ),
  "artwork-enhancer": dynamic(() =>
    import("@/components/tools/artwork-enhancer").then(
      (mod) => mod.ArtworkEnhancerTool,
    ),
  ),
  "regex-tester": dynamic(() =>
    import("@/components/tools/regex-tester").then(
      (mod) => mod.RegexTesterTool,
    ),
  ),
  "line-height-calc": dynamic(() =>
    import("@/components/tools/line-height-calc").then(
      (mod) => mod.LineHeightCalcTool,
    ),
  ),
  "placeholder-generator": dynamic(() =>
    import("@/components/tools/placeholder-generator").then(
      (mod) => mod.PlaceholderGeneratorTool,
    ),
  ),
  "meta-tag-generator": dynamic(() =>
    import("@/components/tools/meta-tag-generator").then(
      (mod) => mod.MetaTagGeneratorTool,
    ),
  ),
  "paper-sizes": dynamic(() =>
    import("@/components/tools/paper-sizes").then((mod) => mod.PaperSizesTool),
  ),
  "svg-optimiser": dynamic(() =>
    import("@/components/tools/svg-optimiser").then(
      (mod) => mod.SvgOptimiserTool,
    ),
  ),
  "favicon-generator": dynamic(() =>
    import("@/components/tools/favicon-generator").then(
      (mod) => mod.FaviconGeneratorTool,
    ),
  ),
  "image-splitter": dynamic(() =>
    import("@/components/tools/image-splitter").then(
      (mod) => mod.ImageSplitterTool,
    ),
  ),
  "typo-calc": dynamic(() =>
    import("@/components/tools/typo-calc").then((mod) => mod.TypoCalcTool),
  ),
  "glyph-browser": dynamic(() =>
    import("@/components/tools/glyph-browser").then(
      (mod) => mod.GlyphBrowserTool,
    ),
  ),
  "font-explorer": dynamic(() =>
    import("@/components/tools/font-explorer").then(
      (mod) => mod.FontExplorerTool,
    ),
  ),
  "colour-converter": dynamic(() =>
    import("@/components/tools/colour-converter").then(
      (mod) => mod.ColourConverterTool,
    ),
  ),
  "hex-to-rgb": dynamic(() =>
    import("@/components/tools/colour-converter").then(
      (mod) => mod.ColourConverterTool,
    ),
  ),
  "rgb-to-hex": dynamic(() =>
    import("@/components/tools/colour-converter").then(
      (mod) => mod.ColourConverterTool,
    ),
  ),
  "hex-to-hsl": dynamic(() =>
    import("@/components/tools/colour-converter").then(
      (mod) => mod.ColourConverterTool,
    ),
  ),
  "color-converter-css": dynamic(() =>
    import("@/components/tools/colour-converter").then(
      (mod) => mod.ColourConverterTool,
    ),
  ),
  "tailwind-color-converter": dynamic(() =>
    import("@/components/tools/colour-converter").then(
      (mod) => mod.ColourConverterTool,
    ),
  ),
  "tailwind-shades": dynamic(() =>
    import("@/components/tools/tailwind-shades").then(
      (mod) => mod.TailwindShadesTool,
    ),
  ),
  "harmony-generator": dynamic(() =>
    import("@/components/tools/harmony-generator").then(
      (mod) => mod.HarmonyGeneratorTool,
    ),
  ),
  "palette-generator": dynamic(() =>
    import("@/components/tools/palette-generator").then(
      (mod) => mod.PaletteGeneratorTool,
    ),
  ),
  "palette-collection": dynamic(() =>
    import("@/components/tools/palette-collection").then(
      (mod) => mod.PaletteCollectionTool,
    ),
  ),
  "tailwind-cheatsheet": dynamic(() =>
    import("@/components/tools/tailwind-cheatsheet").then(
      (mod) => mod.TailwindCheatsheetTool,
    ),
  ),
  "markdown-writer": dynamic(() =>
    import("@/components/tools/markdown-writer").then(
      (mod) => mod.MarkdownWriterTool,
    ),
  ),
  "social-cropper": dynamic(() =>
    import("@/components/tools/social-cropper").then(
      (mod) => mod.SocialCropperTool,
    ),
  ),
  "matte-generator": dynamic(() =>
    import("@/components/tools/matte-generator").then(
      (mod) => mod.MatteGeneratorTool,
    ),
  ),
  "scroll-generator": dynamic(() =>
    import("@/components/tools/scroll-generator").then(
      (mod) => mod.ScrollGeneratorTool,
    ),
  ),
  watermarker: dynamic(() =>
    import("@/components/tools/watermarker").then((mod) => mod.WatermarkerTool),
  ),
  "contrast-checker": dynamic(() =>
    import("@/components/tools/contrast-checker").then(
      (mod) => mod.ContrastCheckerTool,
    ),
  ),
  "colorblind-sim": dynamic(() =>
    import("@/components/tools/colorblind-sim").then(
      (mod) => mod.ColorblindSimTool,
    ),
  ),
  "background-remover": dynamic(() =>
    import("@/components/tools/background-remover").then(
      (mod) => mod.BackgroundRemoverTool,
    ),
  ),
  "transparent-png-generator": dynamic(() =>
    import("@/components/tools/background-remover").then(
      (mod) => mod.BackgroundRemoverTool,
    ),
  ),
  "e-commerce-bg-remover": dynamic(() =>
    import("@/components/tools/background-remover").then(
      (mod) => mod.BackgroundRemoverTool,
    ),
  ),
  "hd-background-remover": dynamic(() =>
    import("@/components/tools/background-remover").then(
      (mod) => mod.BackgroundRemoverTool,
    ),
  ),
  "privacy-bg-remover": dynamic(() =>
    import("@/components/tools/background-remover").then(
      (mod) => mod.BackgroundRemoverTool,
    ),
  ),
  "instant-cutout-tool": dynamic(() =>
    import("@/components/tools/background-remover").then(
      (mod) => mod.BackgroundRemoverTool,
    ),
  ),
  "designer-bg-remover": dynamic(() =>
    import("@/components/tools/background-remover").then(
      (mod) => mod.BackgroundRemoverTool,
    ),
  ),
  "zine-imposer": dynamic(() =>
    import("@/components/tools/zine-imposer").then(
      (mod) => mod.ZineImposerTool,
    ),
  ),
  "gradient-generator": dynamic(() =>
    import("@/components/tools/gradient-generator").then(
      (mod) => mod.GradientGeneratorTool,
    ),
  ),
  "sci-calc": dynamic(() =>
    import("@/components/tools/sci-calc").then((mod) => mod.SciCalcTool),
  ),
  "graph-calc": dynamic(() =>
    import("@/components/tools/graph-calc").then((mod) => mod.GraphCalcTool),
  ),
  "algebra-calc": dynamic(() =>
    import("@/components/tools/algebra-calc").then(
      (mod) => mod.AlgebraCalcTool,
    ),
  ),
  "base-converter": dynamic(() =>
    import("@/components/tools/base-converter").then(
      (mod) => mod.BaseConverterTool,
    ),
  ),
  "time-calc": dynamic(() =>
    import("@/components/tools/time-calc").then((mod) => mod.TimeCalcTool),
  ),
  "unit-converter": dynamic(() =>
    import("@/components/tools/unit-converter").then(
      (mod) => mod.UnitConverterTool,
    ),
  ),
  encoder: dynamic(() =>
    import("@/components/tools/encoder").then((mod) => mod.EncoderTool),
  ),
  "image-tracer": dynamic(() =>
    import("@/components/tools/image-tracer").then(
      (mod) => mod.ImageTracerTool,
    ),
  ),
  "guillotine-director": dynamic(() =>
    import("@/components/tools/guillotine-director").then(
      (mod) => mod.GuillotineDirectorTool,
    ),
  ),
  "pdf-preflight": dynamic(() =>
    import("@/components/tools/pdf-preflight").then(
      (mod) => mod.PdfPreflightTool,
    ),
  ),
  "shavian-transliterator": dynamic(() =>
    import("@/components/tools/shavian-transliterator").then(
      (mod) => mod.ShavianTransliteratorTool,
    ),
  ),
  imposer: dynamic(() =>
    import("@/components/tools/imposer").then((mod) => mod.ImposerTool),
  ),
};

interface ToolPageProps {
  params: Promise<{
    toolId: string;
  }>;
}

export async function generateStaticParams() {
  return allTools.map((tool) => ({
    toolId: tool.id,
  }));
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { toolId } = await params;
  const tool = getToolById(toolId);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  const seo = getToolSEO(tool);

  return {
    title: seo.seo.title,
    description: seo.seo.metaDesc,
    keywords: seo.seo.keywords,
    openGraph: {
      title: seo.seo.title,
      description: seo.seo.metaDesc,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.seo.title,
      description: seo.seo.metaDesc,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { toolId } = await params;
  const tool = getToolById(toolId);

  if (!tool || !toolId) {
    notFound();
  }

  const seo = getToolSEO(tool);
  const ToolComponent = toolComponents[toolId];

  // Destructure for cleaner access to nested SEO data
  const { seo: meta, content } = seo;

  return (
    <article className="max-w-5xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
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

      {/* ⚡ Client component boundary - Interactive logic lives here */}
      <section className="mb-16 border border-border/50 rounded-2xl bg-card shadow-sm overflow-hidden">
        {ToolComponent ? (
          <ToolComponent />
        ) : (
          <div className="p-8 sm:p-12">
            <Card className="border-dashed border-2 shadow-none max-w-2xl mx-auto">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                    <Construction className="size-8 text-muted-foreground" />
                  </div>
                </div>
                <CardTitle className="text-xl text-foreground">
                  Coming Soon
                </CardTitle>
                <CardDescription className="max-w-md mx-auto">
                  This tool is currently under construction. Check back soon for
                  the full implementation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-8 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Tool interface will appear here
                  </p>
                  <div className="flex flex-col gap-3 max-w-sm mx-auto">
                    <div className="h-10 bg-muted rounded-md animate-pulse" />
                    <div className="h-24 bg-muted rounded-md animate-pulse" />
                    <div className="h-10 bg-primary/20 rounded-md animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </section>

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
              href="https://ayan-dev-tools.vercel.app"
              className="text-indigo-400 hover:underline"
            >
              Ayan Dey
            </a>{" "}
            • Privacy-first tools for developers.
          </p>
        </div>
      </footer>

      {/* 📌 Inject Structured Data (JSON-LD) for Rich Snippets */}
      {meta.structuredData && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(meta.structuredData),
          }}
        />
      )}
    </article>
  );
}
