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

    add(item){
        this.data.push(item);
        this.send({...item, add: true});
    },

    listen(handler){
        this.listeners.push(handler)
    },

    delete(item){
        this.data = this.data.filter(sub => sub.name !== item.name);
        this.send({...item, deleteClient: true});
    },
    
    send(item){
        this.listeners.forEach(handler => handler(item))
    },

    template() {
        this.data = template
    }
}

const chat = {
    data: {},
    listeners: [],

    add(item){
        this.data = {...item, ...this.data};
        this.send(item);
    },

    listen(handler){
        this.listeners.push(handler)
    },

    delete(id){
        this.data[id].deleted = true;
    },

    edit(id, text){
        this.data[id].message = text;
        this.data[id].edited = true;
    },

    send(item){
        this.listeners.forEach(handler => handler(item))
    },

    getMessage(id){
        return this.data[id]
    },

    getLastMessages(count){
        return Object.fromEntries(
            Object.entries(this.data)
                .sort(([_, aData],[__, bData]) => aData.timestamp - bData.timestamp)
                .slice(0, count)

        )

    }
}

module.exports = {subscriptions, chat}; 