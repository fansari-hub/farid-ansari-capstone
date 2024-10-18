/*****************************
 * Component: Icon
 * Purpose: Displays an Icon with or without label, or the content of a button containing an icon with label
 * Prop notes: -"iconIndex" selected the icon to diplay. This prop should always be provided.
 *              -"strIconName" is display next to the icon as a label (and also used for img alt). This prop should always be provided.
 *              -"strActionType" can be either positive, negative or neutral, which controls the color scheme. Ommiting prop assume neural colors.
 *              -"boolHideLabel" hides the label provided by IconName (so img alt still gets a value).
 *              -"boolDisplayNaked" removes all border effects so it doesn't look like a button anymore.
 *              -"boolNoGap" removes gap after the icon.
 * Usage notes: If used as a clickable button, the component should be nested inside a DIV, and that parent DIV should handle the click event 
 *              since this component is purely visual and doesn't handle functionality. 
 ****************************/

import "./Icon.scss";
import iAddCircle from "../../assets/icons/add_circle_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iAddPhoto from "../../assets/icons/add_photo_alternate_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iAutoPlay from "../../assets/icons/autoplay_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iChat from "../../assets/icons/chat_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iDelete from "../../assets/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iExpand from "../../assets/icons/expand_circle_down_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iLogout from "../../assets/icons/logout_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iManageAccount from "../../assets/icons/manage_accounts_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iOpenMenu from "../../assets/icons/menu_open_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iAddPerson from "../../assets/icons/person_add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iRemovePerson from "../../assets/icons/person_remove_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iPsychology from "../../assets/icons/psychology_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iSave from "../../assets/icons/save_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iSend from "../../assets/icons/send_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iSettings from "../../assets/icons/settings_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iTTS from "../../assets/icons/text_to_speech_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iToggleOff from "../../assets/icons/toggle_off_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iToggleOn from "../../assets/icons/toggle_on_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iEdit from "../../assets/icons/edit_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import iLogin from "../../assets/icons/login_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";

const imageList = [iAddCircle, iAddPhoto, iAutoPlay, iChat, iDelete, iExpand, iLogout, iManageAccount, iOpenMenu, iAddPerson, iRemovePerson, iPsychology, iSave, iSend, iSettings, iTTS, iToggleOff, iToggleOn, iEdit, iLogin];

export default function Icon({ iconIndex, strIconName, strActionType, boolHideLabel, boolDisplayNaked, boolNoGap }) {
  let colorClass;

  switch (strActionType) {
    case "positive":
      colorClass = "Icon Icon--positive";
      break;
    case "negative":
      colorClass = "Icon Icon--negative";
      break;
    case "neutral":
      colorClass = "Icon Icon--neutral";
      break;
    default:
      colorClass = "Icon Icon--neutral";
      break;
  }

  if (boolDisplayNaked) {
    colorClass = colorClass + " Icon--naked";
  }

  if (boolNoGap) {
    colorClass = colorClass + " Icon--nogap";
  }
  
  return (
    <>
      <div className={colorClass}>
        <img className="Icon__image" src={imageList[iconIndex]} alt={strIconName} />
        <p className="Icon__label font-label">{boolHideLabel ? <></> : strIconName}</p>
      </div>
    </>
  );
}
