import { encodeState, decodeState, decodeStateWithVersion } from '../src';

describe('encodeState', () => {
  test('encodes to a URL-safe string (no + / =)', () => {
    const encoded = encodeState({ v: 1, layout: 'grid', zoom: 1.5 });
    expect(encoded).not.toMatch(/[+/=]/);
    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);
  });

  test('handles non-ASCII values', () => {
    const state = { v: 1, title: '蛋白质筛选', emoji: '🧬 dna' };
    expect(decodeState(encodeState(state))).toEqual(state);
  });

  test('roundtrip preserves the object', () => {
    const state = { v: 1, filters: { region: 'us', type: 'protein' } };
    expect(decodeState(encodeState(state))).toEqual(state);
  });
});

describe('decodeState', () => {
  test('returns null for absent/empty input', () => {
    expect(decodeState(undefined)).toBeNull();
    expect(decodeState(null)).toBeNull();
    expect(decodeState('')).toBeNull();
  });

  test('returns null for corrupted input', () => {
    expect(decodeState('!!!not-valid!!!')).toBeNull();
  });

  test('accepts both standard base64 and base64url', () => {
    expect(decodeState('eyJhIjoxfQ==')).toEqual({ a: 1 }); // standard, padded
    expect(decodeState('eyJ2IjoxfQ')).toEqual({ v: 1 }); // urlsafe, no padding
  });
});

describe('decodeStateWithVersion', () => {
  test('passes through when version matches', () => {
    const state = { v: 1, layout: 'grid' };
    expect(decodeStateWithVersion(encodeState(state))).toEqual(state);
  });

  test('returns null when version mismatches', () => {
    const state = { v: 99, layout: 'grid' };
    expect(decodeStateWithVersion(encodeState(state))).toBeNull();
    expect(decodeStateWithVersion(encodeState(state), 2)).toBeNull();
  });

  test('returns null when v is missing', () => {
    expect(decodeStateWithVersion(encodeState({ layout: 'grid' }))).toBeNull();
  });
});
