/**
 * Parses Heyzine input which could be raw iframe HTML code or a direct flipbook URL.
 */
export function parseHeyzineInput(input: string): { url: string; isValid: boolean; rawHtml?: string } {
  if (!input || !input.trim()) {
    return { url: '', isValid: false };
  }

  const trimmed = input.trim();

  // Check if it's an iframe snippet
  if (trimmed.includes('<iframe') && trimmed.includes('src=')) {
    const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      return {
        url: srcMatch[1],
        isValid: true,
        rawHtml: trimmed
      };
    }
  }

  // Check if it's a URL
  try {
    const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    if (parsed.hostname.includes('heyzine.com') || parsed.hostname.includes('cdnp.heyzine.com') || parsed.protocol.startsWith('http')) {
      return {
        url: parsed.toString(),
        isValid: true,
        rawHtml: `<iframe allowfullscreen="allowfullscreen" scrolling="no" class="fp-iframe" src="${parsed.toString()}" style="border: 1px solid lightgray; width: 100%; height: 100%;"></iframe>`
      };
    }
  } catch {
    // invalid URL format
  }

  return { url: '', isValid: false };
}
