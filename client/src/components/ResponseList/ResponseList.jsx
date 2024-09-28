import utils from "../../utils/utils.js";
import ResponseCard from "../ResponseCard/ResponseCard.jsx";

export default function ResponseList({ responses, _callback }) {

  return (
    <>
      <div className="ResponseList">
        {responses.map((i, x) => (
          <ResponseCard messageID = {i.messageID} name={i.name} avatarImg={i.avatarImg} content={i.content} timestamp={utils.getRelativeTime(i.timestamp)} key={x}/>
        ))}
      </div>
    </>
  );
}