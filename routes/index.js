const combineRouters = require('koa-combine-routers');

const subscriptions = require('./subscriptions/index')
const index = require('./index/index')
const sse = require('./sse/index')

const router = combineRouters(
    index,
    subscriptions,
    sse
);

module.exports = router;