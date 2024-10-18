/*****************************
 * Component: Participants
 * Purpose: Shows a list participants in a chat session, also provides button for adding participants to a session
 * Prop notes: - "objArrayActivePersonalities" refers to list of personalities associated with the active session.
 *             - "objArrayPersonalities" refers to all available personalities, not just the ones associated with the active session.
 *             - logic for adding and removing participants will be handles by parent component
 * Usage notes: Nothing will be rendered if a strActiveSession is not provided.
 ****************************/

import webapi from "../../utils/webapi";
import { useState } from "react";

import "./Participants.scss";
import ParticipantSlot from "../ParticipantSlot/ParticipantSlot";
import VisualSelectModal from "../VisualSelectModal/VisualSelectModal";
import Icon from "../Icon/Icon";

export default function Participants({ objArrayActivePersonalities, strActiveSession, objArrayPersonalities, removePersonCallBack, addPersonCallBack }) {
  
  // State is used for rending Personalities selection pop-up (VisualSeleltModal component)
  const [selectionModal, setSelectionModal] = useState(<></>);

  //get details for each active personality
  const addPersonsListArray = objArrayPersonalities.map((e) => {
    return { text: e.name, id: e.personalityID, image: webapi.URL + "/" + e.avatarImg };
  });

  // Don't render anything if there is no active session
  if (!strActiveSession) {
    return <></>;
  }

  // Callback function provided to the VisualSelectModal component for 
  // handling the selection of a personality to be added to the sesion
  function handleAddPerson(param){
    
    //clear the modal after use selection
    setSelectionModal(<></>);

    //if use didnt't select a character, (they cancelled) do nothing
    if (!param) {
      return;
    }

    //Only call addPersonCallBack If the character exsits AND not already in the session
    const selectedPersonIndex = objArrayPersonalities.findIndex((o) => o.personalityID === param);
    const alreadyInSessionIndex = objArrayActivePersonalities.findIndex((o) => o.personalityID === param);

    if (selectedPersonIndex !== -1 && alreadyInSessionIndex === -1) {
      addPersonCallBack(objArrayPersonalities[selectedPersonIndex], strActiveSession);
    }
  };

  
  function handleShowSelectinModal(){
    setSelectionModal(<VisualSelectModal arrSelection={addPersonsListArray} callback={handleAddPerson} />);
  };

  return (
    <>
      {selectionModal}
      <div className="Participants">
        <div className="Participants__add">
          <div className="Participants__add__addIcon" onClick={() => handleShowSelectinModal()}>
            <Icon iconIndex={9} strIconName="add person" strActionType="positive" boolHideLabel={true} boolDisplayNaked={true} boolNoGap={true} />
          </div>
          {objArrayActivePersonalities.length === 0 ? <p className="Participants__add__text">Click to invite to chat</p> : <></>}
        </div>
        <div className="Participants__list">
          {objArrayActivePersonalities.map((e, i) => {
            return <ParticipantSlot objPersonality={e} strActiveSession={strActiveSession} removePersonCallBack={removePersonCallBack} key={e.personalityID} />;
          })}
        </div>
      </div>
    </>
  );
}
