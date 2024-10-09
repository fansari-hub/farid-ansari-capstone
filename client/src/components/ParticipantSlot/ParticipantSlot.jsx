import webapi from "../../utils/webapi";

import "./ParticipantSlot.scss";
import { useState } from "react";
import defaultLogo from "../../assets/images/logo.webp";
import Icon from "../Icon/Icon";
const erroImgPath = webapi.URL + "/images/" + "brokenProfilePic.webp"


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
        <img className="ParticipantSlot__group__image" src={profileImage} alt="avatar_icon"
          onError={event => { 
            event.target.src = erroImgPath
            event.onerror = null;
            }} 
        />
        <div className="ParticipantSlot__group__delete"  onClick={() => handleRemovePerson(personalitiesObj)}><Icon iconIndex={10} iconName="Remove" actionType="negative" hideLabel={true} displayNaked={true} noGap={true} /></div>
      </div>
    </>
  );
}
