import webapi from "../../utils/webapi";

import "./Participants.scss";
import defaultLogo from "../../assets/images/logo.webp";
import ParticipantSlot from "../ParticipantSlot/ParticipantSlot";

export default function Participants({ activePersonalitiesObj, activeSession, personalitiesObj,  removePersonCallBack, addPersonCallBack }) {


  const handleAddPerson = () => {
    addPersonCallBack(personalitiesObj[0], activeSession);
  };

  return (
    <>
      <div className="Participants">
        <div className="Participants__add">
          <img className="Participants__add__image" src={defaultLogo} alt="add_log" />
          <div className="Participants__add__addIcon" onClick={() => handleAddPerson()}>
            +
          </div>
        </div>
        <div className="Participants__list">
          {activePersonalitiesObj.map((e, i) => {
            return (
              <ParticipantSlot personalitiesObj={e} activeSession={activeSession} removePersonCallBack={removePersonCallBack} key={i}/>
            );
          })}
        </div>
      </div>
    </>
  );
}
