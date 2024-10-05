import "./SignInPage.scss";
import UserConfig from "../../components/UserConfig/UserConfig";
import defaultLogo from "../../assets/images/logo.webp";

import { useContext } from "react";
import { UserAuthorizedContext } from "../../App";
import Sidebar from "../../components/Sidebar/Sidebar";

function SignInPage() {
  const { authorizedUser, signInWithGoogle, logoutUser, userName, userEmail } = useContext(UserAuthorizedContext);

  return (
    <>
      <div className="SignInPage">
        <div className="SignInPage__left">
          <Sidebar chatSessions={[]} />
        </div>
        <div className="SignInPage__main">
          <div className="SignInPage__main__title">
            <p>Welcome to JanusGPT!</p>
            
            {authorizedUser ? "": "Please Sign in to continue"}
          </div>
          <div className="SignInPage__main__content">
            {authorizedUser ? (
              <>
              <UserConfig userObj={{"name" : userName, "email" : userEmail}} signOutCallBack={logoutUser}/>
              </>
            ) : (
              <div className="SignInPage__main__content__signInBlock">
                <button className="SignInPage__main__content__signInBlock__button" onClick={signInWithGoogle}>Sign in with Google</button>
                <button className="SignInPage__main__content__signInBlock__button" >Sign in with Email</button>
              </div>
            )}
            <img className="SignInPage__main__content__logo" src={defaultLogo}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
