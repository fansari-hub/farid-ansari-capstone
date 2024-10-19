/*****************************
 * Component: UserConfig
 * Purpose: Displays a simple logged in user profile page with logout functionality.
 * Prop notes: none
 * Usage notes: none
 ****************************/

import "./UserConfig.scss";
import Icon from "../Icon/Icon";

export default function UserConfig({ userObj, signOutCallBack }) {
  return (
    <>
      <div className="UserConfig">
        <form>
          <div className="UserConfig__group">
            <p className="UserConfig__group__label">Name</p>
            <input name="name" className="UserConfig__group__data" type="text" value={userObj.name} disabled="true"></input>
          </div>
          <div className="UserConfig__group">
            <p className="UserConfig__group__label">Email</p>
            <input name="email" className="UserConfig__group__data" type="text" value={userObj.email} disabled="true"></input>
          </div>
          <br></br>
          <div className="UserConfig__group">
            <div className="UserConfig__group__save" onClick={signOutCallBack}>
              <Icon iconIndex={6} strIconName={"Sign Out"} strActionType="neutral" />
            </div>
            <div></div>
          </div>
        </form>
      </div>
    </>
  );
}
