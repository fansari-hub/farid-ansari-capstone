import "./HomePage.scss";
import ResponseList from "../../components/ResponseList/ResponseList";
import ChatInput from "../../components/ChatInput/ChatInput";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import webapi from "../../utils/webapi";
import { useState, useRef, useEffect } from "react";

export default function HomePage() {
  let [responses, setResponses] = useState([]);
  let [sessions, setSessions] = useState([]);
  let [personalities, setPersonalities] = useState([]);
  let [activeSession, setActiveSession] = useState("");
  let [chatlog, setChatlog] = useState([]);
  let userInput = useRef();
  let inputTTSflag = useRef();
  let chatDiv = useRef();

  async function refetchSessionData(){
    try {
      setSessions([]);
      const response = await axios.get(webapi.URL + "/chatsession");
      setSessions(response.data);
      setActiveSession(response.data[0].sessionID);
    } catch (error) {
      alert(`HomePage.fetchSessions() request failed with error: ${error}`);
    }
  }
  
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(webapi.URL + "/chatsession");
        setSessions(response.data);
        setActiveSession(response.data[0].sessionID);
      } catch (error) {
        alert(`HomePage.fetchSessions() request failed with error: ${error}`);
      }
    };
    fetchSessions();

    const fetchPersonalities = async () => {
      try {
        const response = await axios.get(webapi.URL + "/personality");
        setPersonalities(response.data);
      } catch (error) {
        alert(`HomePage.fetchPersonalities() request failed with error: ${error}`);
      }
    };
    fetchPersonalities();
  }, []);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(webapi.URL + "/chatsession/" + activeSession);
        setChatlog(response.data);
      } catch (error) {
        alert(`HomePage.fetchChatHistory() request failed with error: ${error}`);
      }
    };
    fetchChatHistory();
  }, [activeSession]);

  useEffect(() => {
    const personalitiesList = personalities.map((e) => {
      const obj = {
        name: e.name,
        personalityID: e.personalityID,
        avatarImg: e.avatarImg
      };
      return obj;
    });
    const sessionChat = chatlog.map((e) => {
      const senderNameIndex = personalitiesList.findIndex((o) => o.personalityID === e.senderID);

      let senderName, avatarImg;
      if (senderNameIndex !== -1) {
        senderName = personalitiesList[senderNameIndex].name;
        avatarImg = personalitiesList[senderNameIndex].avatarImg;
      } else {
        senderName = "You";
      }
      const obj = {
        name: senderName,
        avatarImg: webapi.URL + "/" + avatarImg,
        content: e.message,
        timestamp: e.timestamp,
      };
      return obj;
    });
    setResponses(sessionChat);
  }, [chatlog, personalities]);

  useEffect(() => {
    chatDiv.current.scrollTo({ top: chatDiv.current.scrollHeight, behavior: "smooth" });
  }, [responses]);

  const handleSendChat = async (event) => {
    const personalitiesList = personalities.map((e) => {
      const obj = {
        name: e.name,
        personalityID: e.personalityID,
        avatarImg : webapi.URL + "/" + e.avatarImg,
        voice: e.voice
      };
      return obj;
    });
    try {
      const postURL = webapi.URL + "/chatsession/" + activeSession;
      const response = await axios.post(postURL, { senderID: "User", message: userInput.current.value });
      const senderNameIndex = personalitiesList.findIndex((o) => o.personalityID === response.data.senderID);
      setResponses([...responses, { name: "You", content: userInput.current.value, timestamp: Date.now() }, { name: personalitiesList[senderNameIndex].name, content: response.data.message, timestamp: response.data.timestamp, avatarImg :  personalitiesList[senderNameIndex].avatarImg }]);
      if (inputTTSflag.current.value === "on"){
        getAndPlayTTS(response.data.message, personalitiesList[senderNameIndex].voice );
      }
    } catch (error) {
      alert(`HomePage.handleSendChat() request failed with error: ${error}`);
      return -1;
    }
  };

  const handleSessionChange = async (sessionID) => {
    setActiveSession(sessionID);
  };

  const handleAddSession = async () => {
    try {
      const postURL = webapi.URL + "/chatsession";
      const response = await axios.post(postURL, { sessionName: "New Session" });
      refetchSessionData();
    } catch (error) {
      alert(`HomePage.handleAddSesion() request failed with error: ${error}`);
      return -1;
    }
  };

  const handleDeleteSession = async (sessionID) => {
    try {
      const delURL = webapi.URL + "/chatsession/" + sessionID;
      const response = await axios.delete(delURL);
      refetchSessionData();
    } catch (error) {
      alert(`HomePage.handleAddSesion() request failed with error: ${error}`);
      return -1;
    }
  };

  const handleUpdateSession = async (sessionID, sessionName) => {
    try {
      const putURL = webapi.URL + "/chatsession/" + sessionID;
      const response = await axios.put(putURL, {"sessionName" : sessionName});
      refetchSessionData();
    } catch (error) {
      alert(`HomePage.handleUpdateSession() request failed with error: ${error}`);
      return -1;
    }
  };

  const handleSendSkip = async (event) => {
    const personalitiesList = personalities.map((e) => {
      const obj = {
        name: e.name,
        personalityID: e.personalityID,
        avatarImg : webapi.URL + "/" + e.avatarImg,
        voice: e.voice
      };
      return obj;
    });
    try {
      const getURL = webapi.URL + "/chatsession/" + activeSession + "/auto";
      const response = await axios.get(getURL);
      const senderNameIndex = personalitiesList.findIndex((o) => o.personalityID === response.data.senderID);
      setResponses([...responses, { name: personalitiesList[senderNameIndex].name, content: response.data.message, timestamp: response.data.timestamp, avatarImg :  personalitiesList[senderNameIndex].avatarImg  }]);
      if (inputTTSflag.current.value === "on"){
        getAndPlayTTS(response.data.message, personalitiesList[senderNameIndex].voice );
      }
    } catch (error) {
      alert(`HomePage.handleSendSkip() request failed with error: ${error}`);
      return -1;
    }
  };

  const getAndPlayTTS = async (strText, strVoice) => {
    try{
      const ttsObj = {
        "text": strText,
        "voice":  strVoice
      }
      const getURL = webapi.URL + "/ttsgen";
      const response = await axios.post(getURL, ttsObj);
    }catch (error){
      alert(`HomePage.getAndPlayTTS() request failed with error: ${error}`);
      return -1;
    }
    
  }

  return (
    <div className="HomePage">
      <div className="HomePage__side">
        <Sidebar chatSessions={sessions} switchSessionCallBack={handleSessionChange} addSessionCallback={handleAddSession} deleteSessionCallback={handleDeleteSession} updateSessionCallback={handleUpdateSession} />
      </div>
      <div className="HomePage__main">
        <div ref={chatDiv} className="HomePage__main__content">
          <ResponseList responses={responses} />
        </div>
        <div className="HomePage__main__input">
          <ChatInput sendChatCallBack={handleSendChat} userInput={userInput} skipCallBack={handleSendSkip} inputTTSflag={inputTTSflag} />
        </div>
      </div>
    </div>
  );
}
