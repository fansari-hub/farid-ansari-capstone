const knexops = require("./utils/knexops");
const { v4: uuidv4 } = require("uuid");

class ChatSession {
  static async getChatSessions() {
    const queryResult = await knexops.selectDatabase("sessionID", "chatSessions");
    return queryResult;
  }

  static async getChatSessionChatDetail(strSessionID) {
    const queryResult = await knexops.selectDatabaseAll("chatSessionHist", {sessionId: strSessionID});
    return queryResult;
  }

  constructor(strSessionID, strName) {
    
    if (strSessionID && typeof strSessionID === "string") {
      const queryResult = knexops.selectDatabaseAll("chatSessions", { sessionID: strSessionID });
      queryResult.then((queryResult) => {
        this.data = queryResult[0];
        this.data.currentSessionHistory = [];
      });
      const queryResultSession = knexops.selectDatabaseAll("chatSessionHist", { sessionID: strSessionID });
      queryResultSession.then((queryResultSession) => {
        this.data.currentSessionHistory = queryResultSession;
      });

    } else {
      if (!strName) {
        throw Error("ChatSession: You must provide a session name for the constructor to initate a new session!");
      }
      this.data = {
        sessionID: uuidv4(),
        sessionName: strName,
        currentSessionHistory: [],
      };
      knexops.insertDatabase("chatSessions", { sessionID: this.data.sessionID, sessionName: this.data.sessionName });
    }
    return this;
  }

  setChatPrivate(strReceiverID, strSenderID, strMessage) {
    if (!strReceiverID || !strSenderID || !strMessage) {
      throw Error("ChatSession.setChatPrivate: You must provide ReceiverID, SenderID and Message");
    }
    const dataObj = {
      sessionID: this.data.sessionID,
      senderID: strSenderID,
      receiverID: strReceiverID,
      message: strMessage,
      timestamp: Date.now(),
      messageID: uuidv4()
    };

    this.data.currentSessionHistory.push(dataObj);
    knexops.insertDatabase("chatSessionHist", dataObj);
    return dataObj;
  }

  setChatGlobal(strSenderID, strMessage) {
    if (!strSenderID || !strMessage) {
      throw Error("ChatSession.setChatglobal: You must provide SenderID and Message");
    }
    const dataObj = {
      sessionID: this.data.sessionID,
      senderID: strSenderID,
      receiverID: "",
      message: strMessage,
      timestamp: Date.now(),
      messageID: uuidv4()
    };

    this.data.currentSessionHistory.push(dataObj);
    knexops.insertDatabase("chatSessionHist", dataObj);
    return dataObj;
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
