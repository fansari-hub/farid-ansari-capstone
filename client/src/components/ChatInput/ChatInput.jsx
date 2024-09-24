import "./ChatInput.scss";
import logo from "../../logo.svg";

export default function ChatInput({ sendChatCallBack, userInput, skipCallBack }) {
  return (
    <>
      <div className="ChatInput">
        <img src={logo} className="ChatInput__logo" alt="logo" />
        <div className="ChatInput__input">
          <textarea ref={userInput} id="userInput" rows="4" cols="50" placeholder="Type your message here and GPT away!"></textarea>
          <div className="ChatInput_input__buttons">
            <button id="sendButton" onClick={sendChatCallBack}>
              Send
            </button>
            <button id="sendButton" onClick={skipCallBack}>
              Pass
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
