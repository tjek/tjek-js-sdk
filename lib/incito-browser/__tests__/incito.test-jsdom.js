import Incito from '../incito';
import data from '../../../examples/incito-browser/example.json';

describe('Incito', () => {
    it('should handle valid JSON and fire *Rendered events', (done) => {
        document.body.innerHTML = '<div id="main"></div>';

        const main = document.getElementById('main');

        const incito = new Incito(main, {incito: data, renderLaziness: 0});
        const allCallback = jest.fn();
        const visibleCallback = jest.fn();

        incito.bind('allRendered', allCallback);
        incito.bind('visibleRendered', visibleCallback);

        expect(() => incito.start()).not.toThrow();
        expect(allCallback.mock.calls.length).toBe(1);
        expect(visibleCallback.mock.calls.length).toBe(1);

        done();
    });
});
