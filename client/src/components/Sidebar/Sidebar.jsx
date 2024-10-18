/*****************************
 * Component: Sidebar
 * Purpose: Responsible for managing various elements displayed on the sidebar such as session list, add session button and navigation links.
 * Prop notes: none
 * Usage notes: none
 ****************************/

import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserAuthorizedContext } from "../../App";
import SessionItem from "../SessionItem/SessionItem";
import Icon from "../Icon/Icon";

export default function Sidebar({ objArrChatSessions, switchSessionCallBack, addSessionCallback, deleteSessionCallback, updateSessionCallback, strActiveSession }) {
  const { authorizedUser } = useContext(UserAuthorizedContext);

  return (
    <>
      <div className="Sidebar">
        <div className="Sidebar__settings">
          {authorizedUser ? (
            <Link to="/signin">
              <div className="Sidebar__settings__auth font-menu">
                <Icon iconIndex={7} strIconName={"Account"} strActionType="neutral" boolDisplayNaked={true} />
              </div>
            </Link>
          ) : (
            <Link to="/signin">
              <div className="idebar__settings__auth font-menu">
                <Icon iconIndex={19} strIconName={"Sign In"} strActionType="neutral" boolDisplayNaked={true} />
              </div>
            </Link>
          )}

          <Link to="/setup">
            <div className="Sidebar__settings__item font-menu">
              <Icon iconIndex={11} strIconName={"Personalities"} strActionType="neutral" boolDisplayNaked={true} />
            </div>
          </Link>
        </div>
        <div className="Sidebar__sessionList">
          <Link to="/">
            {objArrChatSessions.length > 0 ? (
              <></>
            ) : (
              <div className="Sidebar__sessionList__title font-menu">
                <Icon iconIndex={3} strIconName={"Chat Sessions"} strActionType="neutral" boolDisplayNaked={true} />
              </div>
            )}
          </Link>
          <hr className="Sidebar__sessionList__ruler" />
          <div className="Sidebar__sessionList__list">
            {objArrChatSessions.map((i, x) => {
              return <SessionItem objChatSession={i} switchSessionCallBack={switchSessionCallBack} deleteSessionCallback={deleteSessionCallback} updateSessionCallback={updateSessionCallback} strActiveSession={strActiveSession} key={i.sessionID} />;
            })}
          </div>
        </div>
        {addSessionCallback ? (
          <div className="Sidebar__add" onClick={addSessionCallback}>
            <Icon iconIndex={0} strIconName={"New Session"} strActionType="neutral" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
