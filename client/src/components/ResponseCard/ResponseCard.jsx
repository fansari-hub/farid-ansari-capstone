import utils from "../../utils/utils.js";
import "./ResponseCard.scss";
import defaultLogo from "../../assets/images/logo.webp"


export default function ResponseCard({ responseObj, audioPlayCallBack }) {
  let avatarImg;
  
  if (responseObj.name === "You"){
    avatarImg = defaultLogo;
  }
  else{
    avatarImg = responseObj.avatarImg
  }


  function handlePlayBack(){
    audioPlayCallBack(responseObj.messageID);
  }
  
  return (
    <>
      <div className="ResponseCard">
        <div className="ResponseCard__left">
          <img src={avatarImg} className="ResponseCard__left__image" onClick={handlePlayBack}/>
        </div>
        <div className="ResponseCard__right">
          <div className="ResponseCard__right__header">
            <p className="ResponseCard__right__header__name">{responseObj.name}</p>
            <p className="ResponseCard__right__header__date">{utils.getRelativeTime(responseObj.timestamp)}</p>
          </div>
          <div className="ResponseCard__right__content" dangerouslySetInnerHTML={{ __html: responseObj.content }}></div>
        </div>
      </div>
    </>
  );
}
