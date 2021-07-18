import {readFileSync, writeFileSync} from 'fs';
import { compile } from 'handlebars-to-jsx';
import {sync as globSync} from 'glob';
import {outdent} from 'outdent';

for(const file of globSync('src/**/*.hbs')) {
    console.dir(file);
    try {
        const converted = compile(readFileSync(file, 'utf8'));
        writeFileSync(file.replace(/.hbs$/, '.tsx'), outdent `
            import React from 'react';
            export const component = ${ converted }

        `);
    } catch(e) {
        // if(e.message.includes('block may only')) {
            console.log(e.message);
            console.log(`${file}:${e.location?.start?.line}:${e.location?.start?.column}`);
        // }
    }
}
