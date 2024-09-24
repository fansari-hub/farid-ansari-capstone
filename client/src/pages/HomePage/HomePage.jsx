import "./HomePage.scss";
import ResponseList from "../../components/ResponseList/ResponseList";
import ChatInput from "../../components/ChatInput/ChatInput";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import webapi from "../../utils/webapi";
import { useState, useRef, useEffect } from "react";

export default function HomePage() {
  let [responses, setResponses] = useState([]);
  let [sessions, setSessions] = useState([{sessionName: "Blank"}]);
  let [personalities, setPersonalities] = useState([]);
  let [activeSession, setActiveSession] = useState("");
  let [chatlog, setChatlog] = useState([]);
  let userInput = useRef();
  let chatDiv = useRef();

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
      };
      return obj;
    });
    const sessionChat = chatlog.map((e) => {
      const senderNameIndex = personalitiesList.findIndex((o) => o.personalityID === e.senderID);

      let senderName;
      if (senderNameIndex !== -1) {
        senderName = personalitiesList[senderNameIndex].name;
      } else {
        senderName = "You";
      }
      const obj = {
        name: senderName,
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
      };
      return obj;
    });
    try {
      const postURL = webapi.URL + "/chatsession/" + activeSession;
      const response = await axios.post(postURL, { senderID: "User", message: userInput.current.value });
      const senderNameIndex = personalitiesList.findIndex((o) => o.personalityID === response.data.senderID);
      setResponses([...responses, { name: "You", content: userInput.current.value, timestamp: Date.now() }, { name: personalitiesList[senderNameIndex].name, content: response.data.message, timestamp: response.data.timestamp }]);
    } catch (error) {
      alert(`HomePage.handleSendChat() request failed with error: ${error}`);
      return -1;
    }
  };

  const handleSessionChange = async (sessionID) => {
    setActiveSession(sessionID);
  }

  return (
    <div className="HomePage">
      <div className="HomePage__side">
        <Sidebar chatSessions ={sessions} switchSessionCallBack={handleSessionChange}/>
      </div>
      <div className="HomePage__main">
        <div ref={chatDiv} className="HomePage__main__content">
          <ResponseList responses={responses} />
        </div>
        <div className="HomePage__main__input">
          <ChatInput callback={handleSendChat} userInput={userInput} />
        </div>
      </div>
    </div>
  );
}
