const subscription = {
    data: [],
    listeners: [],

    add(item){
        this.data.push(item);
        
        this.listeners.forEach(handler => handler(item))
    },

    listen(handler){
        this.listeners.push(handler)
    },

    delete(item){
        console.log(item)
        this.data = this.data.filter(sub => sub.name !== item.name)
        console.log(this.data)

        this.listeners.forEach(handler => handler(item))
    }
}

module.exports = subscription; 