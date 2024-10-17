import webapi from "../../utils/webapi";
import { useState } from "react";

import "./Participants.scss";
import ParticipantSlot from "../ParticipantSlot/ParticipantSlot";
import VisualSelectModal from "../VisualSelectModal/VisualSelectModal";
import Icon from "../Icon/Icon";

export default function Participants({ activePersonalitiesObj, activeSession, personalitiesObj,  removePersonCallBack, addPersonCallBack }) {
  const [selectionModal, setSelectionModal] = useState(<></>);

  //alert(`${activePersonalitiesObj} ---- ${activeSession}` );
  const addPersonsListArray = personalitiesObj.map(e => {
    return {"text" : e.name, "id": e.personalityID, "image" : webapi.URL + "/" + e.avatarImg}
  });

  if (!activeSession){
    return <></>
  }



  const handleAddPerson = (param) => {
    setSelectionModal(<></>);

    if (!param){
      return;
    }
    
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
          <div className="Participants__add__addIcon"  onClick={() => handleShowSelectinModal()}><Icon iconIndex={9} iconName="add person" actionType="positive" hideLabel={true} displayNaked={true} noGap={true} /></div>
          {(activePersonalitiesObj.length === 0) ? (<p className="Participants__add__text">Click to invite to chat</p>) : (<></>)}
        </div>
        <div className="Participants__list">
          {activePersonalitiesObj.map((e, i) => {
            return (
              <ParticipantSlot personalitiesObj={e} activeSession={activeSession} removePersonCallBack={removePersonCallBack} key={e.personalityID}/>
            );
          })}
        </div>
      </div>
    </>
  );
}
