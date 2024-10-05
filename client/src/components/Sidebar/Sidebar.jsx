import "./Sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useContext } from "react";
import { UserAuthorizedContext } from "../../App";
import SessionItem from "../SessionItem/SessionItem";

export default function Sidebar({ chatSessions, switchSessionCallBack, addSessionCallback, deleteSessionCallback, updateSessionCallback, activeSession }) {
  const fieldListRef = useRef();
  // const navigate = useNavigate();
   const { authorizedUser } = useContext(UserAuthorizedContext);

  // function handleLogout() {
  //   logoutUser();
  //   navigate("/signin");
  // }

  return (
    <>
      <div className="Sidebar">
        <div className="Sidebar__settings">
          {authorizedUser ? (
            <Link to="/signin">
            <p className="Sidebar__settings__auth">Account</p>
          </Link>
          ) : (
            <Link to="/signin">
              <p className="Sidebar__settings__auth">Sign In</p>
            </Link>
          )}
        
          <Link to="/setup">
            <p className="Sidebar__settings__item">Settings</p>
          </Link>
        </div>
        <div className="Sidebar__sessionList">
          <Link to="/">{chatSessions.length > 0 ? <></> : <p className="Sidebar__sessionList__title">Chats</p>}</Link>
          <hr className="Sidebar__sessionList__ruler" />
          <div className="Sidebar__sessionList__list">
            {chatSessions.map((i, x) => {
              return <SessionItem chatSession={i} switchSessionCallBack={switchSessionCallBack} deleteSessionCallback={deleteSessionCallback} updateSessionCallback={updateSessionCallback} activeSession={activeSession} key={i.sessionID} />;
            })}
          </div>
        </div>
        {addSessionCallback ? (
          <button className="Sidebar__add" onClick={addSessionCallback}>
            +New
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
