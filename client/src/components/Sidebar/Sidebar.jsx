import "./Sidebar.scss";

export default function Sidebar({ chatSessions, switchSessionCallBack }) {
  return (
    <>
      <div className="Sidebar">
        <div className="Sidebar__settings">
          <p>Personality Settings</p>
        </div>
        <br></br>
        <br></br>
        <div className="Sidebar__sessionList">
          <p className="Sidebar__sessionList__title">Chat Sessions</p>
          <div className="Sidebar__sessionList__list">
            {chatSessions.map((i) => (
              <p
                onClick={() => {
                  switchSessionCallBack(i.sessionID);
                }}
              >
                {i.sessionName}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
