import Incito from '../incito';
import data from '../../../examples/incito-browser/example.json';

describe('Incito', () => {
    it('should handle valid JSON and start without throwing', (done) => {
        document.body.innerHTML = '<div id="main"></div>';

        const main = document.getElementById('main');

        const incito = new Incito(main, {incito: data});

        expect(() => incito.start()).not.toThrow();

        done();
    });
});
