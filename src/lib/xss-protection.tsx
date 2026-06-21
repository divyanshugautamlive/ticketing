import DOMPurify from "isomorphic-dompurify";
import React from "react";

/**
 * Sanitize HTML to prevent XSS attacks
 */
export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "u", "p", "br", "ul", "ol", "li"],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  });
}

/**
 * Escape HTML special characters
 */
export function escapeHTML(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Safely render user-generated HTML content
 */
export function SafeHTML({ html }: { html: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizeHTML(html)
      }}
    />
  );
}
