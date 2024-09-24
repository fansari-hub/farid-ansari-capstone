import "./ChatInput.scss";
import logo from "../../logo.svg";

export default function ChatInput({ callback, userInput }) {
  return (
    <>
      <div className="ChatInput">
        <img src={logo} className="ChatInput__logo" alt="logo" />
        <div className="ChatInput__input">
          <textarea ref={userInput} id="userInput" rows="4" cols="50" placeholder="Type your message here and GPT away!"></textarea>
          <div className="ChatInput_input__buttons">
            <button id="sendButton" onClick={callback}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
