'use strict';

require('marko/node-require');
const createGzip = require('zlib').createGzip;

const Koa = require('koa');
const app = new Koa();

const template = require('./index.marko');

app.use((ctx, next) => {
    ctx.type = 'html';
    ctx.body = template.stream({
        name: 'Frank',
        count: 30,
        colors: ['red', 'green', 'blue']
    });

    ctx.vary('Accept-Encoding');
    if (ctx.acceptsEncodings('gzip')) {
        ctx.set('Content-Encoding', 'gzip');
        ctx.body = ctx.body.pipe(createGzip());
    }
});

app.listen(8080);
