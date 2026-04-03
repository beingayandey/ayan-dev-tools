import { CategorySEO } from "./tools";

export const categorySeoData: Record<string, Partial<CategorySEO>> = {
  "colour": {
    title: "Pro Color Tools for Designers | Palette Generators, Harmony & Contrast",
    metaDesc: "Master color theory with a suite of hex converters, Tailwind scale tools, and WCAG contrast checkers. 100% private and ad-free.",
    keywords: ["color tools for designers", "palette generator online", "tailwind color scale", "accessible color contrast"],
    intro: "Setting up a design system usually involves navigating a maze of disconnected color tools. I consolidated everything you need — from hex-to-rgb translations to accessible contrast auditing — into a single hub. No more jumping between different ad-heavy sites to build a simple palette.",
    comparison: "Unlike standalone generators that hide high-res formats behind paywalls, these tools provide full CSS, Tailwind, and JSON exports instantly from your browser's local memory.",
    useCases: [
      "Building production-ready Tailwind CSS themes from brand guidelines",
      "Auditing and correcting UI accessibility for WCAG compliance",
      "Synthesizing mathematically balanced color harmonies for new prototypes"
    ],
    faqs: [
      {
        question: "Why should I use these over a single palette site?",
        answer: "Most palette sites only focus on the 'aesthetic' part. I provide the 'engineering' part too — giving you the actual code scales and accessibility data required to ship a real product."
      },
      {
        question: "Is it easy to export these colors to CSS?",
        answer: "Yes. Every tool in this color suite is built with a 'copy-to-clipboard' first mentality, supporting CSS variables, Tailwind classes, and JSON objects."
      }
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Professional Color Tools",
      "description": "A suite of professional color tools for designers and frontend developers."
    }
  },
  
  "typo-text": {
    title: "Advanced Typography & Text Tools | Unit Converters & Analysis",
    metaDesc: "Scale your typography for the modern web. PX to REM converters, word counters, and line-height calculators built for secure, local processing.",
    keywords: ["typography tools", "text analyzer online", "pixel to rem converter", "content length checker"],
    intro: "Modern typography is about more than just picking a font. It’s about accessibility, performance, and precision. This hub provides the mission-critical calculators you need to build responsive, readable layouts.",
    comparison: "Generic text tools often track your input data; these tools are 100% client-side, making them the only safe choice for sensitive client drafts or secure code strings.",
    useCases: [
      "Translating static Figma layouts into fluid, REM-based CSS architectures",
      "Analyzing content density and reading times for SEO editorial calendars",
      "Extracting unique Unicode glyphs and entities for specialized web projects"
    ],
    faqs: [
      {
        question: "Why focus on REM units over PX?",
        answer: "REM scaling is the industry standard for responsive accessibility. Using these converters ensures your text scales correctly with the user's browser settings."
      },
      {
        question: "Can these tools handle long-form articles?",
        answer: "Absolutely. Because processing happens on your local device, this word counter and text tools can analyze massive documents without the latency of cloud-based competitors."
      }
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Advanced Typography & Text Tools",
      "description": "Tools for precise web typography and secure text analysis."
    }
  }
};
