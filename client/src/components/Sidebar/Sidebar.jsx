import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useRef } from "react";
import SessionItem from "../SessionItem/SessionItem";

export default function Sidebar({ chatSessions, switchSessionCallBack, addSessionCallback, deleteSessionCallback, updateSessionCallback, activeSession }) {
  const fieldListRef = useRef();

  return (
    <>
      <div className="Sidebar">
        <div className="Sidebar__settings">
          <Link to="/setup">
            <p className="Sidebar__settings__item">Settings</p>
          </Link>
        </div>
        <div className="Sidebar__sessionList">
          <Link to="/">
          {(chatSessions.length > 0) ? (<></>) : (<p className="Sidebar__sessionList__title">Chats</p>)}
          </Link>
          <hr className="Sidebar__sessionList__ruler"/>
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
