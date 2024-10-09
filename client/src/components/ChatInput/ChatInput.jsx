import "./ChatInput.scss";
import logo from "../../assets/images/logo.webp";
import Icon from "../Icon/Icon";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

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
            <ToggleSwitch toggleReference={inputTTSflag} defaultState={false} iconName="Speech" hideLabel={false}/>
            </div>
            <div className="ChatInput__input__buttons__group">
            <ToggleSwitch toggleReference={inputAutoChatFlag} defaultState={false} iconName="Auto" hideLabel={false}/>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}