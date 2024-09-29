import "./ChatInput.scss";
import logo from "../../assets/images/logo.webp";

export default function ChatInput({ sendChatCallBack, userInput, inputTTSflag, skipCallBack }) {

  return (
    <>
      <div className="ChatInput">
        <img src={logo} className="ChatInput__logo" alt="logo" />
        <div className="ChatInput__input">
          <textarea className="ChatInput__input__textbox" ref={userInput} id="userInput" rows="4"  placeholder="Type your message here to Janus GPT here."></textarea>
          <div className="ChatInput__input__buttons">
            <button className="ChatInput__input__buttons__button" id="sendButton" onClick={sendChatCallBack}>
              Send
            </button>
            <button className="ChatInput__input__buttons__button" id="sendButton" onClick={skipCallBack}>
              Pass
            </button>
            <div className="ChatInput__input__buttons__group">
            <input ref={inputTTSflag} className="ChatInput__input__buttons__group__control" id="tts" name="tts" type="checkbox"/>
            <p className="ChatInput__input__buttons__group__label">Speech</p>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
