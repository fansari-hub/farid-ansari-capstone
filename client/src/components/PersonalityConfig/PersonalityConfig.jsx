/*****************************
 * Component: PesonalityConfig
 * Purpose: Displays a configuration card to review/setup a single personality.
 * Prop notes: none
 * Usage notes: none
 ****************************/

import webapi from "../../utils/webapi";
import "./PersonalityConfig.scss";
import { useRef, useState, useEffect } from "react";
import defaultLogo from "../../assets/images/logo.webp";
import Icon from "../Icon/Icon";
import ConfirmActionModal from "../ConfirmActionModal/ConfirmActionModal";
const erroImgPath = webapi.URL + "/images/" + "brokenProfilePic.webp";

export default function PersonalityConfig({ objPersonality, updateCallBack, deleteCallBack, generateImgCallBack }) {
  const [formData, setFormData] = useState({ ...objPersonality });
  const [avatarImage, setAvatarImage] = useState(defaultLogo);

  const refUserInputName = useRef();
  const refUserInputTemperature = useRef();
  const refUserInputPrompt = useRef();
  const userAvatarPrompt = useRef();
  const refUserInputVoice = useRef();
  const [confirmModal, setConfirmModal] = useState(<></>);

  //Upon mount, see if there is a existing generated avatar image, if yes, replace default image.
  useEffect(() => {
    if (objPersonality.avatarImg && objPersonality.avatarImg !== "") {
      setAvatarImage(webapi.URL + "/" + objPersonality.avatarImg);
    }
  }, []);

  function handleSave(e) {
    e.preventDefault();

    if (refUserInputName.current.value === "" || refUserInputPrompt.current.value === "" || userAvatarPrompt.current.value === "" || refUserInputVoice.current.value === "") {
      return false;
    }

    updateCallBack({ personalityID: objPersonality.personalityID, name: refUserInputName.current.value, avatarImg: objPersonality.avatarImg, temperature: +refUserInputTemperature.current.value, conditionPrompt: refUserInputPrompt.current.value, avatarPrompt: userAvatarPrompt.current.value, voice: refUserInputVoice.current.value });
    refUserInputName.current.style.backgroundColor = "rgba(47, 79, 79, 0.195)";
    refUserInputTemperature.current.style.backgroundColor = "rgba(47, 79, 79, 0.195)";
    refUserInputPrompt.current.style.backgroundColor = "rgba(47, 79, 79, 0.195)";
    userAvatarPrompt.current.style.backgroundColor = "rgba(47, 79, 79, 0.195)";
    refUserInputVoice.current.style.backgroundColor = "rgba(47, 79, 79, 0.195)";
  }

  function handleDelete(e) {
    e.preventDefault();
    deleteCallBack(objPersonality.personalityID);
  }

  function handleGenerate(e) {
    e.preventDefault();
    setAvatarImage(defaultLogo);
    generateImgCallBack(userAvatarPrompt.current.value, objPersonality.personalityID);
    userAvatarPrompt.current.style.backgroundColor = "rgba(47, 79, 79, 0.195)";
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (e.target.value === "") {
      e.target.style.backgroundColor = "#4d2e02";
    } else {
      e.target.style.backgroundColor = "#024d06";
    }
  }

  function handleShowConfirmDeleteModal() {
    setConfirmModal( <ConfirmActionModal
        callbackAccept={(e) => {
          handleDelete(e);
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
      <div className="PersonalityConfig">
        <form id={objPersonality.personalityID}>
          <div className="PersonalityConfig__avatar">
            <img
              className="PersonalityConfig__avatar__picture"
              src={avatarImage}
              alt="profile_pic"
              onError={(event) => {
                event.target.src = erroImgPath;
                event.onerror = null;
              }}
            />
            <textarea ref={userAvatarPrompt} name="avatarPrompt" placeholder="Enter prompt to describe avatar profile picture and then press Generate Avatar " className="PersonalityConfig__avatar__prompt font-promptInput" value={formData.avatarPrompt} onChange={handleChange}></textarea>
          </div>

          <div className="PersonalityConfig__group">
            <p className="PersonalityConfig__group__label font-dataLabel"></p>
            <div className="PersonalityConfig__avatar__generate" onClick={handleGenerate}>
              <Icon iconIndex={1} strIconName={"Generate Image"} strActionType="neutral" />
            </div>
          </div>
          <div className="PersonalityConfig__group">
            <p className="PersonalityConfig__group__label font-dataLabel">Name</p>
            <input ref={refUserInputName} name="name" className="PersonalityConfig__group__data font-input" placeholder="Enter a name" type="text" value={formData.name} onChange={handleChange}></input>
          </div>
          <div className="PersonalityConfig__group">
            <p className="PersonalityConfig__group__label font-dataLabel">Temperature</p>
            <input ref={refUserInputTemperature} name="temperature" className="PersonalityConfig__group__data PersonalityConfig__group__data--noborder" type="range" step="0.1" min="0.0" max="1.0" value={formData.temperature} onChange={handleChange}></input>
          </div>
          <div className="PersonalityConfig__group PersonalityConfig__group--column">
            <p className="PersonalityConfig__group__label font-dataLabel">Prompt</p>
            <textarea ref={refUserInputPrompt} name="conditionPrompt" className="PersonalityConfig__group__prompt font-promptInput" placeholder="Enter a prompt that describes the personality and the role you want this character to take." value={formData.conditionPrompt} onChange={handleChange}></textarea>
          </div>
          <div className="PersonalityConfig__group">
            <p className="PersonalityConfig__group__label font-dataLabel">TTS Voice</p>
            <select ref={refUserInputVoice} name="voice" className="PersonalityConfig__group__data font-input" type="text" value={formData.voice} onChange={handleChange}>
              <option value="alloy">Alloy</option>
              <option value="echo">Echo</option>
              <option value="onyx">Onyx</option>
              <option value="nova">Nova</option>
              <option value="shimme">Shimme</option>
            </select>
          </div>
          <div className="PersonalityConfig__group">
            <div className="PersonalityConfig__group__label"></div>
            <div className="PersonalityConfig__group__btn" onClick={handleSave}>
              <Icon iconIndex={12} strIconName={"Save"} strActionType="positive" />
            </div>
            <div className="PersonalityConfig__group__btn" onClick={handleShowConfirmDeleteModal}>
              <Icon iconIndex={4} strIconName={"Delete"} strActionType="negative" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
