export default class {

    constructor() {
        this.messages = [];
    }

    addMessage(message) {
        if (this.messages.length == 10)
            this.messages.shift();
            
        this.messages.push(message);
    }
}