/*****************************
 * Component: ConfirmActionModal
 * Purpose: Pop-up model used for confirming user action such as delete.
 * Prop Notes:  "strActionType" is just for prompt text and does not affect behaviour.
 * Usage Notes: To block all other elements on screen, Z-index is used. 
 *              Callback need to be provided for both Accept (OK) or Reject (Cancel) action, display & hiding need to be controller by parent component.
 *             
 ****************************/

import "./ConfirmActionModal.scss";
import Icon from "../Icon/Icon";
export default function ConfirmActionModal({ callbackAccept, callbackReject, strActionType = "undefined" }) {
  
  return (
    <>
      <div className="ConfirmActionModal">
        <div className="ConfirmActionModal__float">
          <div className="ConfirmActionModal__float__container">
            <p className="ConfirmActionModal__float__container__title font-label">Are you sure you want to perform this {strActionType} action?</p>
            <div className="ConfirmActionModal__float__container__button" onClick={callbackAccept}>
              <Icon iconIndex={4} strIconName={"Yes"} strActionType={"negative"} boolDisplayNaked={false} boolNoGap={false} />
            </div>
            <div className="ConfirmActionModal__float__container__button" onClick={callbackReject}>
              {" "}
              <Icon iconIndex={8} strIconName={"No"} strActionType={"positive"} boolDisplayNaked={false} boolNoGap={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
