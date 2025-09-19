const Router = require('@koa/router');
const subscriptions = require('../../db/db')
const router = new Router();
const origin = 'http://localhost:9000';

router.post('/subscriptions', async(ctx) => { 
    ctx.response.body = 'subscriptions';

    const { name } = ctx.request.body;

    ctx.response.set('Access-Control-Allow-Origin', origin);

    const isNameOccupied = subscriptions.data.some(sub => sub.name === name);
    if(isNameOccupied) {
        ctx.response.status = 400;
        ctx.response.body = { status: "subscripiton exists" };

        return;
    }

    subscriptions.add({ name: name });
    
    ctx.response.body = { status: "OK" };
});

router.get('/subscriptions/full', (ctx) => {

    ctx.response.set('Access-Control-Allow-Origin', origin);
    
    ctx.response.body = subscriptions.data;
})


router.delete('/subscriptions/:name', (ctx) => {
    const { name } = ctx.params;

    ctx.response.set('Access-Control-Allow-Origin', origin);

    if(name === 'undefined') return; 

    subscriptions.delete({ name });
})

module.exports = router;