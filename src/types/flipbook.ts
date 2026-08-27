export interface FlipbookConfig {
  title: string;
  subtitle: string;
  description: string;
  author: string;
  publishedDate: string;
  totalPages: number;
  tags: string[];
  embedHtml: string;
  embedUrl: string;
  aspectRatio: '16/9' | '4/3' | '16/10' | '1/1' | 'a4-spread' | 'full';
  backgroundTheme: 'paper' | 'canvas' | 'dark' | 'monochrome';
}

export const DEFAULT_CONFIG: FlipbookConfig = {
  title: "Neuron Science & Technology Digest",
  subtitle: "STEC Lapu-Lapu City Official Digital Edition",
  description: "An interactive digital publication showcasing science research, student monographs, technological innovations, and academic archives from the Science and Technology Education Center (Lapu-Lapu City).",
  author: "STEC Research & Editorial Board",
  publishedDate: "Academic Year 2026",
  totalPages: 36,
  tags: ["Science & Tech", "STEC Lapu-Lapu", "Neuron Digest", "Interactive 3D"],
  embedHtml: "", // Awaiting user's Heyzine embed code
  embedUrl: "",
  aspectRatio: "16/9",
  backgroundTheme: "paper",
};
