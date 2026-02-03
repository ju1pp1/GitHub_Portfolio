import { expect } from 'chai';

describe('Library component - isEmpty', () => {
    let isEmpty;
    before(async () => {
        isEmpty = (await import('software-testing-assignment/src/isEmpty.js')).default;
    });

    it('should return true for an empty value', () => {
        expect(isEmpty("")).to.be.true;
    });

    it('should return false for a non-empty string', () => {
        expect(isEmpty("Apple")).to.be.false;
    });

    it('should return true for null', () => {
        expect(isEmpty(null)).to.be.true;
    });

    it('should return true for undefined', () => {
        expect(isEmpty(undefined)).to.be.true;
    });

    it('should return true for an empty array', () => {
        expect(isEmpty([])).to.be.true;
    });

    it('should return false for a non-empty array', () => {
        expect(isEmpty([1, 2, 3])).to.be.false;
    });

    it('should return true for an empty object', () => {
        expect(isEmpty({})).to.be.true;
    });

    it('should return false for a non-empty object', () => {
        expect(isEmpty({ key: 'value' })).to.be.false;
    });


});