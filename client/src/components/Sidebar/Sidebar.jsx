import "./Sidebar.scss";
import { Link } from "react-router-dom";

export default function Sidebar({ chatSessions, switchSessionCallBack }) {
  return (
    <>
      <div className="Sidebar">
        <div className="Sidebar__settings">
          <Link to="/setup">
          <p>Personality Settings</p>
          </Link>
          
        </div>
        <br></br>
        <br></br>
        <div className="Sidebar__sessionList">
        <Link to="/">
        <p className="Sidebar__sessionList__title">Chat Sessions</p>
        </Link>
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
