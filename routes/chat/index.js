const Router = require('@koa/router');
const { chat, ...data } = require('../../db/db');
const { v4 } = require('uuid');
const router = new Router();
const origin = 'http://localhost:9000';

router.post('/chat/add', async (ctx) => {
    ctx.response.set('Access-Control-Allow-Origin', origin);

    const id = v4();

    const chatItem = {
        [id]: { 
            ...ctx.request.body,
            edited: false,
            deleted: false,
        }
    }

    chat.add(chatItem)

    ctx.response.body = {
        status: 'message added',
        data: {
            [id]: chat.getMessage(id)
        }
    };

    ctx.response.status = 200;
});

router.get('/chat/full', async (ctx) => {
    ctx.response.set('Access-Control-Allow-Origin', origin);

    if (chat.data.length === 0) {
        ctx.response.body = {
            data: {
                0: {
                    client: 'server',
                    message: 'Welcome to the chat',
                    date: new Date().getTime(),
                    deleted: false,
                    edited: false,
                }
            }
        }
    } else {
        ctx.response.body = { data: chat.data };
    }

    ctx.response.status = 200;
});

router.delete('/chat/delete/:id', async (ctx) => {
    const { id } = ctx.params;
    ctx.response.set('Access-Control-Allow-Origin', origin);
    chat.delete(id);
    ctx.response.body = {
        status: `message ${id} delete`,
        data: {
            [id]: chat.getMessage(id),
        }
    };
    ctx.response.status = 200;
})

module.exports = router;