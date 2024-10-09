import "./UserRegisterLogin.scss";
import { useRef, useState } from "react";
import Icon from "../Icon/Icon";

export default function UserRegisterLogin({ createUserCallBack, loginUserCallBack, cancelLoginCallback, loginType }) {
  const [formData, setFormData] = useState({});
  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

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

  const handleLogin = (e) => {
    e.preventDefault();
    loginUserCallBack(formData.email, formData.password);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    cancelLoginCallback();
  };

  return (
    <>
      <div className="UserRegisterLogin">
        <form>
          {loginType === "create" ? (
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
          {loginType === "create" ? (
            <div className="UserRegisterLogin__group">
              <p className="UserRegisterLogin__group__label">Confirm Pasword</p>
              <input ref={inputConfirmPassword} name="confirmPassword" className="UserRegisterLogin__group__data" type="password" value={formData.confirmPassword} onChange={handleChange}></input>
            </div>
          ) : (
            <></>
          )}

          <br></br>
          <div className="UserRegisterLogin__group">
            {loginType === "create" ? (
              <div className="UserRegisterLogin__group__register" onClick={handleRegister} ><Icon iconIndex={9} iconName={"Create Account"} actionType="positive" /></div>
            ) : (
              <div className="UserRegisterLogin__group__register" onClick={handleLogin} ><Icon iconIndex={8} iconName={"Login"} actionType="positive" /></div>
            )}

            <div className="UserRegisterLogin__group__cancel" onClick={handleCancel} ><Icon iconIndex={6} iconName={"Cancel"} actionType="negative" /></div>
            <div></div>
          </div>
        </form>
      </div>
    </>
  );
}
