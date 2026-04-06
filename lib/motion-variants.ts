// Motion presets for consistent micro-interactions across the app
// Usage: import { motionVariants } from "@/lib/motion-variants";

export const motionVariants = {
  // Button/Interactive element hover
  hover: {
    scale: 1.03,
    transition: { duration: 0.15, ease: "easeOut" }
  },

  // Button/Interactive element click (tap feedback)
  tap: {
    scale: 0.97,
    transition: { duration: 0.1, ease: "easeOut" }
  },

  // Fade in with slight upward movement
  fadeInUp: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25, ease: "easeOut" }
  },

  // Fade in with slight downward movement (for dropdowns)
  fadeInDown: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2, ease: "easeOut" }
  },

  // Slide in from left
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.25, ease: "easeOut" }
  },

  // Slide in from right
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.25, ease: "easeOut" }
  },

  // Scale pop (for success states)
  pop: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.15, ease: "easeOut" }
  },

  // Staggered list items
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.05
      }
    }
  },

  // List item fade in
  listItem: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2, ease: "easeOut" }
  },

  // Result appearance (for tool outputs)
  resultAppear: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.2, ease: "easeOut" }
  },

  // Glow pulse for focus states
  glowPulse: {
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(99, 102, 241, 0)",
        "0 0 0 6px rgba(99, 102, 241, 0.3)",
        "0 0 0 0 rgba(99, 102, 241, 0)"
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

// Duration constants (in ms)
export const durations = {
  instant: 100,
  fast: 150,
  normal: 200,
  slow: 300,
  autoHideToast: 2000
};

// Easing curves
export const easings = {
  easeOut: [0.33, 1, 0.68, 1],
  easeInOut: [0.65, 0, 0.35, 1],
  spring: [0.5, 0, 0, 1.5] // Approximation for spring-like feel
};
