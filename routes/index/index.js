const Router = require('@koa/router');
const router = new Router();

router.get('/last-messages', async(ctx) => {
    ctx.response.body = {result: 'hello'};
});

module.exports = router;