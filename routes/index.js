// экспорт функции для комбинирования роутеров
const combineRouters = require('koa-combine-routers');

// экспорт объвленных роутеров
const subscriptions = require('./subsctiptions/index')
const index = require('./index/index')
const sse = require('./sse/index')

// погружение роутов в функцию для объединения
const router = combineRouters(
    index,
    subscriptions,
    sse
);

// экспорт модуля
module.exports = router;