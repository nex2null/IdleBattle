class BattleLog {

  // Properties
  messages: Array<string> = [];

  // Constructor
  constructor() {
  }

  // Add a message to the log
  addMessage(message: string) {
    if (this.messages.length == 10)
      this.messages.shift();

    this.messages.push(message);
  }
}

export default BattleLog;