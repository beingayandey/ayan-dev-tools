import { IconName } from "./icon-map";

export interface ToolSEO {
  slug: string;
  seo: {
    title: string;
    metaDesc: string;
    keywords: string[];
    hook: string;
    structuredData?: Record<string, any>;
  };
  content: {
    intro: string;
    whatItDoes: string;
    whyUseIt: string[];
    howToUse: string[];
    faqs: { question: string; answer: string }[];
  };
  internalLinks: string[];
  // Metadata for SEO page generation
  hero?: {
    title: string;
    subtitle: string;
  };
  // Legacy fields for backward compatibility during migration if needed
  queryVariants?: string[];
  useCases?: string[];
  comparison?: string;
}

export interface CategorySEO {
  title: string;
  metaDesc: string;
  keywords: string[];
  intro: string;
  comparison: string;
  useCases: string[];
  faqs: { question: string; answer: string }[];
  structuredData: Record<string, any>;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  icon: IconName;
  href: string;
  beta?: boolean;
  new?: boolean;
  seo?: ToolSEO;
}

export interface ToolCategory {
  id: string;
  name: string;
  icon?: IconName;
  tools: Tool[];
  seo?: CategorySEO;
}

export const toolCategories: ToolCategory[] = [
  {
    id: "social-media",
    name: "Social Media",
    tools: [
      {
        id: "social-cropper",
        name: "Social Cropper",
        description: "Simple, exact cropping for social media.",
        longDescription: "Crop images using exact aspect ratios for platforms like Instagram, TikTok, and LinkedIn with live preview guides.",
        icon: "crop",
        href: "/tools/social-cropper",
      },
      {
        id: "matte-generator",
        name: "Matte Generator",
        description: "Add borders to keep original photo dimensions on any platform.",
        longDescription: "Add space around your images instead of cropping them to fit social media squares.",
        icon: "square",
        href: "/tools/matte-generator",
      },
      {
        id: "scroll-generator",
        name: "Carousel Splitter",
        description: "Split images into seamless carousel slides.",
        longDescription: "Divide wide panoramas into evenly aligned segments that flow perfectly when swiping on Instagram.",
        icon: "galleryVertical",
        href: "/tools/scroll-generator",
      },
      {
        id: "watermarker",
        name: "Watermarker",
        description: "Add custom watermarks to your images locally.",
        longDescription: "Apply text or logo overlays to protect your assets before sharing. Everything happens in your browser.",
        icon: "stamp",
        href: "/tools/watermarker",
      },
    ],
  },
  {
    id: "colour",
    name: "Colour",
    tools: [
      {
        id: "colour-converter",
        name: "Color Converter",
        description: "Convert between color formats instantly.",
        longDescription: "Translate values between HEX, RGB, HSL, and CMYK with precise channel mapping.",
        icon: "pipette",
        href: "/tools/colour-converter",
      },
      {
        id: "hex-to-rgb",
        name: "HEX to RGB",
        description: "Convert hex codes to RGB instantly.",
        icon: "pipette",
        href: "/tools/hex-to-rgb",
      },
      {
        id: "rgb-to-hex",
        name: "RGB to HEX",
        description: "Turn RGB into clean hex codes.",
        icon: "pipette",
        href: "/tools/rgb-to-hex",
      },
      {
        id: "hex-to-hsl",
        name: "HEX to HSL",
        description: "Get HSL values for better color logic.",
        icon: "pipette",
        href: "/tools/hex-to-hsl",
      },
      {
        id: "color-converter-css",
        name: "CSS Color Converter",
        description: "Universal swapper for all CSS color formats.",
        icon: "pipette",
        href: "/tools/color-converter-css",
      },
      {
        id: "tailwind-color-converter",
        name: "Tailwind Color Converter",
        description: "Generate Tailwind config blocks from hex.",
        icon: "pipette",
        href: "/tools/tailwind-color-converter",
      },
      {
        id: "tailwind-shades",
        name: "Tailwind Shade Scale",
        description: "Build consistent color scales for your projects.",
        longDescription: "Generate a full 50–950 shade range from a base HEX value, aligned with Tailwind's naming system.",
        icon: "palette",
        href: "/tools/tailwind-shades",
      },
      {
        id: "harmony-generator",
        name: "Harmony Generator",
        description: "Find matching colors based on color theory.",
        longDescription: "Generate complementary, analogous, and triadic color schemes instantly from any base color.",
        icon: "rainbow",
        href: "/tools/harmony-generator",
      },
      {
        id: "palette-generator",
        name: "Palette Generator",
        description: "Create custom color palettes for your designs.",
        longDescription: "Build cohesive color schemes with primary, secondary, and accent tones that work together.",
        icon: "penLine",
        href: "/tools/palette-generator",
      },
      {
        id: "palette-collection",
        name: "Palettes",
        description: "Browse curated color themes ready for use.",
        longDescription: "A collection of ready-made color palettes designed for UI and web interfaces.",
        icon: "library",
        href: "/tools/palette-collection",
      },
      {
        id: "contrast-checker",
        name: "Contrast Checker",
        description: "Check color contrast for accessibility.",
        longDescription: "Calculate contrast ratios between text and background colors based on WCAG standards.",
        icon: "contrast",
        href: "/tools/contrast-checker",
      },
      {
        id: "colorblind-sim",
        name: "Colorblind Sim",
        description: "Simulate colorblindness to test your designs.",
        longDescription: "See how your design appears to users with different types of color vision deficiencies.",
        icon: "eye",
        href: "/tools/colorblind-sim",
      },
      {
        id: "gradient-generator",
        name: "Gradient Generator",
        description: "Create CSS gradients for backgrounds and UI.",
        longDescription: "Build and customize linear, radial, and multi-color gradients with ready-to-use CSS code.",
        icon: "blend",
        href: "/tools/gradient-generator",
        new: true,
      },
    ],
  },
  {
    id: "img-assets",
    name: "Images & Assets",
    tools: [
      {
        id: "favicon-generator",
        name: "Favicon Generator",
        description: "Generate favicons in all required sizes.",
        longDescription: "Create favicon files in multiple sizes and formats (ICO, PNG) from a single image input.",
        icon: "image",
        href: "/tools/favicon-generator",
      },
      {
        id: "svg-optimiser",
        name: "SVG Optimizer",
        description: "Optimize SVG files by removing junk code.",
        longDescription: "Remove unnecessary metadata and clean SVG markup while keeping the visuals unchanged.",
        icon: "fileImage",
        href: "/tools/svg-optimiser",
      },
      {
        id: "placeholder-generator",
        name: "Placeholder Generator",
        description: "Generate placeholder images for wireframes.",
        longDescription: "Quickly create customizable dummy blocks for UI layouts and wireframes.",
        icon: "layoutGrid",
        href: "/tools/placeholder-generator",
      },
      {
        id: "image-splitter",
        name: "Image Splitter",
        description: "Split images into a grid of tiles.",
        longDescription: "Segment large images into specific grid patches for game development or custom layouts.",
        icon: "scissors",
        href: "/tools/image-splitter",
      },
      {
        id: "image-converter",
        name: "Image Converter",
        description: "Convert images to different formats locally.",
        longDescription: "Batch process and convert images between different formats directly in your browser.",
        icon: "refreshCw",
        href: "/tools/image-converter",
      },
      {
        id: "artwork-enhancer",
        name: "Grain Adder",
        description: "Add subtle grain to your designs.",
        longDescription: "Apply noise textures to flat vectors to give them a modern, tactile feel.",
        icon: "sparkles",
        href: "/tools/artwork-enhancer",
      },
      {
        id: "background-remover",
        name: "Background Remover",
        description: "Remove backgrounds from images locally.",
        longDescription: "Isolate subjects from their backgrounds using client-side AI processing.",
        icon: "eraser",
        href: "/tools/background-remover",
        beta: true,
      },
      {
        id: "transparent-png-generator",
        name: "PNG Generator",
        description: "Instant transparent cutouts.",
        icon: "eraser",
        href: "/tools/transparent-png-generator",
      },
      {
        id: "e-commerce-bg-remover",
        name: "E-comm BG Remover",
        description: "Clean product shots for sellers.",
        icon: "eraser",
        href: "/tools/e-commerce-bg-remover",
      },
      {
        id: "hd-background-remover",
        name: "HD BG Remover",
        description: "High-res cutouts without loss.",
        icon: "eraser",
        href: "/tools/hd-background-remover",
      },
      {
        id: "privacy-bg-remover",
        name: "Private BG Remover",
        description: "100% local, secure processing.",
        icon: "eraser",
        href: "/tools/privacy-bg-remover",
      },
      {
        id: "instant-cutout-tool",
        name: "Instant Cutout",
        description: "Fastest background removal.",
        icon: "eraser",
        href: "/tools/instant-cutout-tool",
      },
      {
        id: "designer-bg-remover",
        name: "Designer BG Remover",
        description: "Pro-grade masking for creatives.",
        icon: "eraser",
        href: "/tools/designer-bg-remover",
      },
      {
        id: "image-tracer",
        name: "Image Tracer",
        description: "Trace raster images into SVGs.",
        longDescription: "Convert pixel-based images (JPG, PNG) into scalable vector paths (SVG).",
        icon: "scanLine",
        href: "/tools/image-tracer",
        new: true,
      },
    ],
  },
  {
    id: "typo-text",
    name: "Typography & Text",
    tools: [
      {
        id: "px-to-rem",
        name: "PX to REM",
        description: "Convert pixels to rem units.",
        longDescription: "Translate absolute pixel values into relative REM units based on a base font size.",
        icon: "ruler",
        href: "/tools/px-to-rem",
      },
      {
        id: "line-height-calc",
        name: "Line Height Calc",
        description: "Calculate ideal line heights for text.",
        longDescription: "Find the optimal line height for your typography based on font size and container width.",
        icon: "type",
        href: "/tools/line-height-calc",
      },
      {
        id: "typo-calc",
        name: "Typo Converter",
        description: "Convert typography units like picas and points.",
        longDescription: "Map measurements between digital (px, rem) and print (points, picas, inches) standards.",
        icon: "hash",
        href: "/tools/typo-calc",
      },
      {
        id: "paper-sizes",
        name: "Paper Sizes",
        description: "Reference for standard paper sizes.",
        longDescription: "Quick lookup for ISO (A4, A3, etc.) and US (Letter, Legal, etc.) physical dimensions.",
        icon: "fileText",
        href: "/tools/paper-sizes",
      },
      {
        id: "word-counter",
        name: "Word Counter",
        description: "Count words and characters in your text.",
        longDescription: "Detailed text analytics including word count, character count, and estimated reading time.",
        icon: "bookOpen",
        href: "/tools/word-counter",
      },
      {
        id: "character-count-online",
        name: "Character Counter",
        description: "Exact character limits for social media.",
        icon: "bookOpen",
        href: "/tools/character-count-online",
      },
      {
        id: "essay-word-counter",
        name: "Essay Word Counter",
        description: "Secure tool for academic assignments.",
        icon: "bookOpen",
        href: "/tools/essay-word-counter",
      },
      {
        id: "secure-text-analyzer",
        name: "Secure Text Analyzer",
        description: "100% private document audit.",
        icon: "bookOpen",
        href: "/tools/secure-text-analyzer",
      },
      {
        id: "seo-content-length-checker",
        name: "SEO Length Checker",
        description: "Optimize content for Google rankings.",
        icon: "bookOpen",
        href: "/tools/seo-content-length-checker",
      },
      {
        id: "reading-time-calculator",
        name: "Reading Time Calc",
        description: "Estimate time to read for UX.",
        icon: "bookOpen",
        href: "/tools/reading-time-calculator",
      },
      {
        id: "bulk-character-count-pro",
        name: "Bulk Content Pro",
        description: "High-speed processing for developers.",
        icon: "bookOpen",
        href: "/tools/bulk-character-count-pro",
      },
      {
        id: "glyph-browser",
        name: "Unicode Symbols",
        description: "Browse and copy unicode characters.",
        longDescription: "Find and copy thousands of special characters, symbols, and icons for your projects.",
        icon: "type",
        href: "/tools/glyph-browser",
      },
      {
        id: "font-explorer",
        name: "Font Explorer",
        description: "Inspect font file metadata and glyphs.",
        longDescription: "Upload a font file (TTF, OTF) to view its metadata, character set, and internal tables.",
        icon: "fileType",
        href: "/tools/font-explorer",
      },
    ],
  },
  {
    id: "print-production",
    name: "Print & Production",
    tools: [
      {
        id: "pdf-preflight",
        name: "PDF Preflight",
        description: "Check PDF files for common print issues.",
        longDescription: "Audit PDF files for missing fonts, low-res images, and color profile issues before printing.",
        icon: "fileSearch",
        href: "/tools/pdf-preflight",
        new: true,
      },
      {
        id: "guillotine-director",
        name: "Finishing Assistant",
        description: "Calculate cutting paths for finishers.",
        longDescription: "Generate step-by-step cutting instructions for physical print finishing.",
        icon: "slice",
        href: "/tools/guillotine-director",
        new: true,
      },
      {
        id: "zine-imposer",
        name: "Zine Imposer",
        description: "Create layouts for zines and booklets.",
        longDescription: "Automatically arrange pages to create physical 8-page mini booklets from a single sheet.",
        icon: "bookOpen",
        href: "/tools/zine-imposer",
      },
      {
        id: "imposer",
        name: "Print Imposer",
        description: "Arrange pages for professional printing.",
        longDescription: "Collate and arrange pages for saddle-stitched bindings and larger print runs.",
        icon: "layers",
        href: "/tools/imposer",
        new: true,
      },
    ],
  },
  {
    id: "other-tools",
    name: "Other Tools",
    tools: [
      {
        id: "markdown-writer",
        name: "Markdown Editor",
        description: "Simple markdown editor for quick notes.",
        longDescription: "A distraction-free canvas for drafting and previewing markdown text.",
        icon: "penLine",
        href: "/tools/markdown-writer",
      },
      {
        id: "tailwind-cheatsheet",
        name: "Tailwind Cheat Sheet",
        description: "Quick reference for Tailwind CSS classes.",
        longDescription: "Searchable index of all Tailwind CSS utility classes and properties.",
        icon: "bookOpen",
        href: "/tools/tailwind-cheatsheet",
      },
      {
        id: "qr-generator",
        name: "QR Generator",
        description: "Generate custom QR codes.",
        longDescription: "Create custom QR codes with adjustable colors and embedded logos.",
        icon: "qrCode",
        href: "/tools/qr-generator",
      },
      {
        id: "code-generator",
        name: "Barcode Generator",
        description: "Generate barcodes for inventory and logistics.",
        longDescription: "Support for UPC, Code 128, and other industrial barcode standards.",
        icon: "barcode",
        href: "/tools/code-generator",
      },
      {
        id: "meta-tag-generator",
        name: "Meta Tag Generator",
        description: "Generate meta tags for SEO.",
        longDescription: "Create social preview and SEO meta tags for your website's <head>.",
        icon: "tag",
        href: "/tools/meta-tag-generator",
      },
      {
        id: "regex-tester",
        name: "Regex Tester",
        description: "Test regular expressions instantly.",
        longDescription: "Debug and test regex patterns against sample data with real-time feedback.",
        icon: "regex",
        href: "/tools/regex-tester",
      },
    ],
  },
  {
    id: "calculators",
    name: "Calculators",
    tools: [
      {
        id: "sci-calc",
        name: "Scientific Calculator",
        description: "A clean, functional scientific calculator.",
        longDescription: "Perform advanced calculations including trigonometry, logarithms, and more.",
        icon: "calculator",
        href: "/tools/sci-calc",
      },
      {
        id: "graph-calc",
        name: "Graphing Calculator",
        description: "Plot and visualize mathematical functions.",
        longDescription: "Render equations as interactive graphs to visualize mathematical relationships.",
        icon: "lineChart",
        href: "/tools/graph-calc",
      },
      {
        id: "algebra-calc",
        name: "Algebra Solver",
        description: "Solve algebraic equations in the browser.",
        longDescription: "Factor polynomials, solve for variables, and simplify complex expressions.",
        icon: "variable",
        href: "/tools/algebra-calc",
      },
      {
        id: "base-converter",
        name: "Base Converter",
        description: "Convert numbers between different bases.",
        longDescription: "Quickly switch between binary, octal, decimal, and hexadecimal representations.",
        icon: "binary",
        href: "/tools/base-converter",
      },
      {
        id: "time-calc",
        name: "Time Calculator",
        description: "Calculate time differences and durations.",
        longDescription: "Add or subtract time, and calculate the exact duration between two dates or timestamps.",
        icon: "clock",
        href: "/tools/time-calc",
      },
      {
        id: "unit-converter",
        name: "Unit Converter",
        description: "Convert between different units of measurement.",
        longDescription: "Quickly convert between metric and imperial units for length, weight, volume, and more.",
        icon: "scale",
        href: "/tools/unit-converter",
      },
    ],
  },
  {
    id: "dev-utils",
    name: "Developer Utils",
    tools: [
      {
        id: "encoder",
        name: "Text Encoder",
        description: "Encode and decode text in various formats.",
        longDescription: "Safely encode text to Base64, URL-safe strings, and other common formats.",
        icon: "fileCode",
        href: "/tools/encoder",
      },
      {
        id: "shavian-transliterator",
        name: "Shavian Transliterator",
        description: "Transliterate text into the Shavian alphabet.",
        longDescription: "Convert standard English text into the phonetically consistent Shavian script.",
        icon: "languages",
        href: "/tools/shavian-transliterator",
        new: true,
      },
    ],
  },
];

