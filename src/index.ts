import { Base64 } from "js-base64";

/**
 * Encode a state object into a URL-safe string (base64url, no padding).
 * Non-ASCII values (Chinese, emoji) are handled by js-base64 internally.
 */
export function encode<T>(state: T): string {
  return Base64.encodeURI(JSON.stringify(state));
}

/**
 * Decode a URL-safe state string back into an object.
 * Returns null for absent/empty/corrupted input — call sites can
 * fall back to defaults silently.
 */
export function decode<T = Record<string, unknown>>(raw?: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(Base64.decode(raw)) as T;
  } catch {
    return null;
  }
}
