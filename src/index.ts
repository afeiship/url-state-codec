import { Base64 } from "js-base64";

export interface DecodeResult<T> {
  /** Decoded state object, or null when absent/corrupted. */
  state: T | null;
  /** Raw query-string value (undefined when absent). */
  raw: string | undefined;
}

/**
 * Encode a state object into a URL-safe string (base64url, no padding).
 * Non-ASCII values (Chinese, emoji) are handled by js-base64 internally.
 */
export function encodeState<T>(state: T): string {
  return Base64.encodeURI(JSON.stringify(state));
}

/**
 * Decode a URL-safe state string back into an object.
 * Returns null for absent/empty/corrupted input — call sites can
 * fall back to defaults silently.
 */
export function decodeState<T = Record<string, unknown>>(raw?: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(Base64.decode(raw)) as T;
  } catch {
    return null;
  }
}

/**
 * Same as decodeState but also validates the `v` (version) field:
 * returns null when the state was written by an incompatible version.
 */
export function decodeStateWithVersion<T extends { v?: number }>(
  raw?: string | null,
  currentVersion = 1,
): T | null {
  const state = decodeState<T>(raw);
  if (!state) return null;
  if (state.v !== currentVersion) return null;
  return state;
}
