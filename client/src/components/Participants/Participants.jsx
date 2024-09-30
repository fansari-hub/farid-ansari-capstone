import webapi from "../../utils/webapi";
import { useState } from "react";

import "./Participants.scss";
import defaultLogo from "../../assets/images/logo.webp";
import ParticipantSlot from "../ParticipantSlot/ParticipantSlot";
import VisualSelectModal from "../VisualSelectModal/VisualSelectModal";

export default function Participants({ activePersonalitiesObj, activeSession, personalitiesObj,  removePersonCallBack, addPersonCallBack }) {
  const [selectionModal, setSelectionModal] = useState(<></>);

  const addPersonsListArray = personalitiesObj.map(e => {
    return {"text" : e.name, "id": e.personalityID, "image" : webapi.URL + "/" + e.avatarImg}
  });




  const handleAddPerson = (param) => {
    setSelectionModal(<></>);
    
    const selectedPersonIndex = personalitiesObj.findIndex((o) => 
      o.personalityID === param
    )

    const alreadyInSessionIndex = activePersonalitiesObj.findIndex((o) => 
      o.personalityID === param
    )

    if (selectedPersonIndex !== -1 && alreadyInSessionIndex === -1){
      addPersonCallBack(personalitiesObj[selectedPersonIndex], activeSession);
    }
  }

  const handleShowSelectinModal = () => {
    setSelectionModal( <VisualSelectModal selectionArray={addPersonsListArray} callback={handleAddPerson}/>);
  };



  return (
    <>
    {selectionModal}
      <div className="Participants">
        <div className="Participants__add">
          {/* <img className="Participants__add__image" src={defaultLogo} alt="add_person" /> */}
          <div className="Participants__add__addIcon" onClick={() => handleShowSelectinModal()}>+</div>
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
