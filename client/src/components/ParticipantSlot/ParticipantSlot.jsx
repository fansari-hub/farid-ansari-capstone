/*****************************
 * Component: ParticipantSlot
 * Purpose: A single participant (with remove action), used to build list of session participants by the "Participants" component.
 * Prop notes: none
 * Usage notes: none
 ****************************/
import webapi from "../../utils/webapi";

import "./ParticipantSlot.scss";
import defaultLogo from "../../assets/images/logo.webp";
import Icon from "../Icon/Icon";
const erroImgPath = webapi.URL + "/images/" + "brokenProfilePic.webp";

export default function ParticipantSlot({ objPersonality, strActiveSession, removePersonCallBack }) {

  let profileImage = defaultLogo;
  
  if (objPersonality.avatarImg) {
    profileImage = webapi.URL + "/" + objPersonality.avatarImg;
  }

  function handleRemovePerson(personID){
    removePersonCallBack(personID, strActiveSession);
  };

  return (
    <>
      <div className="ParticipantSlot__group">
        <img
          className="ParticipantSlot__group__image"
          src={profileImage}
          alt="avatar_icon"
          onError={(event) => {
            event.target.src = erroImgPath;
            event.onerror = null;
          }}
        />
        <div className="ParticipantSlot__group__delete" onClick={() => handleRemovePerson(objPersonality)}>
          <Icon iconIndex={10} strIconName="Remove" strActionType="negative" boolHideLabel={true} boolDisplayNaked={true} boolNoGap={true} />
        </div>
      </div>
    </>
  );
}
