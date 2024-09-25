import "./PersonalityConfig.scss";
import { useRef, useState } from "react";

export default function PersonalityConfig({ personalityObj, updateCallBack , deleteCallBack}) {
  const [formData, setFormData] = useState( {...personalityObj} );

  const userInputName = useRef();
  const userInputTemperature = useRef();
  const userInputPrompt = useRef();

  const handleSave = (e) => {
    e.preventDefault();
     updateCallBack({ "personalityID": personalityObj.personalityID, "name": userInputName.current.value,  "avatarImg": personalityObj.avatarImg, "temperature": +userInputTemperature.current.value, "conditionPrompt": userInputPrompt.current.value });
     userInputName.current.style.backgroundColor = "rgba(47, 79, 79, 0.195)"
     userInputTemperature.current.style.backgroundColor = "rgba(47, 79, 79, 0.195)"
     userInputPrompt.current.style.backgroundColor="rgba(47, 79, 79, 0.195)";
     console.log(userInputPrompt.current.style.backgroundColor);
  };

  const handleDelete = (e) => {
    deleteCallBack( personalityObj.personalityID);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    e.target.style.backgroundColor = "#4d2e02";
  }

  return (
    <>
      <div className="PersonalityConfig">
        <form id={personalityObj.personalityID}>
          <div className="PersonalityConfig__group">
            <p className="PersonalityConfig__group__label">Name</p>
            <input ref={userInputName} name="name" className="PersonalityConfig__group__data" type="text" value={formData.name} onChange={handleChange}></input>
          </div>
          <div className="PersonalityConfig__group">
            <p className="PersonalityConfig__group__label">Temperature</p>
            <input ref={userInputTemperature} name="temperature" className="PersonalityConfig__group__data" type="number" step="0.01"  value={formData.temperature} onChange={handleChange}></input>
          </div>
          <div className="PersonalityConfig__group">
            <p className="PersonalityConfig__group__label">Prompt</p>
            <input ref={userInputPrompt} name="conditionPrompt" className="PersonalityConfig__group__data" type="text" value={formData.conditionPrompt} onChange={handleChange}></input>
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
