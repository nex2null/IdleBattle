class BattleLog {

  // Properties
  messages: Array<string> = [];
  callback: (str: string) => any = () => { };

  // Constructor
  constructor() {
  }

  // Add a message to the log
  addMessage(message: string) {
    if (this.messages.length == 10)
      this.messages.shift();

    this.messages.push(message);
    this.callback(message);
  }
}

export default BattleLog;