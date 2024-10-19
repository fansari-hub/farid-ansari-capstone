/*****************************
 * Component: RespondCard
 * Purpose: Displays a single chat response (by user or chat personality)
 * Prop notes: none
 * Usage notes: none
 ****************************/

import webapi from "../../utils/webapi.js";
import utils from "../../utils/utils.js";
import "./ResponseCard.scss";
import defaultLogo from "../../assets/images/logo.webp"
const erroImgPath = webapi.URL + "/images/" + "brokenProfilePic.webp"


export default function ResponseCard({ objResponse, audioPlayCallBack }) {
  let avatarImg;
  
  if (objResponse.name === "You" || objResponse.name === "JanusGPT"){
    avatarImg = defaultLogo;
  }else{
    avatarImg = objResponse.avatarImg
  }


  function handlePlayBack(){
    audioPlayCallBack(objResponse.messageID);
  }
  
  return (
    <>
      <div className="ResponseCard">
        <div className="ResponseCard__left">
          <img src={avatarImg} 
                    onError={event => { 
                      event.target.src = erroImgPath
                      event.onerror = null;
                      }} 
          className="ResponseCard__left__image" onClick={handlePlayBack}/>
        </div>
        <div className="ResponseCard__right">
          <div className="ResponseCard__right__header">
            <p className="ResponseCard__right__header__name font-messageHeader">{objResponse.name}</p>
            <p className="ResponseCard__right__header__date font-messageHeaderDate">{utils.getRelativeTime(objResponse.timestamp)}</p>
          </div>
          <div className="ResponseCard__right__content font-chat" dangerouslySetInnerHTML={{ __html: objResponse.content }}></div>
        </div>
      </div>
    </>
  );
}
