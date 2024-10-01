import webapi from "../../utils/webapi";

import "./ParticipantSlot.scss";
import { useState } from "react";
import defaultLogo from "../../assets/images/logo.webp";

export default function ParticipantSlot({ personalitiesObj, activeSession, removePersonCallBack }) {
  
  let profileImage = defaultLogo;
  if (personalitiesObj.avatarImg){
    profileImage = webapi.URL + "/" + personalitiesObj.avatarImg;
  }

  
  const handleRemovePerson = (personID) => {
    removePersonCallBack(personID, activeSession);
  };


  return (
    <>
      <div className="ParticipantSlot__group">
        <img className="ParticipantSlot__group__image" src={profileImage} alt="avatar_icon" />
        <div className="ParticipantSlot__group__delete" onClick={() => handleRemovePerson(personalitiesObj)}>
          x
        </div>
      </div>
    </>
  );
}
