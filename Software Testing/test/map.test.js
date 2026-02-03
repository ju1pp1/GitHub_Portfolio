import { expect } from 'chai';

describe('Library component - map', () => {
    let map;
    before(async () => {
        map = (await import('software-testing-assignment/src/map.js')).default;
    });

    it('should apply transformation to each element in an array', () => {
        const products = [{ price: 100 }, { price: 50 }];
        const result = map(products, (product) => ({ price: product.price * 0.9 }));
        expect(result).to.deep.equal([{ price: 90 }, { price: 45 }]);
    });
});