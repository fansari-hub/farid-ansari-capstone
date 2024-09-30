import "./VisualSelectModal.scss";


export default function VisualSelectModal({ selectionArray, callback }) {

    const handleCallBack = (selectedItem) => {
        callback(selectedItem);
    }

  return (
    <>
    <div className="VisualSelectModal">
    <div className="VisualSelectModal__container">
    {selectionArray.map((e,i) => {
        return (
            <div className="VisualSelectModal__container__group" key={i}>
                <div className="VisualSelectModal__container__group__item" onClick={() => {handleCallBack(e.id)}}>
                <p className="VisualSelectModal__container__group__item__label" >{e.text}</p>
                <img className="VisualSelectModal__container__group__item__image" src={e.image}/>
                </div>
            </div>
        )
    } )}
    </div>
    </div>
    </>
  );
}
