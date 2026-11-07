import { encode, decode } from '../src';

describe('encode', () => {
  test('encodes to a URL-safe string (no + / =)', () => {
    const encoded = encode({ v: 1, layout: 'grid', zoom: 1.5 });
    expect(encoded).not.toMatch(/[+/=]/);
    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);
  });

  test('handles non-ASCII values', () => {
    const state = { v: 1, title: '蛋白质筛选', emoji: '🧬 dna' };
    expect(decode(encode(state))).toEqual(state);
  });

  test('roundtrip preserves the object', () => {
    const state = { v: 1, filters: { region: 'us', type: 'protein' } };
    expect(decode(encode(state))).toEqual(state);
  });
});

describe('decode', () => {
  test('returns null for absent/empty input', () => {
    expect(decode(undefined)).toBeNull();
    expect(decode(null)).toBeNull();
    expect(decode('')).toBeNull();
  });

  test('returns null for corrupted input', () => {
    expect(decode('!!!not-valid!!!')).toBeNull();
  });

  test('accepts both standard base64 and base64url', () => {
    expect(decode('eyJhIjoxfQ==')).toEqual({ a: 1 }); // standard, padded
    expect(decode('eyJ2IjoxfQ')).toEqual({ v: 1 }); // urlsafe, no padding
  });
});
