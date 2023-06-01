const Router = require('@koa/router');
const subscriptions = require('../../db/db')
const router = new Router();


router.post('/subscriptions', async(ctx) => { 
    ctx.response.body = 'subscriptions';

    const { name } = ctx.request.body;

    ctx.response.set('Access-Control-Allow-Origin', '*');

    if(subscriptions.data.some(sub => sub.name === name)) {
    
        ctx.response.status = 400;
        ctx.response.body = { status: "subscripiton exists" };

        return;
    }

    subscriptions.add({ name });
    
    ctx.response.body = { status: "OK" };
});

router.get('/subscriptions/full', (ctx) => {

    ctx.response.set('Access-Control-Allow-Origin', '*');
    
    ctx.response.body = subscriptions.data;
})


router.delete('/subscriptions/:name', (ctx) => {
    const { name } = ctx.params;

    ctx.response.set('Access-Control-Allow-Origin', '*');

    if(name === 'undefined') return; 

    subscriptions.delete({ name });
})

module.exports = router;