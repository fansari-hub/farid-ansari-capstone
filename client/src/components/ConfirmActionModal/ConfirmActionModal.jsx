import "./ConfirmActionModal.scss";
import Icon from "../Icon/Icon";
export default function ConfirmActionModal({ callbackAccept, callbackReject, actiontype = "undefined" }) {


  return (
    <>
      <div className="ConfirmActionModal">
        <div className="ConfirmActionModal__float">
          <div className="ConfirmActionModal__float__container">
            <p className="ConfirmActionModal__float__container__title">Are you sure you want to perform this {actiontype} action?</p>
            <div className="ConfirmActionModal__float__container__button" onClick={callbackAccept}>
              <Icon iconIndex={4} iconName={"Yes"} actionType={"negative"} displayNaked={false} noGap={false} />
            </div>
            <div className="ConfirmActionModal__float__container__button" onClick={callbackReject}>
              {" "}
              <Icon iconIndex={8} iconName={"No"} actionType={"positive"} displayNaked={false} noGap={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
