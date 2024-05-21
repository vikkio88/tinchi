import { defineConfig } from 'vite';

import { run } from 'vite-plugin-run';

export default defineConfig({
    root: "./test/example",
    plugins: [
        run({
            name: 'Generating test assets.',
            run: ['npm', 'run', 'g'],
            pattern: ['../../src/*.*'],
            silent: false,
        },),
    ],
});