export const allTools = toolCategories.flatMap((category) => category.tools);

// Featured tools
export const featuredToolIds = ["qr-generator", "palette-generator", "background-remover"];
export const featuredTools = featuredToolIds
  .map((id) => allTools.find((tool) => tool.id === id))
  .filter((tool): tool is Tool => tool !== undefined);

export function getToolById(id: string): Tool | undefined {
  return allTools.find((tool) => tool.id === id);
}

export function getCategoryByToolId(id: string): ToolCategory | undefined {
  return toolCategories.find((category) =>
    category.tools.some((tool) => tool.id === id)
  );
}

import { manualSeoData } from "./seo-data";
import { categorySeoData } from "./category-seo-data";

const totalToolsCount = allTools.length;

// Fallback SEO Generator to power the dynamic SSR pages before manual SEO is written
export function getToolSEO(tool: Tool): ToolSEO {
  // If the data is explicitly defined on the tool object (future proofing)
  if (tool.seo) return tool.seo;
  
  // If we have hand-written copy for this tool in the manual dictionary
  const manual = manualSeoData[tool.id] as any;

  // Fallback defaults emphasizing the local/no-upload advantage
  const fallbackHook = manual?.hook || manual?.seo?.hook || `Clean, local processing for ${tool.name}. Part of a suite of +${totalToolsCount} free tools built for speed and privacy.`;
  const fallbackIntro = manual?.intro || manual?.content?.intro || `Nothing is uploaded to a server. This tool runs entirely in your browser, keeping your data secure and 100% private.`;
  const fallbackWhatItDoes = manual?.whatItDoes || manual?.content?.whatItDoes || tool.longDescription || tool.description;
  
  const replaceCount = (str: string) => str.replace(/\{count\}/g, totalToolsCount.toString());

  const result: ToolSEO = {
    slug: manual?.slug || tool.id,
    seo: {
      title: replaceCount(manual?.title || manual?.seo?.title || `${tool.name} | Instant, Zero-Upload & Secure`),
      metaDesc: replaceCount(manual?.metaDesc || manual?.seo?.metaDesc || `No limits, no uploads. ${tool.description} Fast, local processing built for modern workflows.`),
      keywords: manual?.keywords || manual?.seo?.keywords || [tool.name.toLowerCase(), "free", "no upload", "fast", "local", "secure tool"],
      hook: replaceCount(fallbackHook),
      structuredData: manual?.structuredData || manual?.seo?.structuredData || {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    },
    content: {
      intro: replaceCount(fallbackIntro),
      whatItDoes: replaceCount(fallbackWhatItDoes),
      whyUseIt: (manual?.whyUseIt || manual?.content?.whyUseIt || [
        "100% Local processing - Your files never touch an external server.",
        "Blazing fast execution without upload bottlenecks or queue times.",
        "No premium paywalls or subscription traps."
      ]).map(replaceCount),
      howToUse: (manual?.howToUse || manual?.content?.howToUse || [
        "Open the tool directly in your browser.",
        "Interact with the secure, modern interface.",
        "Receive your processed output instantly."
      ]).map(replaceCount),
      faqs: (manual?.faqs || manual?.content?.faqs || [
        {
          question: `Are my files uploaded?`,
          answer: "No. All processing happens in your browser. Your data never leaves your machine."
        },
        {
          question: "Is this tool free?",
          answer: "Yes. It's completely free to use, no account needed."
        }
      ]).map((faq: { question: string; answer: string }) => ({
        question: replaceCount(faq.question),
        answer: replaceCount(faq.answer)
      }))
    },
    internalLinks: manual?.internalLinks || [],
    // Legacy support
    queryVariants: manual?.queryVariants || [],
    useCases: manual?.useCases || [],
    comparison: replaceCount(manual?.comparison || "Unlike cloud-based alternatives, this tool runs entirely locally for maximum speed and privacy.")
  };

  return result;
}

export function getCategoryById(id: string): ToolCategory | undefined {
  return toolCategories.find((cat) => cat.id === id);
}

export function getCategorySEO(category: ToolCategory): CategorySEO {
  if (category.seo) return category.seo;
  const manual = categorySeoData[category.id];

  return {
    title: manual?.title || `Free ${category.name} Tools | Secure & Local`,
    metaDesc: manual?.metaDesc || `A complete suite of ${category.name} tools for professional workflows. No uploads, total privacy, and blazing fast performance.`,
    keywords: manual?.keywords || [category.name.toLowerCase(), "free tools", "online utilities", "local processing"],
    intro: manual?.intro || `Building modern digital products requires a set of precision ${category.name.toLowerCase()} tools. We've aggregated the most important utilities into a single hub to keep your workflow fast and secure.`,
    comparison: manual?.comparison || "Unlike ad-heavy cloud alternatives, our tools process data entirely on your device for unmatched speed and privacy.",
    useCases: manual?.useCases || [
      "Optimizing professional creative workflows",
      "Drafting and testing cross-platform prototypes",
      "Handling sensitive data with 100% local processing"
    ],
    faqs: manual?.faqs || [
      {
        question: `Why choose our ${category.name} tools?`,
        answer: "Our tools are built for professionals who value speed and data privacy above all else."
      }
    ],
    structuredData: manual?.structuredData || {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": category.name,
      "description": `Categorized collection of ${category.name} tools.`
    }
  };
}
