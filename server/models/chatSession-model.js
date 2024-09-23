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
      this.data = {}; //a little trick to have the session ID available even if promise is not resolved yet.
      this.data.sessionID = strSessionID;
      this.data.currentSessionHistory = [];

      queryResult.then((queryResult) => {
        this.data.sessionName = queryResult[0].sessionName;
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
