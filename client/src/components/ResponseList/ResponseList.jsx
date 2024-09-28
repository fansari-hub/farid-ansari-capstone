import ResponseCard from "../ResponseCard/ResponseCard.jsx";

export default function ResponseList({ responses, audioPlayCallBack }) {

  return (
    <>
      <div className="ResponseList">
        {responses.map((i, x) => (
          <ResponseCard responseObj={i} audioPlayCallBack={audioPlayCallBack} key={x}/>
        ))}
      </div>
    </>
  );
}