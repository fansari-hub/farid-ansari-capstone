/*****************************
 * Component: SessionItem
 * Purpose: Displays a single session item (as part of a session chat list) where used can select the chat session (make it active), 
 *          change the name or delete it.
 * Prop notes: none
 * Usage notes: none
 ****************************/

import "./SessionItem.scss";
import { useRef, useState } from "react";
import Icon from "../Icon/Icon";
import ConfirmActionModal from "../ConfirmActionModal/ConfirmActionModal";

export default function SessionItem({ objChatSession, switchSessionCallBack, deleteSessionCallback, updateSessionCallback, strActiveSession }) {
  const sessionRef = useRef();
  const [confirmModal, setConfirmModal] = useState(<></>);

  let sessionItemClass = "SessionItem__group__item";

  // make the session item "stand out" if it happends to be the active session
  if (objChatSession.sessionID === strActiveSession) {
    sessionItemClass += " SessionItem__group__item--active";
  }

  function handleEditButton() {
    sessionRef.current.disabled = false;
    sessionRef.current.focus();
  }

  function handleUpdateName() {
    sessionRef.current.disabled = true;
    updateSessionCallback(objChatSession.sessionID, sessionRef.current.value);
  }

  function handleShowConfirmDeleteModal() {
    setConfirmModal(
      <ConfirmActionModal
        callbackAccept={(e) => {
          deleteSessionCallback(objChatSession.sessionID);
          setConfirmModal(<></>);
        }}
        callbackReject={(e) => {
          setConfirmModal(<></>);
        }}
        strActionType="delete"
      />
    );
  }

  return (
    <>
      {confirmModal}
      <div className="SessionItem__group">
        <div
          className="SessionItem__group__itemContainer"
          onClick={() => {
            switchSessionCallBack(objChatSession.sessionID);
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
            defaultValue={objChatSession.sessionName}
            disabled
          />
        </div>
        {deleteSessionCallback ? (
          <div className="SessionItem__group__delete" onClick={handleShowConfirmDeleteModal}>
            <Icon iconIndex={4} strIconName={"Delete"} strActionType="negative" boolHideLabel={true} boolDisplayNaked={true} />
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
            <Icon iconIndex={18} strIconName={"Edit"} strActionType="positive" boolHideLabel={true} boolDisplayNaked={true} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
