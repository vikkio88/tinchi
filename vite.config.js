import { defineConfig } from 'vite';

import { watchAndRun } from 'vite-plugin-watch-and-run';
import path from 'node:path';

export default defineConfig({
    // root: "./test/example/",
    server: {
        open: './test/example/'
    },
    plugins: [
        watchAndRun([{
            name: 'Generating test assets.',
            run: 'npm run g',
            watch: path.resolve('src/**/*.(css|tinchi)'),
        },]),
    ],
});