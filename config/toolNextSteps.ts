export interface NextStep {
  toolId: string;
  label: string;
  recommended?: boolean;
}

export const TOOL_NEXT_STEPS: Record<string, NextStep[]> = {
  // Image & Assets
  "image-converter": [
    { toolId: "background-remover", label: "Remove Background" },
    { toolId: "image-resizer", label: "Resize Image", recommended: true },
    { toolId: "image-compressor", label: "Compress" }
  ],
  "background-remover": [
    { toolId: "transparent-png-generator", label: "Make PNG", recommended: true },
    { toolId: "social-cropper", label: "Crop for Social" },
    { toolId: "watermarker", label: "Add Watermark" }
  ],
  "social-cropper": [
    { toolId: "matte-generator", label: "Add Borders", recommended: true },
    { toolId: "scroll-generator", label: "Create Carousel" },
    { toolId: "watermarker", label: "Add Watermark" }
  ],
  "matte-generator": [
    { toolId: "social-cropper", label: "Crop" },
    { toolId: "image-converter", label: "Convert Format" },
    { toolId: "favicon-generator", label: "Create Favicon" }
  ],
  "scroll-generator": [
    { toolId: "social-cropper", label: "Adjust Crop" },
    { toolId: "matte-generator", label: "Add Borders" },
    { toolId: "image-converter", label: "Convert" }
  ],
  "watermarker": [
    { toolId: "social-cropper", label: "Crop" },
    { toolId: "image-converter", label: "Convert Format" },
    { toolId: "background-remover", label: "Remove BG" }
  ],
  "image-splitter": [
    { toolId: "scroll-generator", label: "Create Carousel" },
    { toolId: "image-converter", label: "Convert" },
    { toolId: "matte-generator", label: "Add Borders" }
  ],
  "favicon-generator": [
    { toolId: "meta-tag-generator", label: "Generate Meta Tags", recommended: true },
    { toolId: "svg-optimiser", label: "Optimize SVG" },
    { toolId: "image-tracer", label: "Trace to Vector" }
  ],
  "image-tracer": [
    { toolId: "svg-optimiser", label: "Optimize SVG", recommended: true },
    { toolId: "artwork-enhancer", label: "Add Grain" },
    { toolId: "favicon-generator", label: "Create Favicon" }
  ],
  "artwork-enhancer": [
    { toolId: "image-converter", label: "Convert" },
    { toolId: "watermarker", label: "Add Watermark" },
    { toolId: "social-cropper", label: "Crop" }
  ],
  "svg-optimiser": [
    { toolId: "image-tracer", label: "Trace Image" },
    { toolId: "favicon-generator", label: "Create Favicon" },
    { toolId: "image-converter", label: "Convert" }
  ],

  // Colour & Design
  "palette-generator": [
    { toolId: "harmony-generator", label: "Find Harmonies", recommended: true },
    { toolId: "tailwind-shades", label: "Generate Shades" },
    { toolId: "contrast-checker", label: "Check Contrast" }
  ],
  "harmony-generator": [
    { toolId: "palette-generator", label: "Build Palette" },
    { toolId: "tailwind-shades", label: "Create Shades" },
    { toolId: "colour-converter", label: "Convert Format" }
  ],
  "tailwind-shades": [
    { toolId: "tailwind-color-converter", label: "CSS Variables", recommended: true },
    { toolId: "palette-generator", label: "Full Palette" },
    { toolId: "contrast-checker", label: "Check Accessibility" }
  ],
  "tailwind-color-converter": [
    { toolId: "tailwind-shades", label: "Generate Shades" },
    { toolId: "tailwind-cheatsheet", label: "View Classes" },
    { toolId: "palette-generator", label: "Build Palette" }
  ],
  "colour-converter": [
    { toolId: "hex-to-rgb", label: "HEX to RGB" },
    { toolId: "hex-to-hsl", label: "HEX to HSL" },
    { toolId: "contrast-checker", label: "Check Contrast" }
  ],
  "hex-to-rgb": [
    { toolId: "rgb-to-hex", label: "RGB to HEX" },
    { toolId: "hex-to-hsl", label: "RGB to HSL" },
    { toolId: "tailwind-color-converter", label: "Tailwind CSS" }
  ],
  "rgb-to-hex": [
    { toolId: "hex-to-rgb", label: "HEX to RGB" },
    { toolId: "colour-converter", label: "All Formats" },
    { toolId: "contrast-checker", label: "Check Contrast" }
  ],
  "hex-to-hsl": [
    { toolId: "hex-to-rgb", label: "HSL to RGB" },
    { toolId: "colour-converter", label: "All Formats" },
    { toolId: "harmony-generator", label: "Generate Harmony" }
  ],
  "contrast-checker": [
    { toolId: "colorblind-sim", label: "Simulate Colorblind", recommended: true },
    { toolId: "palette-generator", label: "Adjust Colors" },
    { toolId: "tailwind-shades", label: "Get Shades" }
  ],
  "colorblind-sim": [
    { toolId: "contrast-checker", label: "Check Contrast", recommended: true },
    { toolId: "palette-generator", label: "Adjust Palette" },
    { toolId: "colour-converter", label: "Convert Colors" }
  ],
  "gradient-generator": [
    { toolId: "palette-generator", label: "Extract Colors" },
    { toolId: "tailwind-shades", label: "Tailwind Shades" },
    { toolId: "css-generator", label: "Get CSS" }
  ],

  // Text & Typography
  "word-counter": [
    { toolId: "reading-time-calculator", label: "Reading Time", recommended: true },
    { toolId: "seo-content-length-checker", label: "SEO Check" },
    { toolId: "markdown-writer", label: "Edit Markdown" }
  ],
  "reading-time-calculator": [
    { toolId: "word-counter", label: "Count Words" },
    { toolId: "seo-content-length-checker", label: "SEO Check" },
    { toolId: "markdown-writer", label: "Write Content" }
  ],
  "seo-content-length-checker": [
    { toolId: "meta-tag-generator", label: "Generate Meta Tags", recommended: true },
    { toolId: "word-counter", label: "Count Words" },
    { toolId: "reading-time-calculator", label: "Reading Time" }
  ],
  "markdown-writer": [
    { toolId: "word-counter", label: "Count Words", recommended: true },
    { toolId: "meta-tag-generator", label: "Meta Tags" },
    { toolId: "regex-tester", label: "Test Patterns" }
  ],
  "regex-tester": [
    { toolId: "encoder", label: "Encode Text", recommended: true },
    { toolId: "markdown-writer", label: "Write Content" },
    { toolId: "base-converter", label: "Convert Base" }
  ],
  "px-to-rem": [
    { toolId: "line-height-calc", label: "Line Height", recommended: true },
    { toolId: "typo-calc", label: "Typography Units" },
    { toolId: "tailwind-cheatsheet", label: "Tailwind Classes" }
  ],
  "line-height-calc": [
    { toolId: "px-to-rem", label: "PX to REM" },
    { toolId: "typo-calc", label: "Typography" },
    { toolId: "tailwind-cheatsheet", label: "CSS Classes" }
  ],
  "typo-calc": [
    { toolId: "px-to-rem", label: "PX/REM" },
    { toolId: "line-height-calc", label: "Line Height" },
    { toolId: "paper-sizes", label: "Paper Sizes" }
  ],
  "font-explorer": [
    { toolId: "glyph-browser", label: "Browse Glyphs", recommended: true },
    { toolId: "typo-calc", label: "Typography" },
    { toolId: "px-to-rem", label: "PX to REM" }
  ],
  "glyph-browser": [
    { toolId: "font-explorer", label: "Explore Fonts" },
    { toolId: "markdown-writer", label: "Write Content" },
    { toolId: "svg-optimiser", label: "Optimize SVG" }
  ],

  // Developer Utils
  "encoder": [
    { toolId: "base-converter", label: "Convert Base", recommended: true },
    { toolId: "regex-tester", label: "Test Patterns" },
    { toolId: "unit-converter", label: "Unit Converter" }
  ],
  "base-converter": [
    { toolId: "encoder", label: "Encode/Decode" },
    { toolId: "sci-calc", label: "Scientific Calc" },
    { toolId: "time-calc", label: "Time Calc" }
  ],
  "meta-tag-generator": [
    { toolId: "favicon-generator", label: "Create Favicon", recommended: true },
    { toolId: "seo-content-length-checker", label: "SEO Check" },
    { toolId: "social-cropper", label: "Social Images" }
  ],

  // Calculators
  "sci-calc": [
    { toolId: "graph-calc", label: "Graph Functions", recommended: true },
    { toolId: "algebra-calc", label: "Algebra Solver" },
    { toolId: "unit-converter", label: "Unit Converter" }
  ],
  "graph-calc": [
    { toolId: "sci-calc", label: "Scientific Calc" },
    { toolId: "algebra-calc", label: "Algebra" },
    { toolId: "time-calc", label: "Time Calc" }
  ],
  "algebra-calc": [
    { toolId: "graph-calc", label: "Visualize" },
    { toolId: "sci-calc", label: "Scientific Calc" },
    { toolId: "base-converter", label: "Base Converter" }
  ],
  "unit-converter": [
    { toolId: "time-calc", label: "Time Calculator" },
    { toolId: "px-to-rem", label: "PX to REM" },
    { toolId: "sci-calc", label: "Scientific Calc" }
  ],
  "time-calc": [
    { toolId: "unit-converter", label: "Unit Converter" },
    { toolId: "sci-calc", label: "Scientific Calc" },
    { toolId: "base-converter", label: "Base Converter" }
  ],

  // Print & Production
  "pdf-preflight": [
    { toolId: "imposer", label: "Impose Pages", recommended: true },
    { toolId: "zine-imposer", label: "Zine Layout" },
    { toolId: "guillotine-director", label: "Cutting Guide" }
  ],
  "imposer": [
    { toolId: "pdf-preflight", label: "Preflight Check" },
    { toolId: "zine-imposer", label: "Zine Layout" },
    { toolId: "paper-sizes", label: "Paper Sizes" }
  ],
  "zine-imposer": [
    { toolId: "imposer", label: "Full Imposition" },
    { toolId: "pdf-preflight", label: "Preflight" },
    { toolId: "guillotine-director", label: "Cutting Guide" }
  ],
  "guillotine-director": [
    { toolId: "imposer", label: "Impose Pages" },
    { toolId: "zine-imposer", label: "Zine Layout" },
    { toolId: "paper-sizes", label: "Paper Sizes" }
  ],
  "paper-sizes": [
    { toolId: "imposer", label: "Impose Pages" },
    { toolId: "pdf-preflight", label: "Preflight Check" },
    { toolId: "typo-calc", label: "Typography" }
  ]
};

export function getNextSteps(toolId: string): NextStep[] {
  return TOOL_NEXT_STEPS[toolId] || [];
}

export function getRecommendedNextStep(toolId: string): NextStep | null {
  const steps = getNextSteps(toolId);
  return steps.find(s => s.recommended) || steps[0] || null;
}
