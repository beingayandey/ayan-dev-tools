/**
 * Background Preset Configuration
 *
 * To change the global background, set only ONE preset to 'enabled: true'.
 * This is the single source of truth for the application's visual theme.
 */

export const BACKGROUND_PRESETS = {
  // 🏎️ The Hyperspeed animation (optimized for homepage only)
  hyperspeed: {
    enabled: true,
    type: "hyperspeed",
    preset: "five", // options: one, two, three, four, five, six
  },

  // 🌈 Modern CSS radial gradient
  gradient: {
    enabled: false,
    type: "gradient",
  },

  // 🖼️ Grid-based technical texture
  image: {
    enabled: false,
    type: "image",
    texture: "grid", // options: grid, dots
  },

  // ⬛ Pure AMOLED black
  solid: {
    enabled: false,
    type: "color",
    color: "#000000",
  },
} as const;

export type BackgroundPresetType =
  | "hyperspeed"
  | "gradient"
  | "image"
  | "color";

export function getActivePreset() {
  const active = Object.values(BACKGROUND_PRESETS).find((p) => p.enabled);
  return active || BACKGROUND_PRESETS.hyperspeed;
}
