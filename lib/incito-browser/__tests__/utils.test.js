import {formatUnit, isDefinedStr} from '../utils';

describe('Utils', () => {
    test('formatUnit', () => {
        expect(formatUnit(32)).toBe('32px');
        expect(formatUnit('32dp')).toBe('32px');
        expect(formatUnit()).toBe(0);
    });

    test('isDefinedStr', () => {
        expect(isDefinedStr('')).toBe(false);
        expect(isDefinedStr(' ')).toBe(true);
    });
});
