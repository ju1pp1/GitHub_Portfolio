import { expect } from 'chai';

describe('Library component - add', () => {
    let add;
    before(async () => {
        add = (await import('software-testing-assignment/src/add.js')).default;
    });

    it('should add two integers', () => {
        expect(add(20, 30)).to.equal(50);
    });

    it('should add two decimal numbers', () => {
        expect(add(10.99, 5.01)).to.equal(16.00);
    });

    it('should add negative numbers', () => {
        expect(add(-5, -15)).to.equal(-20);
    });

    it('should add negative and positive decimal numbers', () => {
        expect(add(-2.50, 3.02)).to.equal(0.52);
    });

    it('should handle small decimals', () => {
        expect(add(0.00000000003, 0.00000000002)).to.be.closeTo(0.00000000005, 1e-11);
    });
});