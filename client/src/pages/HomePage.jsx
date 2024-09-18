import "./HomePage.scss";
import logo from "../logo.svg";
import ResponseList from "../components/ResponseList/ResponseList";
import axios from "axios";
import webapi from "../utils/webapi";
import { useState, useRef, useEffect } from "react";

export default function HomePage() {
  let [responses, setResponses] = useState([]);

  let userInput = useRef();
  let userImg = useRef();
  let chatDiv = useRef();

  useEffect(() => {
    chatDiv.current.scrollTo({ top: 10000, left: 0, behavior: "smooth" });
  }, [responses]);

  const handleSendChat = async (event) => {
    try {
      const postURL = webapi.URL + "/chatgpt";
      const response = await axios.post(postURL, { message: userInput.current.value });
      setResponses([...responses, { name: "You", content: userInput.current.value, timestamp: Date.now() }, { name: "NodeGPT", content: response.data.reply, timestamp: response.data.timestamp }]);
    } catch (error) {
      alert(`HomePage.handleSendChat() request failed with error: ${error}`);
      return -1;
    }
  };

  const handleShowImage = async (event) => {
    try {
      const postURL = webapi.URL + "/chatgpt/vision";
      const uploadFile = userImg.current.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = async () => {
        const response = await axios.post(postURL, { message: userInput.current.value, imgBase64: fileReader.result });
        setResponses([...responses, { name: "You", content: userInput.current.value, timestamp: Date.now(), image: URL.createObjectURL(uploadFile) }, { name: "NodeGPT", content: response.data.reply, timestamp: response.data.timestamp, image: null }]);
      };
      fileReader.readAsDataURL(uploadFile);
    } catch (error) {
      alert(`HomePage.handleSendChat() request failed with error: ${error}`);
      return -1;
    }
  };

  const handleResetChat = async (event) => {
    try {
      const delURL = webapi.URL + "/chatgpt";
      const response = await axios.delete(delURL);
      setResponses([]);
    } catch (error) {
      alert(`HomePage.handleResetChat() request failed with error: ${error}`);
      return -1;
    }
  };

  const handleGenerateTTS = async (event) => {
    try {
      const postURL = webapi.URL + "/chatgpt/tts";
      const response = await axios.post(postURL);
      const audio = new Audio();
      console.log(response.data.audioURL);
      audio.src = response.data.audioURL;
      audio.play();
    } catch (error) {
      alert(`HomePage.handleGenerateTTS() request failed with error: ${error}`);
      return -1;
    }
  };

  const handleGenerateImage = async (event) => {
    try {
      const postURL = webapi.URL + "/chatgpt/imagegen";
      const response = await axios.post(postURL, { message: userInput.current.value });
      setResponses([...responses, { name: "You", content: userInput.current.value, timestamp: Date.now(), image: null }, { name: "NodeGPT", content: response.data.revised_prompt, timestamp: response.data.timestamp, image: response.data.reply }]);
    } catch (error) {
      alert(`HomePage.handleSendChat() request failed with error: ${error}`);
      return -1;
    }
  };

  return (
    <div className="HomePage">
      <div ref={chatDiv} className="HomePage__content">
        <ResponseList responses={responses} />
      </div>
      <div className="HomePage__interface">
        <img src={logo} className="HomePage__interface__logo" alt="logo" />
        <div className="HomePage__interface__input">
          <textarea ref={userInput} id="userInput" rows="4" cols="50" placeholder="Type your message here and GPT away!"></textarea>
          <div className="HomePage__interface__input__buttons">
            <button id="sendButton" onClick={handleSendChat}>
              Send
            </button>
            <button id="resetButton" onClick={handleResetChat}>
              Reset NodeGPT
            </button>
            <button id="TTSButton" onClick={handleGenerateTTS}>
              Say it!
            </button>
            <button id="TTSButton" onClick={handleGenerateImage}>
              Image Generator
            </button>
            <div>
              <input ref={userImg} type="file" label="Use Vision" name="videoImg" accept="image/*" onChange={handleShowImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
