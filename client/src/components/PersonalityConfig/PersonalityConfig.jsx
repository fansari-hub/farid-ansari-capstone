import "./PersonalityConfig.scss";
import { useRef, useState } from "react";

export default function PersonalityConfig({ personalityObj, updateCallBack }) {
  const [formData, setFormData] = useState({ ...personalityObj });

  const userInputName = useRef();
  const userInputTemperature = useRef();
  const userInputPrompt = useRef();

  const handleSave = (e) => {
    e.preventDefault();
     updateCallBack({ "personalityID": personalityObj.personalityID, "name": userInputName.current.value,  "avatarImg": personalityObj.avatarImg, "temperature": userInputTemperature.current.value, "conditionPrompt": userInputPrompt.current.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <>
      <div className="PersonalityConfig">
        <form id={personalityObj.personalityID} onSubmit={handleSave}>
          <div className="PersonalityConfig__group">
            <p className="PersonalityConfig__group__label">Name:</p>
            <input ref={userInputName} name="name" className="PersonalityConfig__group__data" type="text" value={formData.name} onChange={handleChange}></input>
          </div>
          <div className="PersonalityConfig__group">
            <p className="PersonalityConfig__group__label">Temperature:</p>
            <input ref={userInputTemperature} name="temperature" className="PersonalityConfig__group__data" type="text"  value={formData.temperature} onChange={handleChange}></input>
          </div>
          <div className="PersonalityConfig__group">
            <p className="PersonalityConfig__group__label">Prompt:</p>
            <input ref={userInputPrompt} name="conditionPrompt" className="PersonalityConfig__group__data" type="text" value={formData.conditionPrompt} onChange={handleChange}></input>
          </div>
          <div className="PersonalityConfig__group">
            <button type="submit">Save</button>
            <div></div>
          </div>
        </form>
      </div>
    </>
  );
}
