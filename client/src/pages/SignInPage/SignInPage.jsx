import "./SignInPage.scss";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuthorizedContext } from "../../App";
import Sidebar from "../../components/Sidebar/Sidebar";

function SignInPage() {
const navigate = useNavigate();

const {authorizedUser, signInWithGoogle, logoutUser, userName } = useContext(UserAuthorizedContext)

if (authorizedUser){
   navigate("/");
}

  return (
    <>
      <div className="SignInPage">
        <div className="SignInPage__left">
        {/* <Sidebar chatSessions={[]}/> */}
        </div>
        <div className="SignInPage__main">
        
          <div className="SignInPage__main__title">
            <p>Welcome to JanusGPT!</p>
            <br></br>
            {authorizedUser ? `You are authorized ${userName}!` : "Please Sign in to continue"}</div>
          <div className="SignInPage__main__content">
            {authorizedUser ? (
              <button onClick={logoutUser}>Sign Out</button>
            ) : (
              <div className="SignInPage__main__content__signInBlock">
                <button onClick={signInWithGoogle}>Sign in with Google</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
