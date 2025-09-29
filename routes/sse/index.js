const Router = require('@koa/router');
const { streamEvents } = require('http-event-stream');
const { v4 } = require('uuid');
const { subscriptions, ...data} = require('../../db/db');

const router = new Router();

router.get('/sse', async(ctx) => {
    streamEvents(ctx.req, ctx.res, {
        async fetch(lastEventId){

            return [];
        },

        async stream(sse){
            subscriptions.listen((item) =>{
                sse.sendEvent({
                    id: v4(),
                    data: JSON.stringify(item),
                })
            }) 

            return () => {}; 
        }
    })
    
    ctx.respond = false;
});

module.exports = router;