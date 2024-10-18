/*****************************
 * Component: ToggleSwitch
 * Purpose: Displays a off/on toggle switch, replacing existing browser checkbox visual.
 * Prop notes: "callback" is called everytime the toggle switches between on/off, logic should be handles in parent component
 *              "strIconName" set the label for the toggle (and image alt)
 *              "boolHideLabel" is used for hiding the label
 *              "toggleRefence": reference provided by the parent component so it can later read the toggled value
 * Usage notes: none
 ****************************/

import "./ToggleSwitch.scss";
import iToggleOff from "../../assets/icons/toggle_off_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iToggleOn from "../../assets/icons/toggle_on_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { useEffect, useState } from "react";

export default function ToggleSwitch({ toggleReference, boolDefaultState, strIconName, boolHideLabel, callback }) {
  const [toggleState, setToggleState] = useState("");
  const [toggleIcon, setToggleIcon] = useState(iToggleOff);
  const [toggleClass, setToggleClass] = useState("ToggleSwitch ToggleSwitch--off");
  const [toggledRecently, setToggledRecntly] = useState(false);

  //upon changes default state passed by the parent, set the local state to match what the parent component says it should be
  useEffect(() => {
    setToggleState(boolDefaultState);
  }, [boolDefaultState]);

  //everytime the local state is changed, change visuals and execute callback.
  useEffect(() => {
    if (toggleState === true) {
      setToggleIcon(iToggleOn);
      setToggleClass("ToggleSwitch ToggleSwitch--on");
    } else {
      setToggleIcon(iToggleOff);
      setToggleClass("ToggleSwitch ToggleSwitch--off");
    }
    // this condition is here to ensure that callback is executed ONLY when the USER toggles the control, not when react redraws
    if (toggledRecently === true) {
      handleCallBack();
      setToggledRecntly(false);
    }
  }, [toggleState]);

  //handler for when the user clicks on the toggle.
  const handleStateChange = () => {
    setToggledRecntly(true);
    if (toggleState === true) {
      setToggleState(false);
    } else {
      setToggleState(true);
    }
  };

  const handleCallBack = () => {
    if (callback !== undefined) {
      callback();
    }
  };

  return (
    <>
      <div className={toggleClass}>
        <img ref={toggleReference} className="ToggleSwitch__image" src={toggleIcon} alt={strIconName} onClick={handleStateChange} togglevalue={toggleState.toString()} />
        <p className="ToggleSwitch__label font-label">{boolHideLabel ? <></> : strIconName}</p>
      </div>
    </>
  );
}
