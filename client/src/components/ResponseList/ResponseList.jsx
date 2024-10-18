/*****************************
 * Component: RespondCardList
 * Purpose: Creates a list of ResponseCards to display the content of a active chat session
 * Prop notes: none
 * Usage notes: none
 ****************************/
import ResponseCard from "../ResponseCard/ResponseCard.jsx";

export default function ResponseList({ objArrResponses, audioPlayCallBack }) {
  
  return (
    <>
      <div className="ResponseList">
        {objArrResponses.map((i, x) => (
          <ResponseCard objResponse={i} audioPlayCallBack={audioPlayCallBack} key={x} />
        ))}
      </div>
    </>
  );
}
