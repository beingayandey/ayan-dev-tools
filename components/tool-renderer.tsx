"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Zap, Construction } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRecentTools } from "@/hooks/use-recent-tools";
import { getToolById } from "@/lib/tools";

// Loading Skeleton for Tools
const LoadingTool = () => (
  <div className="p-8 sm:p-12 animate-in fade-in duration-500">
    <Card className="border-border/50 shadow-none max-w-2xl mx-auto bg-muted/20">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-6">
          <div className="size-16 rounded-2xl bg-muted animate-pulse flex items-center justify-center">
             <Zap className="size-8 text-muted-foreground/50" />
          </div>
        </div>
        <div className="h-6 w-48 bg-muted rounded-full mx-auto animate-pulse mb-3" />
        <div className="h-4 w-64 bg-muted rounded-full mx-auto animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-4">
         <div className="h-10 bg-muted rounded-xl animate-pulse" />
         <div className="h-40 bg-muted rounded-xl animate-pulse" />
         <div className="h-12 bg-primary/10 rounded-xl animate-pulse" />
      </CardContent>
    </Card>
  </div>
);

// Dynamic imports for tool components
const toolComponents: Record<string, React.ComponentType> = {
  "px-to-rem": dynamic(
    () => import("@/components/tools/px-to-rem").then((mod) => mod.PxToRemTool),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "word-counter": dynamic(
    () =>
      import("@/components/tools/word-counter").then(
        (mod) => mod.WordCounterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "character-count-online": dynamic(
    () =>
      import("@/components/tools/word-counter").then(
        (mod) => mod.WordCounterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "essay-word-counter": dynamic(
    () =>
      import("@/components/tools/word-counter").then(
        (mod) => mod.WordCounterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "secure-text-analyzer": dynamic(
    () =>
      import("@/components/tools/word-counter").then(
        (mod) => mod.WordCounterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "seo-content-length-checker": dynamic(
    () =>
      import("@/components/tools/word-counter").then(
        (mod) => mod.WordCounterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "reading-time-calculator": dynamic(
    () =>
      import("@/components/tools/word-counter").then(
        (mod) => mod.WordCounterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "bulk-character-count-pro": dynamic(
    () =>
      import("@/components/tools/word-counter").then(
        (mod) => mod.WordCounterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "qr-generator": dynamic(
    () =>
      import("@/components/tools/qr-generator").then(
        (mod) => mod.QrGeneratorTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "code-generator": dynamic(
    () =>
      import("@/components/tools/code-generator").then(
        (mod) => mod.CodeGeneratorTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "image-converter": dynamic(
    () =>
      import("@/components/tools/image-converter").then(
        (mod) => mod.ImageConverterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "artwork-enhancer": dynamic(
    () =>
      import("@/components/tools/artwork-enhancer").then(
        (mod) => mod.ArtworkEnhancerTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "regex-tester": dynamic(
    () =>
      import("@/components/tools/regex-tester").then(
        (mod) => mod.RegexTesterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "line-height-calc": dynamic(
    () =>
      import("@/components/tools/line-height-calc").then(
        (mod) => mod.LineHeightCalcTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "placeholder-generator": dynamic(
    () =>
      import("@/components/tools/placeholder-generator").then(
        (mod) => mod.PlaceholderGeneratorTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "meta-tag-generator": dynamic(
    () =>
      import("@/components/tools/meta-tag-generator").then(
        (mod) => mod.MetaTagGeneratorTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "paper-sizes": dynamic(
    () => import("@/components/tools/paper-sizes").then((mod) => mod.PaperSizesTool),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "svg-optimiser": dynamic(
    () =>
      import("@/components/tools/svg-optimiser").then(
        (mod) => mod.SvgOptimiserTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "favicon-generator": dynamic(
    () =>
      import("@/components/tools/favicon-generator").then(
        (mod) => mod.FaviconGeneratorTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "image-splitter": dynamic(
    () =>
      import("@/components/tools/image-splitter").then(
        (mod) => mod.ImageSplitterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "typo-calc": dynamic(
    () => import("@/components/tools/typo-calc").then((mod) => mod.TypoCalcTool),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "glyph-browser": dynamic(
    () =>
      import("@/components/tools/glyph-browser").then(
        (mod) => mod.GlyphBrowserTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "font-explorer": dynamic(
    () =>
      import("@/components/tools/font-explorer").then(
        (mod) => mod.FontExplorerTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "colour-converter": dynamic(
    () =>
      import("@/components/tools/colour-converter").then(
        (mod) => mod.ColourConverterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "hex-to-rgb": dynamic(
    () =>
      import("@/components/tools/colour-converter").then(
        (mod) => mod.ColourConverterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "rgb-to-hex": dynamic(
    () =>
      import("@/components/tools/colour-converter").then(
        (mod) => mod.ColourConverterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "hex-to-hsl": dynamic(
    () =>
      import("@/components/tools/colour-converter").then(
        (mod) => mod.ColourConverterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "color-converter-css": dynamic(
    () =>
      import("@/components/tools/colour-converter").then(
        (mod) => mod.ColourConverterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "tailwind-color-converter": dynamic(
    () =>
      import("@/components/tools/colour-converter").then(
        (mod) => mod.ColourConverterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "tailwind-shades": dynamic(
    () =>
      import("@/components/tools/tailwind-shades").then(
        (mod) => mod.TailwindShadesTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "harmony-generator": dynamic(
    () =>
      import("@/components/tools/harmony-generator").then(
        (mod) => mod.HarmonyGeneratorTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "palette-generator": dynamic(
    () =>
      import("@/components/tools/palette-generator").then(
        (mod) => mod.PaletteGeneratorTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "palette-collection": dynamic(
    () =>
      import("@/components/tools/palette-collection").then(
        (mod) => mod.PaletteCollectionTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "tailwind-cheatsheet": dynamic(
    () =>
      import("@/components/tools/tailwind-cheatsheet").then(
        (mod) => mod.TailwindCheatsheetTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "markdown-writer": dynamic(
    () =>
      import("@/components/tools/markdown-writer").then(
        (mod) => mod.MarkdownWriterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "social-cropper": dynamic(
    () =>
      import("@/components/tools/social-cropper").then(
        (mod) => mod.SocialCropperTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "matte-generator": dynamic(
    () =>
      import("@/components/tools/matte-generator").then(
        (mod) => mod.MatteGeneratorTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "scroll-generator": dynamic(
    () =>
      import("@/components/tools/scroll-generator").then(
        (mod) => mod.ScrollGeneratorTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  watermarker: dynamic(
    () => import("@/components/tools/watermarker").then((mod) => mod.WatermarkerTool),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "contrast-checker": dynamic(
    () =>
      import("@/components/tools/contrast-checker").then(
        (mod) => mod.ContrastCheckerTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "colorblind-sim": dynamic(
    () =>
      import("@/components/tools/colorblind-sim").then(
        (mod) => mod.ColorblindSimTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "background-remover": dynamic(
    () =>
      import("@/components/tools/background-remover").then(
        (mod) => mod.BackgroundRemoverTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "transparent-png-generator": dynamic(
    () =>
      import("@/components/tools/background-remover").then(
        (mod) => mod.BackgroundRemoverTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "e-commerce-bg-remover": dynamic(
    () =>
      import("@/components/tools/background-remover").then(
        (mod) => mod.BackgroundRemoverTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "hd-background-remover": dynamic(
    () =>
      import("@/components/tools/background-remover").then(
        (mod) => mod.BackgroundRemoverTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "privacy-bg-remover": dynamic(
    () =>
      import("@/components/tools/background-remover").then(
        (mod) => mod.BackgroundRemoverTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "instant-cutout-tool": dynamic(
    () =>
      import("@/components/tools/background-remover").then(
        (mod) => mod.BackgroundRemoverTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "designer-bg-remover": dynamic(
    () =>
      import("@/components/tools/background-remover").then(
        (mod) => mod.BackgroundRemoverTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "zine-imposer": dynamic(
    () =>
      import("@/components/tools/zine-imposer").then(
        (mod) => mod.ZineImposerTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "gradient-generator": dynamic(
    () =>
      import("@/components/tools/gradient-generator").then(
        (mod) => mod.GradientGeneratorTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "sci-calc": dynamic(
    () => import("@/components/tools/sci-calc").then((mod) => mod.SciCalcTool),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "graph-calc": dynamic(
    () => import("@/components/tools/graph-calc").then((mod) => mod.GraphCalcTool),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "algebra-calc": dynamic(
    () =>
      import("@/components/tools/algebra-calc").then(
        (mod) => mod.AlgebraCalcTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "base-converter": dynamic(
    () =>
      import("@/components/tools/base-converter").then(
        (mod) => mod.BaseConverterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "time-calc": dynamic(
    () => import("@/components/tools/time-calc").then((mod) => mod.TimeCalcTool),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "unit-converter": dynamic(
    () =>
      import("@/components/tools/unit-converter").then(
        (mod) => mod.UnitConverterTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  encoder: dynamic(
    () => import("@/components/tools/encoder").then((mod) => mod.EncoderTool),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "image-tracer": dynamic(
    () =>
      import("@/components/tools/image-tracer").then(
        (mod) => mod.ImageTracerTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "guillotine-director": dynamic(
    () =>
      import("@/components/tools/guillotine-director").then(
        (mod) => mod.GuillotineDirectorTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "pdf-preflight": dynamic(
    () =>
      import("@/components/tools/pdf-preflight").then(
        (mod) => mod.PdfPreflightTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  "shavian-transliterator": dynamic(
    () =>
      import("@/components/tools/shavian-transliterator").then(
        (mod) => mod.ShavianTransliteratorTool,
      ),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
  imposer: dynamic(
    () => import("@/components/tools/imposer").then((mod) => mod.ImposerTool),
    { ssr: false, loading: () => <LoadingTool /> },
  ),
};

export default function ToolRenderer({ toolId }: { toolId: string }) {
  const ToolComponent = toolComponents[toolId];
  const { addRecentTool } = useRecentTools();

  useEffect(() => {
    if (toolId) {
      const tool = getToolById(toolId);
      if (tool) {
        addRecentTool({
          id: tool.id,
          name: tool.name,
          route: tool.href,
          icon: tool.icon as string
        });
      }
    }
  }, [toolId, addRecentTool]);

  if (!ToolComponent) {
    return (
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
              This tool is currently under construction. Check back soon for the
              full implementation.
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
    );
  }

  return <ToolComponent />;
}
