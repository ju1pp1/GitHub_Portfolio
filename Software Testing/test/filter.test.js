import { expect } from 'chai';

describe('Library component - filter', () => {
    let filter;
    before(async () => {
        filter = (await import('software-testing-assignment/src/filter.js')).default;
    });

    it('should filter array of objects based on condition', () => {
        const items = [
            { name: 'Apple', category: 'Fruit' },
            { name: 'Carrot', category: 'Vegetable' },
        ];
        const result = filter(items, (item) => item.category === 'Fruit');
        expect(result).to.deep.equal([{ name: 'Apple', category: 'Fruit' }]);
    });
});