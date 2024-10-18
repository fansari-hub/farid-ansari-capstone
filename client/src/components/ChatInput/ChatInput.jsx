/*****************************
 * Component: ChatInput
 * Purpose: Chat textinput area with associate controls for Send, Pass, AutoChat and TTS. Actual logic is handled by parent component.
 * Usage Notes: Must provide an strActiveSession value, otherwise it will not render anything (hides itself).
 ****************************/

import "./ChatInput.scss";
import logo from "../../assets/images/logo.webp";
import Icon from "../Icon/Icon";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

export default function ChatInput({ sendChatCallBack, userInput, inputTTSflag, inputAutoChatFlag, skipCallBack, strActiveSession }) {
  
  // Don't render anything if there is no active session
  if (!strActiveSession) {
    return <></>;
  }

  return (
    <>
      <div className="ChatInput">
        <img src={logo} className="ChatInput__logo" alt="logo" />
        <div className="ChatInput__input">
          <textarea className="ChatInput__input__textbox font-textbox" ref={userInput} id="userInput" rows="4" placeholder="Type your message to JanusGPT here."></textarea>
          <div className="ChatInput__input__buttons">
            <div className="ChatInput__input__buttons__button" onClick={sendChatCallBack}>
              <Icon iconIndex={3} strIconName={"Send"} strActionType="neutral" />
            </div>
            <div className="ChatInput__input__buttons__button" onClick={skipCallBack}>
              <Icon iconIndex={13} strIconName={"Pass"} strActionType="neutral" />
            </div>
            <div className="ChatInput__input__buttons__group">
              <ToggleSwitch toggleReference={inputTTSflag} boolDefaultState={false} strIconName="TTS" boolHideLabel={false} />
            </div>
            <div className="ChatInput__input__buttons__group">
              <ToggleSwitch toggleReference={inputAutoChatFlag} boolDefaultState={false} strIconName="Auto" boolHideLabel={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
