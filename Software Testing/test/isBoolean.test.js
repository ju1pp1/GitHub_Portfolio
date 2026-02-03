import { expect } from 'chai';

describe('Library component - isBoolean', () => {
    let isBoolean;
    before(async () => {
        isBoolean = (await import('software-testing-assignment/src/isBoolean.js')).default;
    });

    it('should return true if value is true', () => {
        expect(isBoolean(true)).to.be.true;
    });
    
    it('should return true if value is false', () => {
        expect(isBoolean(false)).to.be.true;
    });
    
    it('should return false if value is not boolean', () => {
        expect(isBoolean("hello")).to.be.false;
    });
});