function machine(name) {
    return new Action(name)
}
const defer = (time, callback) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(callback())
        }, time * 1000)
    })
}
class QueueItem {
    constructor(defer, callback) {
        this.defer = defer;
        this.callback = callback;
    }
}
class Action {
    queue = []
    constructor(name) {
        this.name = name;
        this.queue.push(new QueueItem(0, () => console.log(`start ${this.name}`)))
    }
    do(eat) {
        this.queue.push(new QueueItem(0, () => console.log(`${this.name} ${eat}`)))
        return this;
    }
    wait(time) {
        this.queue.push(new QueueItem(time, () => console.log(`wait ${time}s`)))
        return this;
    }
    waitFirst(time) {
        this.queue.unshift(new QueueItem(time, () => console.log(`wait ${time}s`)))
        return this;
    }
    async execute() {
        while(this.queue.length > 0) {
            const curItem = this.queue.shift();
            if (!curItem.defer) {
                curItem.callback();
                continue;
            }
            await defer(curItem.defer, curItem.callback)
        }
    }
}