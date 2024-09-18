import "./ResponseCard.scss";

export default function ResponseCard({ name, timestamp, content, image }) {
  const renderImage = () => {
    if (image) {
      return (
        <>
          <br />
          <img className="ResponseCard__content__image" src={image} alt="vision" />
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div className="ResponseCard">
        <div className="ResponseCard__header">
          <p className="ResponseCard__header__name">{name}</p>
          <p className="ResponseCard__header__date">{timestamp}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
        {renderImage()}
      </div>
    </>
  );
}
