const Router = require('@koa/router');
const chat = require('../../db/db')
const router = new Router();
const origin = 'http://localhost:9000';

router.post('/messages/add', async(ctx) => { 
    ctx.response.body = {status: 'message added'};

    const { message } = ctx.request.body;

    ctx.response.set('Access-Control-Allow-Origin', origin);

    chat.add({ message: message });
    
    ctx.response.body = { status: "OK" };
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