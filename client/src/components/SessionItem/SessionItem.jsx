import "./SessionItem.scss";
import { useRef } from "react";

export default function SessionItem({ chatSession, switchSessionCallBack, deleteSessionCallback, updateSessionCallback, activeSession }) {
  const sessionRef = useRef();

  let sessionItemClass = "SessionItem__group__item";

  if (chatSession.sessionID === activeSession){
    sessionItemClass += " SessionItem__group__item--active"
  }

  

  function handleEditButton() {
    sessionRef.current.disabled = false;
    sessionRef.current.focus();
  }

  function handleUpdateName() {
    sessionRef.current.disabled = true;
    updateSessionCallback(chatSession.sessionID, sessionRef.current.value);
  }

  return (
    <>
      <div className="SessionItem__group">
        <div
          className="SessionItem__group__itemContainer"
          onClick={() => {
            switchSessionCallBack(chatSession.sessionID);
          }}
        >
          <input
            ref={sessionRef}
            name="sessionField"
            type="text"
            className={sessionItemClass}
            onBlur={() => {
              handleUpdateName();
            }}
            defaultValue={chatSession.sessionName}
            disabled
          />
        </div>
        {deleteSessionCallback ? (
          <button
            className="SessionItem__group__delete"
            onClick={() => {
              deleteSessionCallback(chatSession.sessionID);
            }}
          >
            D
          </button>
        ) : (
          <></>
        )}
        {updateSessionCallback ? (
          <button
            className="SessionItem__group__edit"
            onClick={(e) => {
              handleEditButton();
            }}
          >
            E
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
