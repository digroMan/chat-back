const subscription = {
    data: [],
    listeners: [], // массив слушателей события

    add(item){
        this.data.push(item);

        this.listeners.forEach(handler => handler(item))
    },

    listen(handler){
        this.listeners.push(handler)
    },

    delete(item){
        this.data = this.data.filter(sub => sub.name !== item)

        this.listeners.forEach(handler => handler(item))
    }
}

module.exports = subscription; // необоходимо везде заменить логику, где упоминается subscription 