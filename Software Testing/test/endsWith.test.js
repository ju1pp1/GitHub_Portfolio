import { expect } from 'chai';

describe('Library component - endsWith', () => {
    let endsWith;
    before(async () => {
        endsWith = (await import('software-testing-assignment/src/endsWith.js')).default;
    });

    it('should return false if string does not end with specified suffix', () => {
        expect(endsWith("yksi.kaksi@foo.bar", ".com")).to.be.false;
    });

    it('should return true if string does end with specified suffix', () => {
        expect(endsWith("yksi.kaksi@gmail.com", ".com")).to.be.true;
    });

    it('should handle normal strings', () => {
        expect(endsWith("input", "t")).to.be.true;
    });
});