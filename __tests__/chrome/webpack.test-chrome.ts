import {readFile} from 'fs/promises';
import {globSync} from 'glob';
import {dirname, resolve} from 'path';
import webpackCompiler from '../../__tests_utils__/webpack-compiler';

const buildMatrix = <A>(
    options: A[][],
    index = 0,
    results: A[][] = [],
    current: A[] = []
) => {
    options[index].forEach((val) => {
        current[index] = val;
        if (index + 1 < options.length) {
            buildMatrix(options, index + 1, results, current);
        } else results.push([...current]);
    });

    return results;
};

const packages = globSync('./dist/**/*/package.json');
const modes = ['development', 'production'] as const;
for (const path of packages) {
    for (const mode of modes) {
        test(`Webpack + Chrome: ${path} ${mode}`, async () => {
            const packageJson = JSON.parse(await readFile(path, 'utf-8'));
            const scriptPath = resolve(dirname(path), packageJson.module);
            const code = `import * as A from '${scriptPath}'; console.log(A)`;

            await page.evaluate(await webpackCompiler(code, {mode}));
        });
    }
}
