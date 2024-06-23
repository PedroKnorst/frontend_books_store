import { describe, expect, it } from 'vitest';
import { inputMasks } from './inputMasks';

describe('inputMasks', () => {
  it('should mask the value to money layout when type is string', () => {
    const value = inputMasks('10', 'MONEY');

    expect(value).toBe('R$ 0,10');
  });

  it('should mask the value to money layout when type is number', () => {
    const value = inputMasks(10, 'MONEY') as string;
    const expectedValue = 'R$ 10,00';

    const normalizedValue = value.normalize('NFKC');
    const normalizedExpectedValue = expectedValue.normalize('NFKC');

    expect(normalizedValue).toBe(normalizedExpectedValue);
  });
});
