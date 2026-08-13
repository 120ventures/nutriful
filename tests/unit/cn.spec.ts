import { describe, it, expect } from 'vitest';
import { cn } from '../../src/lib/utils';

describe('cn', () => {
  it('joins truthy class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('ignores falsy values', () => {
    const disabled = false as boolean;
    expect(cn('a', disabled && 'b', null, undefined, '', 'c')).toBe('a c');
  });

  it('resolves conflicting Tailwind classes with tailwind-merge (last one wins)', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('text-sm text-red-500', 'text-lg text-blue-500')).toBe(
      'text-lg text-blue-500'
    );
  });

  it('supports clsx conditional object/array syntax', () => {
    expect(cn(['a', { b: true, c: false }], 'd')).toBe('a b d');
  });
});
