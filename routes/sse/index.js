const Router = require('@koa/router');
const { streamEvents } = require('http-event-stream');
const { v4 } = require('uuid');
const subscription = require('../../db/db');

const router = new Router();

router.get('/sse', async(ctx) => {
    streamEvents(ctx.req, ctx.res, {
        async fetch(lastEventId){
            console.log(lastEventId)

            return [];
        },

        async stream(sse){
            subscription.listen((item) =>{
                sse.sendEvent({
                    id: v4(),
                    data: JSON.stringify(item),
                })
            }) 

            return () => {}; 
        }
    })
    

    // предотвращает вмешивание сторонних фреймворков
    ctx.respond = felse;
});

module.exports = router;