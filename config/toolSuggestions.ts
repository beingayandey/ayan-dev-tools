export const TOOL_SUGGESTIONS: Record<string, string[]> = {
  // Images & Assets Chaining
  "image-converter": ["background-remover", "image-splitter", "favicon-generator"],
  "background-remover": ["transparent-png-generator", "image-converter", "social-cropper"],
  "transparent-png-generator": ["background-remover", "image-converter", "matte-generator"],
  "e-commerce-bg-remover": ["transparent-png-generator", "social-cropper", "image-converter"],
  "favicon-generator": ["image-converter", "svg-optimiser", "meta-tag-generator"],
  "social-cropper": ["matte-generator", "scroll-generator", "watermarker"],
  "scroll-generator": ["social-cropper", "matte-generator", "watermarker"],
  "watermarker": ["social-cropper", "image-converter", "transparent-png-generator"],
  "image-tracer": ["svg-optimiser", "artwork-enhancer", "favicon-generator"],
  
  // Design & Colour
  "palette-generator": ["harmony-generator", "tailwind-shades", "palette-collection"],
  "harmony-generator": ["palette-generator", "colour-converter", "tailwind-shades"],
  "tailwind-shades": ["tailwind-color-converter", "palette-generator", "colour-converter"],
  "colour-converter": ["hex-to-rgb", "hex-to-hsl", "color-converter-css"],
  "hex-to-rgb": ["rgb-to-hex", "hex-to-hsl", "colour-converter"],
  "rgb-to-hex": ["hex-to-rgb", "colour-converter", "tailwind-color-converter"],
  "tailwind-color-converter": ["tailwind-shades", "colour-converter", "tailwind-cheatsheet"],
  "contrast-checker": ["colorblind-sim", "palette-generator", "colour-converter"],

  // Text & Typography
  "word-counter": ["character-count-online", "reading-time-calculator", "seo-content-length-checker"],
  "seo-content-length-checker": ["meta-tag-generator", "word-counter", "reading-time-calculator"],
  "character-count-online": ["word-counter", "social-cropper", "bulk-character-count-pro"],
  "px-to-rem": ["line-height-calc", "typo-calc", "tailwind-cheatsheet"],
  "font-explorer": ["glyph-browser", "px-to-rem", "typo-calc"],
  
  // Developer Utils
  "regex-tester": ["encoder", "markdown-writer", "base-converter"],
  "encoder": ["base-converter", "regex-tester", "unit-converter"],
  "markdown-writer": ["word-counter", "seo-content-length-checker", "meta-tag-generator"],
  "meta-tag-generator": ["favicon-generator", "seo-content-length-checker", "social-cropper"],
  
  // Calculators
  "sci-calc": ["graph-calc", "algebra-calc", "unit-converter"],
  "base-converter": ["encoder", "sci-calc", "time-calc"],
  "unit-converter": ["time-calc", "px-to-rem", "sci-calc"],

  // Print & Production
  "pdf-preflight": ["imposer", "zine-imposer", "guillotine-director"],
  "zine-imposer": ["imposer", "pdf-preflight", "guillotine-director"],
  "guillotine-director": ["imposer", "zine-imposer", "paper-sizes"]
};
