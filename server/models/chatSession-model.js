const { v4: uuidv4 } = require("uuid");

class ChatSession {
  constructor(name) {
    if (!name) {
      throw Error("ChatSession: You must provide a session name for the constructor");
    }

    this.data = {
      "sessionID" : uuidv4(),
      "sessionName" : name,
      "currentSessionHistory" : [],
    }
    return this;
  }

  setChatPrivate(strReceiverID, strSenderID, strMessage) {
    if (!strReceiverID || !strSenderID || !strMessage) {
      throw Error("ChatSession.setChatPrivate: You must provide ReceiverID, SenderID and Message");
    }
    this.data.currentSessionHistory.push({
      session_id: this.sessionID,
      sender: strSenderID,
      receiver: strReceiverID,
      message: strMessage,
      timestamp: Date.now(),
      message_id : uuidv4(),
    });
  }

  setChatGlobal(strSenderID, strMessage) {
    if (!strSenderID || !strMessage) {
      throw Error("ChatSession.setChatglobal: You must provide SenderID and Message");
    }

    let newIndex = this.data.currentSessionHistory.push({
      session_id: this.sessionID,
      sender: strSenderID,
      receiver: "",
      message: strMessage,
      timestamp: Date.now(),
      message_id : uuidv4(),
    });

    return this.data.currentSessionHistory[newIndex-1];
  }

  getCurrentSessionChat(strSession_id) {
    if (!strSession_id) {
      throw Error("ChatSession.getCurrentSessionChat: You must provide a session ID!");
    }
    const history = this.currentSessionHistory.filter((e) => e.session_id === strSession_id);
    return history;
  }
}

module.exports = { ChatSession };
