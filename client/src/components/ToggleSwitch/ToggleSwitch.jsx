import "./ToggleSwitch.scss";
import iToggleOff from "../../assets/icons/toggle_off_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iToggleOn from "../../assets/icons/toggle_on_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { useEffect, useState } from "react";

export default function ToggleSwitch({ toggleReference, defaultState, iconName, hideLabel, callback }) {
  // console.log(`iconName: ${iconName}, value: ${defaultState} `);
  const [toggleState, setToggleState] = useState("");
  const [toggleIcon, setToggleIcon] = useState(iToggleOff);
  const [toggleClass, setToggleClass] = useState("ToggleSwitch ToggleSwitch--off");
  const [toggledRecently, setToggledRecntly] = useState(false);

  useEffect (()=> {
    setToggleState(defaultState);
  }, [defaultState])
  

  useEffect(() => {
    if (toggleState === true) {
      setToggleIcon(iToggleOn);
      setToggleClass("ToggleSwitch ToggleSwitch--on")
    } else {
      setToggleIcon(iToggleOff);
      setToggleClass("ToggleSwitch ToggleSwitch--off")
    }
    if (toggledRecently === true){
      handleCallBack();
      setToggledRecntly(false);
    }
  }, [toggleState]);

  const handleStateChange = () => {
    setToggledRecntly(true);
    if (toggleState === true) {
      setToggleState(false);
    } else {
      setToggleState(true);
    }
  };

  const handleCallBack = () => {
    if (callback !== undefined){
      callback();
    }
  }

  return (
    <>
      <div className={toggleClass}>
        <img ref={toggleReference} className="ToggleSwitch__image" src={toggleIcon} alt={iconName} onClick={handleStateChange} togglevalue = {toggleState.toString()} />
        <p className="ToggleSwitch__label font-label">{hideLabel ? <></> : iconName}</p>
      </div>
    </>
  );
}
