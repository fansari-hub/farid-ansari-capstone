const { v4: uuidv4 } = require("uuid");

class ChatSession {
  constructor(name) {
    this.sessionID = uuidv4();
    this.sessionName = name;
    this.currentSessionHistory = [];
    return this;
  }

  setChatPrivate(strReceiverID, strSenderID, strMessage) {
    this.currentSessionHistory.push({
      session_id: this.sessionID,
      sender: strSenderID,
      receiver: strReceiverID,
      message: strMessage,
      timestamp: Date.now(),
    });
  }

  setChatGlobal(strSenderID, strMessage) {
    this.currentSessionHistory.push({
      session_id: this.sessionID,
      sender: strSenderID,
      receiver: '',
      message: strMessage,
      timestamp: Date.now(),
    });
  }

  getCurrentSessionChat(strSession_id) {
    const history = this.currentSessionHistory.filter((e) => e.session_id === strSession_id);
    return history;
  }
}

module.exports = { ChatSession };
