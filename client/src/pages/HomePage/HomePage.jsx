/*****************************
 * Component Page: Home Page
 * Purpose: Main application page where the actual chat interface is displayed to the user
 * Notes: none
 ****************************/

import "./HomePage.scss";
import soundChatDing from "../../assets/sounds/ding.mp3";
import ResponseList from "../../components/ResponseList/ResponseList";
import ChatInput from "../../components/ChatInput/ChatInput";
import Sidebar from "../../components/Sidebar/Sidebar";
import Participants from "../../components/Participants/Participants";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import LoadAnimation from "../../components/LoadAnimation/LoadAnimation";

import axios from "axios";
import webapi from "../../utils/webapi";
import { getAuth } from "firebase/auth";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const mainAudioChannel = new Audio();
const speechAudioChannel = new Audio();
let boolAutoScrollFlag = false;
let timerAutoChatInterval;

export default function HomePage() {
  const [objArrayResponses, setobjArrayResponses] = useState([]);
  const [objArraySessions, setObjArraySessions] = useState([]);
  const [objArraypersonalities, setObjArraypersonalities] = useState([]);
  const [strActiveSession, setStrActiveSession] = useState("");
  const [objArrayActiveSessionPersons, setObjArrayActiveSessionPersons] = useState([]);
  const [activeSessionIndex, setActiveSessionIndex] = useState();
  const [objArrayChatContent, setObjArrayChatContent] = useState([]);
  const [boolChatControlEnabled, setBoolChatControlEnabled] = useState(true);

  const refUserInput = useRef();
  const refTTSFlagInput = useRef();
  const refAutoChatFlagInput = useRef();
  const refTakeTurnsFlag = useRef();
  const refChangeTopicsFlag = useRef();
  const refEmojiiFlag = useRef();
  const refShortResponseFlag = useRef();

  const navigate = useNavigate();
  const auth = getAuth();

  let sessionAuthToken = sessionStorage.getItem("accessToken");

  // Upon load, refresh personality and session data, forward user to login page if not signed in, clear all existing timers on unload
  useEffect(() => {
    //Wrapping these in async function to ensure they load in this order on a network with latency
    const refreshData = async () => {
      await refetchPersonalityData();
      await refetchSessionData();
    };
    if (sessionAuthToken) {
      refreshData();
    } else {
      navigate("/signin");
    }

    return () => {
      //ensure any active intervals are cleared if the user goes to a different page.
      clearInterval(timerAutoChatInterval);
    };
  }, []);

  // When active session changes, refresh all data
  useEffect(() => {
    //Wrapping these in async function to ensure they load in this order on a network with latency.
    const refreshData = async () => {
      await refetchSessionData();
      await refetchSessionDetailData();
      await refetchSessionPersonsData();
    };
    //don't bother refreshing these data unless there is an active session selected (ignores blank or null values as trigger)
    if (strActiveSession !== "") {
      refreshData();
    }
  }, [strActiveSession]);

  // Upon changes to chat or personality data, refresh chat content state
  useEffect(() => {
    const objArraypersonalitiesList = objArraypersonalities.map((e) => {
      const obj = {
        name: e.name,
        personalityID: e.personalityID,
        avatarImg: e.avatarImg,
      };
      return obj;
    });
    const sessionChat = objArrayChatContent.map((e) => {
      const senderNameIndex = objArraypersonalitiesList.findIndex((o) => o.personalityID === e.senderID);

      let senderName, avatarImg;
      if (senderNameIndex !== -1) {
        senderName = objArraypersonalitiesList[senderNameIndex].name;
        avatarImg = objArraypersonalitiesList[senderNameIndex].avatarImg;
      } else {
        senderName = "You";
      }
      const obj = {
        name: senderName,
        avatarImg: webapi.URL + "/" + avatarImg,
        content: e.message,
        timestamp: e.timestamp,
        messageID: e.messageID,
        ttsAudioFile: e.ttsAudioFile,
      };
      return obj;
    });
    setobjArrayResponses(sessionChat);
  }, [objArrayChatContent, objArraypersonalities]);


  // Upon changes to chat content, scroll down (if enabled) and reset auto-chat timers
  useEffect(() => {
    if (boolAutoScrollFlag === true) {
      window.scrollTo({ top: 99999, left: 0, behavior: "smooth" });
    }
    //this for auto chat, evertime objArrayResponses are updated this gets reset
    clearInterval(timerAutoChatInterval);
    if (strActiveSession) {
      timerAutoChatInterval = setInterval(() => {
        chatAutoPlay(strActiveSession, objArrayResponses);
      }, 5000);
    }
  }, [objArrayResponses]);

  //function refreshes firebase sesion token upon request.
  function refreshSessionToken() {
    auth.currentUser
      ?.getIdToken()
      .then(function (idToken) {
        sessionAuthToken = idToken;
        sessionStorage.setItem("accessToken", idToken);
      })
      .catch(function (error) {
        alert("Session Refresh Error");
      });
  }

  //function returns required authorization header with sesionToken information used for authenticating with the backend API
  function authHeader(_authToken) {
    refreshSessionToken(); //always refresh session token to ensure user has latest token before returning header
    return {
      headers: {
        Authorization: `Bearer ${sessionAuthToken}`,
      },
    };
  }

  //function for personalities to automatically chat without user interact, managed by a interval timer.
  function chatAutoPlay(strActiveSession, objResponses) {
    if (refAutoChatFlagInput.current.getAttribute("togglevalue") === "true" && strActiveSession !== "") {
      const randomPick = Math.floor(Math.random() * 3);
      //console.log(`randomPick ${randomPick}`);
      if (randomPick === 1) {
        console.log("Auto Chat Event: Active Session is: " + strActiveSession + " checkbox value is: " + refAutoChatFlagInput.current.checked);
        handleSendSkip("" + strActiveSession, objResponses);
      }
    }
  }

  //function to enable/disable boolAutoScrollFlag flag, controlled by other functions as needed.
  function ChangeboolAutoScrollFlag(flag) {
    if (flag === true) {
      boolAutoScrollFlag = true;
    } else {
      boolAutoScrollFlag = false;
    }
  }

  //function to play a chat "ding" sound
  function playNewMessagSound() {
    mainAudioChannel.src = soundChatDing;
    mainAudioChannel.play();
  }

  //function reponsible for fetching session data from the backend.
  async function refetchSessionData() {
    try {
      const response = await axios.get(webapi.URL + "/chatsession", authHeader(sessionAuthToken));
      setObjArraySessions(response.data);
    } catch (error) {
      alert(`HomePage.refetchSessions() request failed with error: ${error}`);
      return false;
    }
    return true;
  }

  //function reponsible for fetching personality data from the backend.
  async function refetchPersonalityData() {
    try {
      const response = await axios.get(webapi.URL + "/personality", authHeader(sessionAuthToken));
      setObjArraypersonalities(response.data);
    } catch (error) {
      alert(`HomePage.fetchobjArraypersonalities() request failed with error: ${error}`);
      return false;
    }
    return true;
  }

  //function reponsible for fetching chat conent data from the backend.
  async function refetchSessionDetailData() {
    try {
      const response = await axios.get(webapi.URL + "/chatsession/" + strActiveSession, authHeader(sessionAuthToken));
      setObjArrayChatContent(response.data);
      setSessionIndex();
    } catch (error) {
      alert(`HomePage.fetchChatHistory() request failed with error: ${error}`);
      return false;
    }
    return true;
  }

  //function reponsible for fetching persons active in the active session from the backend
  async function refetchSessionPersonsData() {
    try {
      const response = await axios.get(webapi.URL + "/chatsession/" + strActiveSession + "/participant", authHeader(sessionAuthToken));
      const activePersons = response.data;
      const personalityDataFiltered = objArraypersonalities.filter((e) => {
        return activePersons.indexOf(e.personalityID) > -1;
      });
      setObjArrayActiveSessionPersons(personalityDataFiltered);
    } catch (error) {
      alert(`HomePage.refetchSessionPersonsData() request failed with error: ${error}`);
      return false;
    }
    return true;
  }

  //function that determines the index of the currrent active sesion in objArraySessions so the active session can be referred as needed
  function setSessionIndex() {
    const optionsIndex = objArraySessions.findIndex((o) => o.sessionID === strActiveSession);
    if (optionsIndex !== -1) {
      setActiveSessionIndex(optionsIndex);
    }
  }

  //function responsible for requesting new TTS audio to be generated on the backend, and then playing it back locally once generated.
  async function getAndPlayTTS(strText, strVoice, strMessageID) {
    try {
      const ttsObj = {
        text: strText,
        voice: strVoice,
        messageID: strMessageID,
      };
      const getURL = webapi.URL + "/ttsgen";
      const response = await axios.post(getURL, ttsObj, authHeader(sessionAuthToken));
      speechAudioChannel.src = webapi.URL + "/" + response.data.result;
      speechAudioChannel.play();
    } catch (error) {
      alert(`HomePage.getAndPlayTTS() request failed with error: ${error}`);
      return -1;
    }
  }

  //function responsible from getting and playing previously generated TTS audio from the backend based on messageID
  async function handleSingleAudioPlayback(messageID) {
    try {
      const getURL = webapi.URL + "/ttsgen/" + messageID;
      const response = await axios.get(getURL, authHeader(sessionAuthToken));
      if (response.data.ttsAudioFile) {
        speechAudioChannel.src = webapi.URL + "/" + response.data.ttsAudioFile;
        speechAudioChannel.play();
      }
    } catch (error) {
      alert(`HomePage.handleSingleAudioPlayback() request failed with error: ${error}`);
      return -1;
    }
  }

  //function to send new chat input from the user to the backend and receive replies
  async function handleSendChat(event){
    if (!refUserInput.current.value) {
      return;
    }
    const objArraypersonalitiesList = objArraypersonalities.map((e) => {
      const obj = {
        name: e.name,
        personalityID: e.personalityID,
        avatarImg: webapi.URL + "/" + e.avatarImg,
        voice: e.voice,
      };
      return obj;
    });
    try {
      const strUserChatInput = refUserInput.current.value;
      refUserInput.current.value = "";
      const objPriorResponsesAndUser = [...objArrayResponses, { name: "You", content: strUserChatInput, timestamp: Date.now() }];
      setobjArrayResponses([...objPriorResponsesAndUser]);
      setBoolChatControlEnabled(false);
      ChangeboolAutoScrollFlag(true);
      
      const postURL = webapi.URL + "/chatsession/" + strActiveSession;
      const response = await axios.post(postURL, { senderID: "User", message: strUserChatInput }, authHeader(sessionAuthToken));
      const senderNameIndex = objArraypersonalitiesList.findIndex((o) => o.personalityID === response.data.senderID);
      if (response.data.message) {
        setobjArrayResponses([...objPriorResponsesAndUser, { name: objArraypersonalitiesList[senderNameIndex].name, content: response.data.message, timestamp: response.data.timestamp, avatarImg: objArraypersonalitiesList[senderNameIndex].avatarImg, messageID: response.data.messageID }]);
        playNewMessagSound();
        if (refTTSFlagInput.current.getAttribute("togglevalue") === "true") {
          getAndPlayTTS(response.data.message, objArraypersonalitiesList[senderNameIndex].voice, response.data.messageID);
        }
      } 
      setBoolChatControlEnabled(true);
      refUserInput.current.focus();
    } catch (error) {
      alert(`HomePage.handleSendChat() request failed with error: ${error}`);
      setBoolChatControlEnabled(true);
      return false;
    }
    return true;
  };

  //function for handling session change by the user
  async function handleSessionChange(sessionID){
    ChangeboolAutoScrollFlag(false);
    setStrActiveSession(sessionID);
  };

  //function for handling session add by the user
  async function handleAddSession(){
    try {
      const postURL = webapi.URL + "/chatsession";
      const response = await axios.post(postURL, { sessionName: "New Session" }, authHeader(sessionAuthToken));
      refetchSessionData();
    } catch (error) {
      alert(`HomePage.handleAddSesion() request failed with error: ${error}`);
      return -1;
    }
  };

  //function for handling session delete by the user
  async function handleDeleteSession(sessionID){
    try {
      const delURL = webapi.URL + "/chatsession/" + sessionID;
      const response = await axios.delete(delURL, authHeader(sessionAuthToken));
      if (sessionID === strActiveSession) {
        setStrActiveSession("");
        clearInterval(timerAutoChatInterval); 
      }
      refetchSessionData();
    } catch (error) {
      alert(`HomePage.handleAddSesion() request failed with error: ${error}`);
      return -1;
    }
  };

  //function for handling session name change by the user
  async function handleUpdateSession(sessionID, sessionName){
    try {
      const putURL = webapi.URL + "/chatsession/" + sessionID;
      const response = await axios.put(putURL, { sessionName: sessionName }, authHeader(sessionAuthToken));
      refetchSessionData();
    } catch (error) {
      alert(`HomePage.handleUpdateSession() request failed with error: ${error}`);
      return -1;
    }
  };

  //function for "skip chat" where the user forces a chat reply from the server without inputting anything
  async function handleSendSkip(strAutoChatSession, objAutoChatResponses){
    let currentActiveSession;
    let currentResponses;

    //If this function is called from ChatAutoPlay(), we have to use local verisons of state variables form ChatAutoPlay()
    //otherwise the data whicih the scope of the setInterval wrapper won't be up to date.
    if (typeof strAutoChatSession === "string") {
      currentActiveSession = strAutoChatSession;
      currentResponses = objAutoChatResponses;
    } else {
      currentActiveSession = strActiveSession;
      currentResponses = objArrayResponses;
    }

    const objArraypersonalitiesList = objArraypersonalities.map((e) => {
      const obj = {
        name: e.name,
        personalityID: e.personalityID,
        avatarImg: webapi.URL + "/" + e.avatarImg,
        voice: e.voice,
      };
      return obj;
    });
    try {
      setBoolChatControlEnabled(false);
      const getURL = webapi.URL + "/chatsession/" + currentActiveSession + "/auto";
      const response = await axios.get(getURL, authHeader(sessionAuthToken));
      const senderNameIndex = objArraypersonalitiesList.findIndex((o) => o.personalityID === response.data.senderID);
      ChangeboolAutoScrollFlag(true);
      if (response.data.message) {
        setobjArrayResponses([...currentResponses, { name: objArraypersonalitiesList[senderNameIndex].name, content: response.data.message, timestamp: response.data.timestamp, avatarImg: objArraypersonalitiesList[senderNameIndex].avatarImg, messageID: response.data.messageID }]);
        playNewMessagSound();
        if (refTTSFlagInput.current.getAttribute("togglevalue") === "true") {
          getAndPlayTTS(response.data.message, objArraypersonalitiesList[senderNameIndex].voice, response.data.messageID);
        }
      }
      setBoolChatControlEnabled(true);
    } catch (error) {
      alert(`HomePage.handleSendSkip() request failed with error: ${error}`);
      setBoolChatControlEnabled(true);
      return -1;
    }
  };

  //function for handling personality remove from active session by the user
  async function handleRemovePersonFromSession(personObj, sessionID){
    try {
      const delURL = webapi.URL + "/chatsession/" + sessionID + "/participant/" + personObj.personalityID;
      const response = await axios.delete(delURL, authHeader(sessionAuthToken));
      const personsFiltered = objArrayActiveSessionPersons.filter((e) => {
        return e.personalityID !== personObj.personalityID;
      });
      setObjArrayActiveSessionPersons(personsFiltered);
      ChangeboolAutoScrollFlag(true);
      setobjArrayResponses([...objArrayResponses, { name: "JanusGPT", content: `${personObj.name} left the chat!`, timestamp: Date.now() }]);
    } catch (error) {
      alert(`HomePage.handleRemovePersonFromSession() request failed with error: ${error}`);
      return -1;
    }
  };

  //function for handling personality add from active session by the user
  async function handleAddPersonToSession(personObj, sessionID){
    try {
      const postURL = webapi.URL + "/chatsession/" + sessionID + "/participant/" + personObj.personalityID;
      const response = await axios.post(postURL, {}, authHeader(sessionAuthToken));
      setObjArrayActiveSessionPersons([...objArrayActiveSessionPersons, personObj]);
      ChangeboolAutoScrollFlag(true);
      setobjArrayResponses([...objArrayResponses, { name: "JanusGPT", content: `${personObj.name} entered the chat!`, timestamp: Date.now() }]);
    } catch (error) {
      alert(`HomePage.handleAddPersonToSession() request failed with error: ${error}`);
      return -1;
    }
  };

 //function for handling changes to the curret session options/flags by the user
  async function handleChangeCurrentSessionOptions(){
    try {
      if (objArraySessions[activeSessionIndex]?.sessionName === undefined) {
        return;
      } else {
      }

      const putURL = webapi.URL + "/chatsession/" + strActiveSession;
      const response = await axios.put(putURL, { sessionName: objArraySessions[activeSessionIndex].sessionName, optionTurns: refTakeTurnsFlag.current.getAttribute("toggleValue") === "true" ? 1 : 0, optionShort: refShortResponseFlag.current.getAttribute("toggleValue") === "true" ? 1 : 0, optionTopics: refChangeTopicsFlag.current.getAttribute("toggleValue") === "true" ? 1 : 0, optionEmojii: refEmojiiFlag.current.getAttribute("toggleValue") === "true" ? 1 : 0 }, authHeader(sessionAuthToken));
    } catch (error) {
      alert(`HomePage.handleChangeCurrentSessionOptions() request failed with error: ${error}`);
      console.log(refTakeTurnsFlag.current.getAttribute("toggleValue") === "true" ? 1 : 0);
      return -1;
    }
  };

  return (
    <div className="HomePage">
      <div className="HomePage__selectionBar">
        <Participants strActiveSession={strActiveSession} objArrayActivePersonalities={objArrayActiveSessionPersons} objArrayPersonalities={objArraypersonalities} removePersonCallBack={handleRemovePersonFromSession} addPersonCallBack={handleAddPersonToSession} />
      </div>
      <div className="HomePage__side">
        <Sidebar objArrChatSessions={objArraySessions} switchSessionCallBack={handleSessionChange} addSessionCallback={handleAddSession} deleteSessionCallback={handleDeleteSession} updateSessionCallback={handleUpdateSession} strActiveSession={strActiveSession} />
      </div>
      <div className="HomePage__main">
        <h1 className="HomePage__main__title font-pageTitle">{objArraySessions[activeSessionIndex]?.sessionName}</h1>
        {strActiveSession ? (
          <div className="HomePage__main__sessionOptions">
            <ToggleSwitch refToggleInput={refTakeTurnsFlag} boolDefaultState={!!objArraySessions[activeSessionIndex]?.optionTurns} strIconName="Take Turns" boolHideLabel={false} callback={handleChangeCurrentSessionOptions} />
            <ToggleSwitch refToggleInput={refChangeTopicsFlag} boolDefaultState={!!objArraySessions[activeSessionIndex]?.optionTopics} strIconName="Switch Topics" boolHideLabel={false} callback={handleChangeCurrentSessionOptions} />
            <ToggleSwitch refToggleInput={refEmojiiFlag} boolDefaultState={!!objArraySessions[activeSessionIndex]?.optionEmojii} strIconName="Emojiis" boolHideLabel={false} callback={handleChangeCurrentSessionOptions} />
            <ToggleSwitch refToggleInput={refShortResponseFlag} boolDefaultState={!!objArraySessions[activeSessionIndex]?.optionShort} strIconName="Short Reply" boolHideLabel={false} callback={handleChangeCurrentSessionOptions} />
          </div>
        ) : (
          <></>
        )}

        <div className="HomePage__main__content">
          <ResponseList objArrayResponses={objArrayResponses} audioPlayCallBack={handleSingleAudioPlayback} />
          {(boolChatControlEnabled)?(<></>):(<LoadAnimation/>)}
        </div>
      </div>
      <div className="HomePage__input">
        <ChatInput sendChatCallBack={handleSendChat} refUserInput={refUserInput} skipCallBack={handleSendSkip} refTTSFlagInput={refTTSFlagInput} refAutoChatFlagInput={refAutoChatFlagInput} strActiveSession={strActiveSession} boolChatControlEnabled={boolChatControlEnabled} />
      </div>
    </div>
  );
}
