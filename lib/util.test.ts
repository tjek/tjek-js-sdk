import { chunk } from './util';

describe('chunk', () => {
    it('should split an array into chunks of the specified size', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const size = 3;
        const result = chunk(arr, size);
        expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    });

    it('should handle arrays that do not divide evenly by the chunk size', () => {
        const arr = [1, 2, 3, 4, 5, 6, 7];
        const size = 3;
        const result = chunk(arr, size);
        expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });

    it('should return an empty array when given an empty array', () => {
        const arr: number[] = [];
        const size = 3;
        const result = chunk(arr, size);
        expect(result).toEqual([]);
    });

    it('should handle chunk sizes larger than the array length', () => {
        const arr = [1, 2, 3];
        const size = 5;
        const result = chunk(arr, size);
        expect(result).toEqual([[1, 2, 3]]);
    });

    it('should handle chunk size of 1', () => {
        const arr = [1, 2, 3];
        const size = 1;
        const result = chunk(arr, size);
        expect(result).toEqual([[1], [2], [3]]);
    });

    it('should handle chunk size of 0', () => {
        const arr = [1, 2, 3];
        const size = 0;
        const result = chunk(arr, size);
        expect(result).toEqual([]);
    });
}); 