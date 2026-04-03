export interface ToolCrossLink {
  hook: string;
  links: string[];
}

export const TOOL_CROSS_LINKS: Record<string, ToolCrossLink> = {
  // Image & Design
  "image-converter": {
    hook: "Converted your image?",
    links: ["background-remover", "transparent-png-generator", "image-splitter"]
  },
  "background-remover": {
    hook: "Background removed?",
    links: ["social-cropper", "image-converter", "watermarker"]
  },
  "social-cropper": {
    hook: "Finished cropping?",
    links: ["watermarker", "matte-generator", "background-remover"]
  },
  "favicon-generator": {
    hook: "Got your favicon?",
    links: ["meta-tag-generator", "svg-optimiser", "image-tracer"]
  },
  
  // Dev & Text
  "word-counter": {
    hook: "Checked your word count?",
    links: ["character-count-online", "reading-time-calculator", "seo-content-length-checker"]
  },
  "markdown-writer": {
    hook: "Written your markdown?",
    links: ["word-counter", "meta-tag-generator", "regex-tester"]
  },
  "regex-tester": {
    hook: "Tested your Regex?",
    links: ["encoder", "base-converter"]
  },

  // Color & Formatting
  "palette-generator": {
    hook: "Built your palette?",
    links: ["tailwind-shades", "harmony-generator", "colour-converter"]
  },
  "colour-converter": {
    hook: "Converted your colors?",
    links: ["hex-to-rgb", "hex-to-hsl", "tailwind-color-converter"]
  },
  "px-to-rem": {
    hook: "Calculated your REM?",
    links: ["line-height-calc", "typo-calc", "tailwind-cheatsheet"]
  },

  // Production Tools
  "qr-generator": {
    hook: "Generated your QR?",
    links: ["social-cropper", "word-counter", "word-counter"] // Intentionally chaining to relatable utilities
  },
  "pdf-preflight": {
    hook: "Checked your PDF?",
    links: ["imposer", "zine-imposer", "guillotine-director"]
  }
};
