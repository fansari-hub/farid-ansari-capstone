/*****************************
 * Component: ChatInput
 * Purpose: Chat textinput area with associate controls for Send, Pass, AutoChat and TTS. Actual logic is handled by parent component.
 * Usage Notes: Must provide an strActiveSession value, otherwise it will not render anything (hides itself).
 ****************************/

import "./ChatInput.scss";
import logo from "../../assets/images/logo.webp";
import Icon from "../Icon/Icon";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

export default function ChatInput({ sendChatCallBack, refUserInput, refTTSFlagInput, refAutoChatFlagInput, skipCallBack, strActiveSession, boolChatControlEnabled }) {
  
  // Don't render anything if there is no active session
  if (!strActiveSession) {
    return <></>;
  }

  function handlePressEnter(event){
    if (event.key === "Enter"){
      sendChatCallBack();
    }
  }

  return (
    <>
      <div className="ChatInput">
        <img src={logo} className="ChatInput__logo" alt="logo" />
        <div className="ChatInput__input">
          <textarea className="ChatInput__input__textbox font-textbox" ref={refUserInput} id="refUserInput" rows="4" onKeyDown={handlePressEnter} placeholder={boolChatControlEnabled?("Type your message to JanusGPT here."):("Please wait....")} disabled={!boolChatControlEnabled}></textarea>
          <div className="ChatInput__input__buttons">
            <div className="ChatInput__input__buttons__button" onClick={boolChatControlEnabled?(sendChatCallBack):(() => {})}>
              <Icon iconIndex={3} strIconName={"Send"} strActionType="neutral"/>
            </div>
            <div className="ChatInput__input__buttons__button" onClick={boolChatControlEnabled?(skipCallBack):(() => {})}>
              <Icon iconIndex={13} strIconName={"Pass"} strActionType="neutral" />
            </div>
            <div className="ChatInput__input__buttons__group">
              <ToggleSwitch refToggleInput={refTTSFlagInput} boolDefaultState={false} strIconName="TTS" boolHideLabel={false} />
            </div>
            <div className="ChatInput__input__buttons__group">
              <ToggleSwitch refToggleInput={refAutoChatFlagInput} boolDefaultState={false} strIconName="Auto" boolHideLabel={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}