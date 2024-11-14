import { getEditorHtml } from '@copus/editor';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
    return c.text('Hello!');
});

app.get('/client/common/opus/detail/*', async (c) => {
    const apiHost = process.env.API_HOST;
    const url = `${apiHost}${c.req.path}`;

    const headers = c.req.header();
    const response = await fetch(url, {
        headers: {
            Authorization: headers['authorization'],
        },
    });
    const res = await response.json();
    if (res.data.content) {
        res.data.htmlContent = await getEditorHtml(res.data.content);
    }
    return c.json(res);
});

export default app;
