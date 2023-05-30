const Router = require('@koa/router');
const subscriptions = require('../../db/db')
const router = new Router();


router.post('/subscriptions', async(ctx) => {
    console.log(typeof ctx.request.body)
    console.log(ctx.request.body)
    
    ctx.response.body = 'subscriptions';

    const { name } = ctx.request.body;

    ctx.response.set('Access-Control-Allow-Origin', '*');

    if(subscriptions.data.some(sub => sub.name === name)) {
    // если телефон уже есть в подписках
        ctx.response.status = 400;
        // то отправить статус ответа - ошибка
        ctx.response.body = { status: "subscripiton exists" };

        return;
    }

    subscriptions.add({ name });
    // добавить подписку
    
    ctx.response.body = { status: "OK" };
});

// Получение подписок
router.get('/subscriptions/full', (ctx) => {

    ctx.response.set('Access-Control-Allow-Origin', '*');
    
    ctx.response.body = subscriptions.data;
})


// Удаление подписки
router.delete('/subscriptions/:phone', (ctx) => {
    const { phone } = ctx.params;
    console.log(phone)
    ctx.response.set('Access-Control-Allow-Origin', '*');

    if(subscriptions.data.every(sub => sub.phone !== phone)) {
    // если все телефоны не равны телефону, который нужно удалить из подписок
        ctx.response.status = 400;
        // то отправить статус ответа - ошибка
        ctx.response.body = { status: "subscripiton doesn\'t exists" };
        // отправить тело ответа 
        console.log(subscriptions)

        return;
    }

    subscriptions.data = subscriptions.data.filter(sub => sub.phone !== phone);
    // удалить  подписку
    
    ctx.response.body = { status: "OK" };
    console.log(subscriptions)
})

module.exports = router;