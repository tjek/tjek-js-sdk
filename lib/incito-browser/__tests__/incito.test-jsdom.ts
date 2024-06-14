import data from '../../../examples/incito-browser/example.json';
import Incito from '../incito';
import type {IIncito} from '../types';

describe('Incito', () => {
    it('should handle valid JSON and start without throwing', (done) => {
        document.body.innerHTML = '<div id="main"></div>';

        const main = document.getElementById('main')!;

        // @ts-expect-error can't treat the json import as const 🤷‍♀️
        const incito: IIncito = data;
        const incitoViewer = new Incito(main, {incito}, '');

        expect(() => incitoViewer.start()).not.toThrow();

        done();
    });
});
