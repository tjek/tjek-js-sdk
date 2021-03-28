import Incito from '../incito';
import data from '../../../examples/incito-browser/example.json';

describe('Incito', () => {
    it('should handle valid JSON and fire *Rendered events', (done) => {
        document.body.innerHTML = '<div id="main"></div>';

        const main = document.getElementById('main');

        const incito = new Incito(main, {incito: data});
        const allCallback = jest.fn();

        incito.bind('allRendered', allCallback);

        expect(() => incito.start()).not.toThrow();
        expect(allCallback.mock.calls.length).toBe(1);

        done();
    });
});
