import "./HomePage.scss";
import ResponseList from "../../components/ResponseList/ResponseList";
import ChatInput from "../../components/ChatInput/ChatInput";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import webapi from "../../utils/webapi";
import { useState, useRef, useEffect } from "react";
import soundChatDing from "../../assets/sounds/ding.mp3"
const mainAudioChannel = new Audio();
const speechAudioChannel = new Audio();
let autoScroll = false;
let autoChatInterval;



export default function HomePage() {
  let [responses, setResponses] = useState([]);
  let [sessions, setSessions] = useState([]);
  let [personalities, setPersonalities] = useState([]);
  let [activeSession, setActiveSession] = useState("");
  let [activeSessionTitle, setActiveSessionTitle] = useState("");
  let [chatlog, setChatlog] = useState([]);
  
  let userInput = useRef();
  let inputTTSflag = useRef();
  let inputAutoChatFlag = useRef();
  let chatDiv = useRef();
  


  
  useEffect(() => {
    refetchSessionData();
    refetchPersonalityData();
    return () => {
      //ensure any active intervals are cleared if the user goes to a different page.
      clearInterval(autoChatInterval); 
    }
  }, []);

  useEffect(() => {
    refetchSessionDetailData();
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
        messageID : e.messageID,
        ttsAudioFile: e.ttsAudioFile
      };
      return obj;
    });
    setResponses(sessionChat);
  }, [chatlog, personalities]);

  useEffect(() => {
    if (autoScroll === true){
      window.scrollTo({ top: 99999, left: 0, behavior: "smooth" });
    }
    //this for auto chat, evertime responses are updated this gets reset
    clearInterval(autoChatInterval); 
    autoChatInterval = setInterval(() => {
      chatAutoPlay(activeSession, responses);
    }, 5000);
      
  }, [responses]);


  function chatAutoPlay(strActiveSession, objResponses){
    //console.log("Chat Auto: Active Session is: " + activeSession + " checkbox value is: " + inputAutoChatFlag.current.checked);
    if (inputAutoChatFlag.current.checked === true && strActiveSession !=="")
    {
      const randomPick = Math.floor(Math.random() * 3);
      //console.log(`randomPick ${randomPick}`);
      if (randomPick === 1) {
        console.log("Auto Chat Event: Active Session is: " + strActiveSession + " checkbox value is: " + inputAutoChatFlag.current.checked);
        //console.log(objResponses);
        handleSendSkip(strActiveSession, objResponses);
      }
    }
    
  }
  
  function ChangeAutoScroll(flag){
    if (flag === true){
      autoScroll = true
    } else{
      autoScroll = false
    }
  }

  function playNewMessagSound(){
    mainAudioChannel.src = soundChatDing;
    mainAudioChannel.play();
  }

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
  
  async function refetchPersonalityData(){
    try {
      setPersonalities([]);
      const response = await axios.get(webapi.URL + "/personality");
      setPersonalities(response.data);
    } catch (error) {
      alert(`HomePage.fetchPersonalities() request failed with error: ${error}`);
    }
  }

  async function refetchSessionDetailData(){
    try {
      const response = await axios.get(webapi.URL + "/chatsession/" + activeSession);
      setChatlog(response.data);
      setSessionTitle();
    } catch (error) {
      alert(`HomePage.fetchChatHistory() request failed with error: ${error}`);
    }
  };

  function setSessionTitle(){
    const titleIndex = sessions.findIndex((o) => o.sessionID === activeSession);
    if (titleIndex !== -1) {
      setActiveSessionTitle(sessions[titleIndex].sessionName)
    }
  }

  async function getAndPlayTTS (strText, strVoice, strMessageID) {
    try{
      const ttsObj = {
        "text": strText,
        "voice":  strVoice,
        "messageID" : strMessageID
      }
      const getURL = webapi.URL + "/ttsgen";
      const response = await axios.post(getURL, ttsObj);
      speechAudioChannel.src = webapi.URL + "/" + response.data.result;
      speechAudioChannel.play();
    }catch (error){
      alert(`HomePage.getAndPlayTTS() request failed with error: ${error}`);
      return -1;
    }
  }

  async function handleSingleAudioPlayback(messageID){
    try{
      const getURL = webapi.URL + "/ttsgen/" + messageID
      const response = await axios.get(getURL);
      if (response.data.ttsAudioFile){
        speechAudioChannel.src = webapi.URL + "/" + response.data.ttsAudioFile;
        speechAudioChannel.play();
      }
    }catch (error){
      alert(`HomePage.handleSingleAudioPlayback() request failed with error: ${error}`);
      return -1;
    }
  }


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
      ChangeAutoScroll(true);
      setResponses([...responses, { name: "You", content: userInput.current.value, timestamp: Date.now() }, { name: personalitiesList[senderNameIndex].name, content: response.data.message, timestamp: response.data.timestamp, avatarImg :  personalitiesList[senderNameIndex].avatarImg, messageID: response.data.messageID}]);
      playNewMessagSound();
      if (inputTTSflag.current.checked === true){
        getAndPlayTTS(response.data.message, personalitiesList[senderNameIndex].voice, response.data.messageID );
      }
    } catch (error) {
      alert(`HomePage.handleSendChat() request failed with error: ${error}`);
      return -1;
    }
  };

  const handleSessionChange = async (sessionID) => {
    ChangeAutoScroll(false);
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

  const handleSendSkip = async (strAutoChatSession, objAutoChatResponses) => {
    let currentActiveSession;
    let currentResponses;

    //If this function is called from ChatAutoPlay(), we have to use local verisons of state variables form ChatAutoPlay()
    //otherwise the data whicih the scope of the setInterval wrapper won't be up to date.
    if (strAutoChatSession){
      currentActiveSession= strAutoChatSession
    }
    else{
      currentActiveSession = activeSession;
    }

    if (objAutoChatResponses){
      currentResponses = objAutoChatResponses
    }
    else{
      currentResponses = responses;
    }

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
      const getURL = webapi.URL + "/chatsession/" + currentActiveSession + "/auto";
      const response = await axios.get(getURL);
      const senderNameIndex = personalitiesList.findIndex((o) => o.personalityID === response.data.senderID);
      ChangeAutoScroll(true);
      setResponses([...currentResponses, { name: personalitiesList[senderNameIndex].name, content: response.data.message, timestamp: response.data.timestamp, avatarImg :  personalitiesList[senderNameIndex].avatarImg, messageID: response.data.messageID}]);
      playNewMessagSound();
      if (inputTTSflag.current.checked === true){
        getAndPlayTTS(response.data.message, personalitiesList[senderNameIndex].voice, response.data.messageID );
      }
    } catch (error) {
      alert(`HomePage.handleSendSkip() request failed with error: ${error}`);
      return -1;
    }
  };


  return (
    <div className="HomePage">
      <div className="HomePage__side">
        <Sidebar chatSessions={sessions} switchSessionCallBack={handleSessionChange} addSessionCallback={handleAddSession} deleteSessionCallback={handleDeleteSession} updateSessionCallback={handleUpdateSession} activeSession={activeSession}/>
      </div>
      <div className="HomePage__main">
      < h1 className="HomePage__main__title">{activeSessionTitle}</h1>
        <div ref={chatDiv} className="HomePage__main__content">
           
          <ResponseList responses={responses} audioPlayCallBack={handleSingleAudioPlayback} />
        </div>
        <div className="HomePage__main__input">
          <ChatInput sendChatCallBack={handleSendChat} userInput={userInput} skipCallBack={handleSendSkip} inputTTSflag={inputTTSflag} inputAutoChatFlag={inputAutoChatFlag} />
        </div>
      </div>
    </div>
  );
}
