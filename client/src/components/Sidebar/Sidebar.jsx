import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useRef } from "react";
import SessionItem from "../SessionItem/SessionItem";

export default function Sidebar({ chatSessions, switchSessionCallBack, addSessionCallback, deleteSessionCallback, updateSessionCallback }) {
  const fieldListRef = useRef();

  return (
    <>
      <div className="Sidebar">
        <div className="Sidebar__settings">
          <Link to="/setup">
            <p className="Sidebar__settings__item">Personality Settings</p>
          </Link>
        </div>
        <div className="Sidebar__sessionList">
          <Link to="/">
            <p className="Sidebar__sessionList__title">Chats:</p>
          </Link>
          <div className="Sidebar__sessionList__list">
            {chatSessions.map((i, x) => {
              return <SessionItem chatSession={i} switchSessionCallBack={switchSessionCallBack} deleteSessionCallback={deleteSessionCallback} updateSessionCallback={updateSessionCallback} key={x} />;
            })}
          </div>
        </div>
        {addSessionCallback ? (
            <button className="Sidebar__add" onClick={addSessionCallback}>
              +
            </button>
          ) : (
            <></>
          )}
      </div>
    </>
  );
}
