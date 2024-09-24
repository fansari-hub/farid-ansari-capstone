import "./PersonalityConfig.scss";

export default function PersonalityConfig({ personalityObj }) {
  return (
    <>
      <div className="PersonalityConfig">
        <div className="PersonalityConfig__group">
          <p className="PersonalityConfig__group__label">Name:</p>
          < input className="PersonalityConfig__group__data" type="text" value={personalityObj.name}></input>
        </div>
        <div className="PersonalityConfig__group">
          <p className="PersonalityConfig__group__label">Temperature:</p>
          < input className="PersonalityConfig__group__data" type="text" value={personalityObj.temperature}></input>
        </div>
        <div className="PersonalityConfig__group">
          <p className="PersonalityConfig__group__label">Prompt:</p>
          < input className="PersonalityConfig__group__data" type="text" value={personalityObj.conditionPrompt}></input>
        </div>        
        <div className="PersonalityConfig__group">
          <button>Save</button>
          <div></div>
        </div>  
      </div>
    </>
  );
}
