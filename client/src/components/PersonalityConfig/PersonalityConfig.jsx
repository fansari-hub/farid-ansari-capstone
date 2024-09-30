import webapi from "../../utils/webapi";

import "./PersonalityConfig.scss";
import { useRef, useState, useEffect} from "react";
import defaultLogo from "../../assets/images/logo.webp"

export default function PersonalityConfig({ personalityObj, updateCallBack , deleteCallBack, generateImgCallBack}) {
  const [formData, setFormData] = useState( {...personalityObj} );
  const [avatarImage, setAvatarImage] = useState(defaultLogo);
  const userInputName = useRef();
  const userInputTemperature = useRef();
  const userInputPrompt = useRef();
  const userAvatarPrompt = useRef();
  const userInputVoice = useRef();

  useEffect(() => {
    if (personalityObj.avatarImg && personalityObj.avatarImg !==""){
      setAvatarImage(webapi.URL + "/" +  personalityObj.avatarImg);
    }
  }, [])
  
  

  const handleSave = (e) => {
    e.preventDefault();
     updateCallBack({ "personalityID": personalityObj.personalityID, "name": userInputName.current.value,  "avatarImg": personalityObj.avatarImg, "temperature": +userInputTemperature.current.value, "conditionPrompt": userInputPrompt.current.value, "avatarPrompt" : userAvatarPrompt.current.value, "voice" : userInputVoice.current.value });
     userInputName.current.style.backgroundColor = "rgba(47, 79, 79, 0.195)"
     userInputTemperature.current.style.backgroundColor = "rgba(47, 79, 79, 0.195)"
     userInputPrompt.current.style.backgroundColor="rgba(47, 79, 79, 0.195)";
     userAvatarPrompt.current.style.backgroundColor="rgba(47, 79, 79, 0.195)";
     userInputVoice.current.style.backgroundColor="rgba(47, 79, 79, 0.195)";
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteCallBack( personalityObj.personalityID);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setAvatarImage(defaultLogo);
    generateImgCallBack(userAvatarPrompt.current.value, personalityObj.personalityID);
    userAvatarPrompt.current.style.backgroundColor="rgba(47, 79, 79, 0.195)";
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    e.target.style.backgroundColor = "#4d2e02";
  }


  return (
    <>
      <div className="PersonalityConfig">
        <form id={personalityObj.personalityID}>
          <div className="PersonalityConfig__avatar">
            <img className="PersonalityConfig__avatar__picture" src={avatarImage} alt="profile_pic"/>
            <textarea ref={userAvatarPrompt} name="avatarPrompt" placeholder="Enter prompt to describe avatar profile picture and then press Generate Avatar " className="PersonalityConfig__avatar__prompt" value={formData.avatarPrompt} onChange={handleChange} ></textarea>
            <button className="PersonalityConfig__avatar__generate" onClick={handleGenerate}>Generate Avatar</button>
          </div>          
          <div className="PersonalityConfig__group">
            <p className="PersonalityConfig__group__label">Name</p>
            <input ref={userInputName} name="name" className="PersonalityConfig__group__data" placeholder="Enter a name" type="text" value={formData.name} onChange={handleChange}></input>
          </div>
          <div className="PersonalityConfig__group">
            <p className="PersonalityConfig__group__label">Temperature</p>
            <input ref={userInputTemperature} name="temperature" className="PersonalityConfig__group__data PersonalityConfig__group__data--noborder" type="range" step="0.1" min="0.0" max="1.0" value={formData.temperature} onChange={handleChange}></input>
          </div>
          <div className="PersonalityConfig__group">
            <p className="PersonalityConfig__group__label">Prompt</p>
            <textarea ref={userInputPrompt} name="conditionPrompt" className="PersonalityConfig__group__prompt" placeholder="Enter a prompt that describes the personality and the role you want this character to take." value={formData.conditionPrompt} onChange={handleChange}></textarea>
          </div>
          <div className="PersonalityConfig__group">
            <p className="PersonalityConfig__group__label">TTS Voice</p>
            <select ref={userInputVoice} name="voice" className="PersonalityConfig__group__data" type="text" value={formData.voice} onChange={handleChange}>
              <option value="alloy">Alloy</option>
              <option value="echo">Echo</option>
              <option value="onyx">Onyx</option>
              <option value="nova">Nova</option>
              <option value="shimme">Shimme</option>
            </select>
          </div>
          <div className="PersonalityConfig__group">
            <button className="PersonalityConfig__group__save" type="submit" onClick={handleSave}>Save</button>
            <button className="PersonalityConfig__group__delete" onClick={handleDelete}>Delete</button>
            <div></div>
          </div>
        </form>
      </div>
    </>
  );
}
