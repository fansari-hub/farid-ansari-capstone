import utils from "../../utils/utils.js";
import ResponseCard from "../ResponseCard/ResponseCard.jsx";

export default function ResponseList({ responses, _callback }) {

  return (
    <>
      <div className="ResponseList">
        {responses.map((i, x) => (
          <ResponseCard name={i.name} content={i.content} timestamp={utils.getRelativeTime(i.timestamp)} image={i.image} key={x}/>
        ))}
      </div>
    </>
  );
}