import {JSDOM} from 'jsdom';
import Verso from '../verso';

test("it doesn't break node", () => expect(true).toBeTruthy());

test('it can generate html with jsdom', () => {
    const {document} = new JSDOM(`
        <div class="verso">
            <div class="verso__scroller">
                <div class="verso__page-spread" data-id="page1" data-width="80">
                    <div class="verso__page">page1</div>
                </div>
                <div
                    class="verso__page-spread"
                    data-id="page2"
                    data-width="100"
                >
                    <div class="verso__page">page2</div>
                </div>
                <div class="verso__page-spread" data-id="page3" data-width="80">
                    <div class="verso__page">page3</div>
                </div>
            </div>
        </div>
    `).window;

    const versoEl = document.querySelector<HTMLDivElement>('.verso')!;
    const verso = new Verso(versoEl).start();
    verso.navigateTo(0, {duration: 0});
    expect(versoEl.outerHTML).toMatchSnapshot();
    verso.navigateTo(2, {duration: 0});
    expect(versoEl.outerHTML).toMatchSnapshot();
    verso.navigateTo(1, {duration: 0});
    expect(versoEl.outerHTML).toMatchSnapshot();
});
