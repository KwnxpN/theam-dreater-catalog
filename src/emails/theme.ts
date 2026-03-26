export const websiteThemeColors = {
  background: "#fcfaf8",
  foreground: "#111827",
  card: "#ffffff",
  cardForeground: "#111827",
  primary: "#d86b27",
  primaryForeground: "#ffffff",
  secondary: "#f3f4f6",
  secondaryForeground: "#111827",
  muted: "#f3f4f6",
  mutedForeground: "#6b7280",
  accent: "#fef3eb",
  accentForeground: "#111827",
  border: "#e5e7eb",
  input: "#f3f4f6",
  ring: "#d86b27",
} as const;

export const emailTailwindTheme = {
  extend: {
    colors: {
      background: websiteThemeColors.background,
      foreground: websiteThemeColors.foreground,
      card: websiteThemeColors.card,
      "card-foreground": websiteThemeColors.cardForeground,
      primary: websiteThemeColors.primary,
      "primary-foreground": websiteThemeColors.primaryForeground,
      secondary: websiteThemeColors.secondary,
      "secondary-foreground": websiteThemeColors.secondaryForeground,
      muted: websiteThemeColors.muted,
      "muted-foreground": websiteThemeColors.mutedForeground,
      accent: websiteThemeColors.accent,
      "accent-foreground": websiteThemeColors.accentForeground,
      border: websiteThemeColors.border,
      input: websiteThemeColors.input,
      ring: websiteThemeColors.ring,
    },
  },
} as const;
