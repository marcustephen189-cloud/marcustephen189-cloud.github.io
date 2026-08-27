export interface BrandingConfig {
  siteName: string;
  tagline: string;
  logoUrl: string | null; // null means use default SVG badge
  primaryColor: string; // Blue e.g. #184E9E
  secondaryColor: string; // Maroon Red e.g. #801424
  accentColor: string; // Gold e.g. #D4AF37
  institutionName: string;
  themeMode: 'classic-light' | 'editorial-ivory' | 'royal-dark';
}

export const DEFAULT_BRANDING: BrandingConfig = {
  siteName: "Neuron Flipbook",
  tagline: "Science & Technology Education Center — Lapu-Lapu City",
  logoUrl: null, // default vector emblem
  primaryColor: "#184E9E", // STEC Globe Blue
  secondaryColor: "#801424", // STEC Crimson / Maroon Red
  accentColor: "#D4AF37", // Gold / Brass
  institutionName: "Science and Technology Education Center",
  themeMode: "classic-light",
};

export const COLOR_PRESETS = [
  {
    name: "STEC Official (Blue & Maroon)",
    primary: "#184E9E",
    secondary: "#801424",
    accent: "#D4AF37",
    description: "Authentic Lapu-Lapu City Science and Technology Education Center colors."
  },
  {
    name: "Navy & Deep Crimson",
    primary: "#0F2B59",
    secondary: "#991B1B",
    accent: "#F59E0B",
    description: "Deep academic midnight navy paired with rich crimson."
  },
  {
    name: "Cobalt & Scarlet",
    primary: "#1D4ED8",
    secondary: "#B91C1C",
    accent: "#FBBF24",
    description: "Vibrant high-contrast modern educational palette."
  },
  {
    name: "Sapphire & Wine",
    primary: "#1E3A8A",
    secondary: "#6B111F",
    accent: "#EAB308",
    description: "Subtle archival sapphire and deep wine tone."
  }
];
