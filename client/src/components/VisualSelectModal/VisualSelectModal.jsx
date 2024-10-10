import "./VisualSelectModal.scss";
import defaultLogo from "../../assets/images/logo.webp";

export default function VisualSelectModal({ selectionArray, callback }) {
  const handleCallBack = (selectedItem) => {
    callback(selectedItem);
  };

  return (
    <>
      <div className="VisualSelectModal">
        <div className="VisualSelectModal__float">
          <div className="VisualSelectModal__float__closeButton" onClick={() => {handleCallBack();}}>X</div>
          <div className="VisualSelectModal__float__container">
                {selectionArray.map((e, i) => {return (<div className="VisualSelectModal__float__container__group" key={i}><div className="VisualSelectModal__float__container__group__item" onClick={() => {handleCallBack(e.id);}}><p className="VisualSelectModal__float__container__group__item__label">{e.text}</p><img className="VisualSelectModal__float__container__group__item__image" src={e.image.toLowerCase().includes("png") ? e.image : defaultLogo} /></div></div>);})}
          </div>
        </div>
      </div>
    </>
  );
}
