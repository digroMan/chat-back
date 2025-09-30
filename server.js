const http = require('http');
const Koa = require('koa');
const { koaBody } = require('koa-body')
const router = require('./routes');
const WebSocket = require('ws')
const { WebSocketServer } = require('ws');
const { subscriptions, chat } = require('./db/db')

const app = new Koa();


app.use(koaBody({
    multipart: true,
}))

app.use(async (ctx, next) => {
    subscriptions.template()

    const origin = ctx.request.get('Origin');
    if (!origin) {
        return await next();
    }

    const headers = { 'Access-Control-Allow-Origin': 'http://localhost:9000', };


    if (ctx.request.method !== 'OPTIONS') {
        ctx.response.set({ ...headers });
        try {
            return await next();
        } catch (e) {
            e.headers = { ...e.headers, ...headers };
            throw e;
        }
    }

    if (ctx.request.get('Access-Control-Request-Method')) {
        ctx.response.set({
            ...headers,
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
        });

        if (ctx.request.get('Access-Control-Request-Headers')) {
            ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
        }

        ctx.response.status = 204;
    }
});

app.use(router());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());

const wsServer = new WebSocketServer({
    server
});

wsServer.on('connection', (ws) => {

    ws.on('message', (message) => {
        const eventSocket = JSON.parse(message);
        const type = eventSocket.type;
        const msg = {
            type,
        };

        switch (eventSocket.type) {
            case 'delete':
                const id = eventSocket.data.id;
                chat.delete(id);
                msg.data = {[id]: chat.getMessage(id)};
                break;
            case 'add':
                const newMessage = chat.getNewItem({message: eventSocket.data});
                chat.add(newMessage);
                msg.data = newMessage;
                break;
            default:
                break;
        }

        Array.from(wsServer.clients)
            .filter(client => client.readyState === WebSocket.OPEN)
            .forEach(client => client.send(JSON.stringify(msg)))
    })

    const eventData = JSON.stringify({
        type: 'first-load',
        data: chat.getLastMessages(10)
    });
    ws.send(eventData);

})

server.listen(port);
