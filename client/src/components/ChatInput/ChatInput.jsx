import "./ChatInput.scss";
import logo from "../../assets/images/logo.webp";
import Icon from "../Icon/Icon";

export default function ChatInput({ sendChatCallBack, userInput, inputTTSflag, inputAutoChatFlag, skipCallBack }) {

  return (
    <>
      <div className="ChatInput">
        <img src={logo} className="ChatInput__logo" alt="logo" />
        <div className="ChatInput__input">
          <textarea className="ChatInput__input__textbox" ref={userInput} id="userInput" rows="4"  placeholder="Type your message here to Janus GPT here."></textarea>
          <div className="ChatInput__input__buttons">
            <div className="ChatInput__input__buttons__button" onClick={sendChatCallBack} ><Icon iconIndex={3} iconName={"Send"} actionType="neutral" /></div>
            <div className="ChatInput__input__buttons__button" onClick={skipCallBack} ><Icon iconIndex={13} iconName={"Pass"} actionType="neutral" /></div>
            <div className="ChatInput__input__buttons__group">
            <input ref={inputTTSflag} className="ChatInput__input__buttons__group__control" id="ttsBox" name="tts" type="checkbox"/>
            <p className="ChatInput__input__buttons__group__label">Speech</p>
            </div>
            <div className="ChatInput__input__buttons__group">
            <input ref={inputAutoChatFlag} className="ChatInput__input__buttons__group__control" id="autoBox" name="tts" type="checkbox"/>
            <p className="ChatInput__input__buttons__group__label">Auto</p>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}