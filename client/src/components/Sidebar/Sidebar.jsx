import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import { UserAuthorizedContext } from "../../App";
import SessionItem from "../SessionItem/SessionItem";
import Icon from "../Icon/Icon";

export default function Sidebar({ chatSessions, switchSessionCallBack, addSessionCallback, deleteSessionCallback, updateSessionCallback, activeSession }) {
  const fieldListRef = useRef();
   const { authorizedUser } = useContext(UserAuthorizedContext);


  return (
    <>
      <div className="Sidebar">
        <div className="Sidebar__settings">
          {authorizedUser ? (
            <Link to="/signin">
            <div className="Sidebar__settings__auth font-menu" ><Icon iconIndex={7} iconName={"Account"} actionType="neutral" displayNaked={true} /></div>
          </Link>
          ) : (
            <Link to="/signin">
              <div className="idebar__settings__auth font-menu"><Icon iconIndex={6} iconName={"Sign In"} actionType="neutral" displayNaked={true} /></div>
            </Link>
          )}
        
          <Link to="/setup">
            <div className="Sidebar__settings__item font-menu" ><Icon iconIndex={11} iconName={"Personalities"} actionType="neutral" displayNaked={true}/></div>
          </Link>
        </div>
        <div className="Sidebar__sessionList">
          <Link to="/">{chatSessions.length > 0 ? <></> : <div className="Sidebar__sessionList__title font-menu" ><Icon iconIndex={3} iconName={"Chat Sessions"} actionType="neutral" displayNaked={true}/></div>}</Link>
          <hr className="Sidebar__sessionList__ruler" />
          <div className="Sidebar__sessionList__list">
            {chatSessions.map((i, x) => {
              return <SessionItem chatSession={i} switchSessionCallBack={switchSessionCallBack} deleteSessionCallback={deleteSessionCallback} updateSessionCallback={updateSessionCallback} activeSession={activeSession} key={i.sessionID} />;
            })}
          </div>
        </div>
        {addSessionCallback ? (
          <div className="Sidebar__add"  onClick={addSessionCallback}><Icon iconIndex={0} iconName={"New Session"} actionType="neutral" /></div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
