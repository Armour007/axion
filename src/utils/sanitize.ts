import DOMPurify from 'dompurify';

// Custom config for DOMPurify: allow links with Tailwind classes
const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'b',
    'i',
    'em',
    'strong',
    'a',
    'br',
    'p',
    'div',
    'span',
    'u',
    'code',
    'pre',
  ],
  ALLOWED_ATTR: ['href', 'target', 'class', 'rel'],
  KEEP_CONTENT: true,
};

/**
 * Sanitizes HTML string to prevent XSS while preserving safe tags (links, formatting).
 * @param dirty - Unsanitized HTML string
 * @returns Safe HTML string
 */
export const sanitizeHTML = (dirty: string): string => {
  if (typeof window === 'undefined') {
    // Server-side: return as-is (no DOM available)
    return dirty;
  }
  return DOMPurify.sanitize(dirty, PURIFY_CONFIG);
};
