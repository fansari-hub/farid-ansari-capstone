import webapi from "../../utils/webapi";

import "./UserConfig.scss";
import { useRef, useState, useEffect} from "react";
import defaultLogo from "../../assets/images/logo.webp"
import Icon from "../Icon/Icon";

export default function UserConfig({ userObj , deleteCallBack, signOutCallBack}) {
  const [formData, setFormData] = useState( {userObj} );

  
  const handleSave = (e) => {
    e.preventDefault();
     //updateCallBack({ "personalityID": personalityObj.personalityID, "name": userInputName.current.value,  "avatarImg": personalityObj.avatarImg, "temperature": +userInputTemperature.current.value, "conditionPrompt": userInputPrompt.current.value, "avatarPrompt" : userAvatarPrompt.current.value, "voice" : userInputVoice.current.value });
    //  userInputName.current.style.backgroundColor = "rgba(47, 79, 79, 0.195)"
    //  userInputTemperature.current.style.backgroundColor = "rgba(47, 79, 79, 0.195)"
    //  userInputPrompt.current.style.backgroundColor="rgba(47, 79, 79, 0.195)";
    //  userAvatarPrompt.current.style.backgroundColor="rgba(47, 79, 79, 0.195)";
    //  userInputVoice.current.style.backgroundColor="rgba(47, 79, 79, 0.195)";
  };

  const handleDelete = (e) => {
    alert("Feature not yet implemented");
  };



  return (
    <>
      <div className="UserConfig">
        <form>
              
          <div className="UserConfig__group">
            <p className="UserConfig__group__label">Name</p>
            <input name="name" className="UserConfig__group__data"  type="text" value={userObj.name} disabled="true" ></input>
          </div>
          <div className="UserConfig__group">
            <p className="UserConfig__group__label">Email</p>
            <input name="email" className="UserConfig__group__data"  type="text" value={userObj.email} disabled="true" ></input>
          </div>
         <br></br>
          <div className="UserConfig__group">
            <div className="UserConfig__group__save" onClick={signOutCallBack} ><Icon iconIndex={6} iconName={"Sign Out"} actionType="neutral" /></div>
            <div className="UserConfig__group__delete" onClick={handleDelete} ><Icon iconIndex={4} iconName={"Delete Me"} actionType="negative" /></div>
            <div></div>
          </div>
        </form>
      </div>
    </>
  );
}
