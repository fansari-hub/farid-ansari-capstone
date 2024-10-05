import "./SignInPage.scss";
import UserConfig from "../../components/UserConfig/UserConfig";
import defaultLogo from "../../assets/images/logo.webp";

import { useContext, useState } from "react";
import { UserAuthorizedContext } from "../../App";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserRegisterLogin from "../../components/UserRegisterLogin/UserRegisterLogin";

function SignInPage() {
  const { authorizedUser, createAccountUsingEmail, signInWithEmail, signInWithGoogle, signInWithGitHub, logoutUser, userName, userEmail } = useContext(UserAuthorizedContext);
  const [formActive, setFormActive] = useState(false);
  const [formMode, setFormMode] = useState("login");

  const handleEmailLogin = () => {
    setFormMode("login");
    setFormActive(true);
  };

  const handleEmailRegister = () => {
    setFormMode("create");
    setFormActive(true);
  };

  const callbackEmailRegister = async (strEmail, strPassword, strName) => {
    await createAccountUsingEmail(strEmail, strPassword, strName);
    setFormActive(false);
  };

  const callbackEmailLogin = async (strEmail, strPassword) => {
    await signInWithEmail(strEmail, strPassword);
    setFormActive(false);
  };

  const handleCancelForm = () => {
    setFormActive(false);
  };

  return (
    <>
      <div className="SignInPage">
        <div className="SignInPage__left">
          <Sidebar chatSessions={[]} />
        </div>
        <div className="SignInPage__main">
          <div className="SignInPage__main__title">
            <p>Welcome to JanusGPT!</p>

            {authorizedUser ? "" : "Please Sign in to continue"}
          </div>
          <div className="SignInPage__main__content">
            {authorizedUser ? (
              <>
                <UserConfig userObj={{ name: userName, email: userEmail }} signOutCallBack={logoutUser} />
              </>
            ) : (
              <div className="SignInPage__main__content__signInBlock">
                {formActive ? (
                  <UserRegisterLogin createUserCallBack={callbackEmailRegister} loginUserCallBack={callbackEmailLogin} cancelLoginCallback={handleCancelForm} loginType={formMode} />
                ) : (
                  <>
                    <button className="SignInPage__main__content__signInBlock__button" onClick={signInWithGoogle}>
                      Sign in with Google
                    </button>
                    <button className="SignInPage__main__content__signInBlock__button" onClick={signInWithGitHub}>
                      Sign in with GitHub
                    </button>
                    <button className="SignInPage__main__content__signInBlock__button" onClick={handleEmailLogin}>
                      Sign in using Password
                    </button>
                    <button className="SignInPage__main__content__signInBlock__button" onClick={handleEmailRegister}>
                      Create New Account
                    </button>
                  </>
                )}
              </div>
            )}
            <img className="SignInPage__main__content__logo" src={defaultLogo} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
