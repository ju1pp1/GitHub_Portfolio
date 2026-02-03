import { expect } from 'chai';

describe('Library component - get', () => {
    let get;
    before(async () => {
        get = (await import('software-testing-assignment/src/get.js')).default;
    });

    it('should get nested property value from object', () => {
        const data = { product: {name: 'Apple'}};
        expect(get(data, 'product.name')).to.equal('Apple');
    });

    it('should return default value if path does not exist', () => {
        const data = { product: {name: 'Apple'}};
        expect(get(data, 'product.price', 'No price')).to.equal('No price');
    });
});