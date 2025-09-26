const Router = require('@koa/router');
const {chat, ...data} = require('../../db/db');
const { v4 } = require('uuid');
const router = new Router();
const origin = 'http://localhost:9000';

router.post('/chat/message-add', async (ctx) => {
    ctx.response.set('Access-Control-Allow-Origin', origin);

    const chatItem = {
        [v4()]: { ...ctx.request.body }
    }

    chat.add(chatItem)

    ctx.response.body = { status: 'message added' };
    ctx.response.status = 200;
});

router.get('/chat/message-full', async (ctx) => {
    ctx.response.set('Access-Control-Allow-Origin', origin);

    if (chat.data.length === 0) {
        ctx.response.body = {
            data: {
                0: {
                    client: 'server',
                    message: 'Welcome to the chat',
                    date: new Date().getTime(),
                }
            }
        }
    } else {
        ctx.response.body = { data: chat.data };
    }

    ctx.response.status = 200;
});

// router.get('/subscriptions/full', (ctx) => {

//     ctx.response.set('Access-Control-Allow-Origin', origin);

//     ctx.response.body = subscriptions.data;
// })


// router.delete('/subscriptions/:name', (ctx) => {
//     const { name } = ctx.params;
//     ctx.response.set('Access-Control-Allow-Origin', origin);

//     // if(name === 'undefined') return; 

//     subscriptions.delete({ name });
// })

module.exports = router;