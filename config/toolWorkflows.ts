export const TOOL_WORKFLOWS: Record<string, string[]> = {
  // Image editing pipeline
  "social-cropper": ["background-remover", "transparent-png-generator"],
  "background-remover": ["image-converter", "scroll-generator", "watermarker"],
  "transparent-png-generator": ["image-converter", "watermarker"],
  "image-converter": ["favicon-generator", "svg-optimiser"],
  "image-tracer": ["svg-optimiser", "artwork-enhancer"],
  "favicon-generator": ["meta-tag-generator"],

  // Text & Content pipeline
  "markdown-writer": ["word-counter", "seo-content-length-checker"],
  "word-counter": ["reading-time-calculator", "character-count-online"],
  "seo-content-length-checker": ["meta-tag-generator"],
  "character-count-online": ["word-counter", "bulk-character-count-pro"],
  
  // Design & Typography
  "palette-generator": ["tailwind-shades", "harmony-generator"],
  "colour-converter": ["tailwind-color-converter", "hex-to-rgb"],
  "tailwind-shades": ["tailwind-cheatsheet", "contrast-checker"],
  "px-to-rem": ["line-height-calc", "typo-calc"],
  
  // Developer
  "regex-tester": ["encoder", "base-converter"],
  "encoder": ["base-converter"],
  
  // Logic
  "base-converter": ["sci-calc", "time-calc"]
};
