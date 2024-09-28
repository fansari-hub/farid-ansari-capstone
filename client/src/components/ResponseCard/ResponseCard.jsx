import "./ResponseCard.scss";
import defaultLogo from "../../assets/images/logo.webp"

export default function ResponseCard({ name, avatarImg, timestamp, content, messageID }) {
  if (name === "You"){
    avatarImg = defaultLogo;
  }
  return (
    <>
      <div className="ResponseCard">
        <div className="ResponseCard__left">
          <img src={avatarImg} className="ResponseCard__left__image" />
        </div>
        <div className="ResponseCard__right">
          <div className="ResponseCard__right__header">
            <p className="ResponseCard__right__header__name">{name}</p>
            <p className="ResponseCard__right__header__date">{timestamp}</p>
          </div>
          <div className="ResponseCard__right__content" dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </div>
    </>
  );
}
