import data from '../../../examples/incito-browser/example.json';
import Incito from '../incito';
import type {IIncito} from '../types';

describe('Incito', () => {
    it('should handle valid JSON and start without throwing', (done) => {
        document.body.innerHTML = '<div id="main"></div>';

        const main = document.getElementById('main')!;

        // @ts-expect-error can't treat the json import as const 🤷‍♀️
        const incito: IIncito = data;
        const incitoViewer = new Incito(main, {incito});

        expect(() => incitoViewer.start()).not.toThrow();

        done();
    });

    describe('attribute escaping (XSS)', () => {
        const XSS = 'https://example.com/ " onmouseover="alert(1)';

        const render = (rootView: object): HTMLElement => {
            document.body.innerHTML = '<div id="main"></div>';
            const main = document.getElementById('main')!;
            const incito = {
                id: 'test',
                version: '1.0.0',
                root_view: rootView
            } as unknown as IIncito;

            new Incito(main, {incito, canLazyload: false});

            return main;
        };

        it('does not let a malicious link break out of data-link', () => {
            const el = render({
                view_name: 'TextView',
                text: 'hi',
                link: XSS
            });

            const view = el.querySelector('.incito__view')!;

            expect(view.getAttribute('onmouseover')).toBeNull();
            expect(view.getAttribute('data-link')).toBe(XSS);
        });

        it('does not let a malicious label break out of alt', () => {
            const el = render({
                view_name: 'ImageView',
                src: 'https://example.com/x.png',
                label: XSS
            });

            const view = el.querySelector('.incito__view')!;

            expect(view.getAttribute('onmouseover')).toBeNull();
        });

        it('does not let a malicious text_color break out of style', () => {
            const el = render({
                view_name: 'TextView',
                text: 'hi',
                text_color: 'red" onmouseover="alert(1)'
            });

            const view = el.querySelector('.incito__view')!;

            expect(view.getAttribute('onmouseover')).toBeNull();
        });
    });
});
