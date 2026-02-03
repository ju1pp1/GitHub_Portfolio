import { expect } from 'chai';

describe('Library component - defaultTo', () => {
    let defaultTo;
    before(async () => {
        defaultTo = (await import('software-testing-assignment/src/defaultTo.js')).default;
    });

    it('should return default value if input is undefined', () => {
        expect(defaultTo(undefined, 100)).to.equal(100);
    });

    it('should return default value if input is null', () => {
        expect(defaultTo(null, 100)).to.equal(100);
    });

    it('should return actual value if input is not null or undefined', () => {
        expect(defaultTo(50, 100)).to.equal(50);
    });

    it('should handle string input types too with null input', () => {
        expect(defaultTo(null, "default")).to.equal("default");
    });

    it('should handle string input types too with non-null input', () => {
        expect(defaultTo("input string", "default")).to.equal("input string");
    });
});