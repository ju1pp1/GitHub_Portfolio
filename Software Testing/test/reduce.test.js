import { expect } from 'chai';

describe('Library component - reduce', () => {
    let reduce;
    before(async () => {
        reduce = (await import('software-testing-assignment/src/reduce.js')).default;
    });

    it('should sum up numbers in an array', () => {
        const numbers = [10, 20, 30];
        const sum = reduce(numbers, (acc, num) => acc + num, 0);
        expect(sum).to.equal(60);
    });

    it('should return 0 for empty array', () => {
        const numbers = [];
        const sum = reduce(numbers, (acc, num) => acc + num, 0);
        expect(sum).to.equal(0);
    });

    it('should handle multiply operations', () => {
        const numbers = [2, 2, 2, -2];
        const sum = reduce(numbers, (acc, num) => acc * num, 1);
        expect(sum).to.equal(-16);
    });
});