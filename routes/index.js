const combineRouters = require('koa-combine-routers');

const subscriptions = require('./subscriptions/index');
const chat = require('./chat/index');
const index = require('./index/index');
const sse = require('./sse/index');

const router = combineRouters(
    index,
    subscriptions,
    // chat,
    sse
);

module.exports = router;