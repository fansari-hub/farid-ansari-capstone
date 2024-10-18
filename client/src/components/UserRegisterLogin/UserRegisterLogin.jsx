/*****************************
 * Component: UserRegisterLogin
 * Purpose: Displays a form for registering a new email/password user or logging in an existing email/password user.
 * Prop notes: none
 * Usage notes: none
 ****************************/

import "./UserRegisterLogin.scss";
import { useRef, useState } from "react";
import Icon from "../Icon/Icon";

export default function UserRegisterLogin({ createUserCallBack, loginUserCallBack, cancelLoginCallback, strLoginType }) {
  const [formData, setFormData] = useState({});
  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();

  function handleChange(e){
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleRegister(e){
    e.preventDefault();

    if (inputName.current.value === "" || inputPassword.current.value === "" || inputConfirmPassword.current.value === "" || inputEmail.current.value === "") {
      return false;
    }

    if (!formData.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g)) {
      alert("Failed password complexity requirements : minimun 8 characters AND at least one letter, one number and one special character.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      alert(`Passwords do not match!`);
      return false;
    }
    createUserCallBack(formData.email, formData.password, formData.name);
  };

  function handleLogin(e){
    e.preventDefault();

    if (inputPassword.current.value === "" || inputEmail.current.value === "") {
      return false;
    }

    loginUserCallBack(formData.email, formData.password);
  };

  function handleCancel(e){
    e.preventDefault();
    cancelLoginCallback();
  };

  return (
    <>
      <div className="UserRegisterLogin">
        <form>
          {strLoginType === "create" ? (
            <div className="UserRegisterLogin__group">
              <p className="UserRegisterLogin__group__label">Name</p>
              <input ref={inputName} name="name" className="UserRegisterLogin__group__data" type="text" value={formData.name} onChange={handleChange}></input>
            </div>
          ) : (
            <></>
          )}

          <div className="UserRegisterLogin__group">
            <p className="UserRegisterLogin__group__label">Email</p>
            <input ref={inputEmail} name="email" className="UserRegisterLogin__group__data" type="email" value={formData.email} onChange={handleChange}></input>
          </div>
          <div className="UserRegisterLogin__group">
            <p className="UserRegisterLogin__group__label">Password</p>
            <input ref={inputPassword} name="password" className="UserRegisterLogin__group__data" type="password" value={formData.password} onChange={handleChange}></input>
          </div>
          {strLoginType === "create" ? (
            <div className="UserRegisterLogin__group">
              <p className="UserRegisterLogin__group__label">Confirm Pasword</p>
              <input ref={inputConfirmPassword} name="confirmPassword" className="UserRegisterLogin__group__data" type="password" value={formData.confirmPassword} onChange={handleChange}></input>
            </div>
          ) : (
            <></>
          )}

          <br></br>
          <div className="UserRegisterLogin__group">
            {strLoginType === "create" ? (
              <div className="UserRegisterLogin__group__register" onClick={handleRegister}>
                <Icon iconIndex={9} strIconName={"Create Account"} strActionType="positive" />
              </div>
            ) : (
              <div className="UserRegisterLogin__group__register" onClick={handleLogin}>
                <Icon iconIndex={8} strIconName={"Login"} strActionType="positive" />
              </div>
            )}

            <div className="UserRegisterLogin__group__cancel" onClick={handleCancel}>
              <Icon iconIndex={6} strIconName={"Cancel"} strActionType="negative" />
            </div>
            <div></div>
          </div>
        </form>
      </div>
    </>
  );
}
