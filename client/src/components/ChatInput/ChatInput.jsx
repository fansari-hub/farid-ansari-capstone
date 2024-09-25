import "./ChatInput.scss";
import logo from "../../assets/images/logo.webp";

export default function ChatInput({ sendChatCallBack, userInput, skipCallBack }) {
  return (
    <>
      <div className="ChatInput">
        <img src={logo} className="ChatInput__logo" alt="logo" />
        <div className="ChatInput__input">
          <textarea className="ChatInput__input__textbox" ref={userInput} id="userInput" rows="4" cols="50" placeholder="Type your message here and GPT away!"></textarea>
          <div className="ChatInput__input__buttons">
            <button className="ChatInput__input__buttons__button" id="sendButton" onClick={sendChatCallBack}>
              Send
            </button>
            <button className="ChatInput__input__buttons__button" id="sendButton" onClick={skipCallBack}>
              Pass
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
