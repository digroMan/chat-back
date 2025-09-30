const { v4 } = require("uuid");

const template = [
    {
        name: 'Вадим',
        // messges: ''
    },
    {
        name: 'Дмитрий',
        // messges: ''
    },
    {
        name: 'Аркадий',
        // messges: ''
    },
    {
        name: 'Анна',
        // messges: ''
    }
];

const subscriptions = {
    data: [],
    listeners: [],

    add(item) {
        this.data.push(item);
        this.send({ ...item, add: true });
    },

    listen(handler) {
        this.listeners.push(handler)
    },

    delete(item) {
        this.data = this.data.filter(sub => sub.name !== item.name);
        this.send({ ...item, deleteClient: true });
    },

    send(item) {
        this.listeners.forEach(handler => handler(item))
    },

    template() {
        this.data = template
    }
}

const chat = {
    data: {},
    listeners: [],

    add(item) {
        this.data = { ...item, ...this.data };
    },

    getNewItem({ message }) {
        return {
            [v4()]: {
                ...message,
                edited: false,
                deleted: false,
            }
        }
    },

    delete(id) {
        this.data[id].deleted = true;
    },

    edit(id, text) {
        this.data[id].message = text;
        this.data[id].edited = true;
    },

    getMessage(id) {
        return this.data[id]
    },

    getLastMessages(count) {
        Object.keys(this.data).length === 0 && this.createFirstMessage();
        return Object.fromEntries(
            Object.entries(this.data)
                .sort(([_, a], [__, b]) => a.date - b.date)
                .slice(0, count)
        );
    },

    createFirstMessage() {
        const firstMessage = this.getNewItem({
            message: {
                client: 'server',
                message: 'Welcome to the chat',
                date: new Date().getTime(),
            }
        })
        this.add(firstMessage);
    }
}

module.exports = { subscriptions, chat }; 