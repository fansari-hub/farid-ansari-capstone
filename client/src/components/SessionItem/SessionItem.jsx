import "./SessionItem.scss";
import { useRef, useState } from "react";
import Icon from "../Icon/Icon";
import ConfirmActionModal from "../ConfirmActionModal/ConfirmActionModal";

export default function SessionItem({ chatSession, switchSessionCallBack, deleteSessionCallback, updateSessionCallback, activeSession }) {
  const sessionRef = useRef();
  const [confirmModal, setConfirmModal] = useState(<></>);

  let sessionItemClass = "SessionItem__group__item";

  if (chatSession.sessionID === activeSession) {
    sessionItemClass += " SessionItem__group__item--active";
  }

  function handleEditButton() {
    sessionRef.current.disabled = false;
    sessionRef.current.focus();
  }

  function handleUpdateName() {
    sessionRef.current.disabled = true;
    updateSessionCallback(chatSession.sessionID, sessionRef.current.value);
  }

  function handleShowConfirmDeleteModal(){
    setConfirmModal( <ConfirmActionModal callbackAccept={(e) => {deleteSessionCallback(chatSession.sessionID);setConfirmModal(<></>);}} callbackReject={(e) => {setConfirmModal(<></>);}} actiontype="delete"/>);
  };

  return (
    <>
    {confirmModal}
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
          <div
            className="SessionItem__group__delete"
            onClick={handleShowConfirmDeleteModal}>
            <Icon iconIndex={4} iconName={"Delete"} actionType="negative" hideLabel={true} displayNaked={true} />
          </div>
        ) : (
          <></>
        )}
        {updateSessionCallback ? (
          <div
            className="SessionItem__group__edit"
            onClick={(e) => {
              handleEditButton();
            }}
          >
            <Icon iconIndex={18} iconName={"Edit"} actionType="positive" hideLabel={true} displayNaked={true} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
