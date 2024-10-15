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

  const handleLogin = (e) => {
    e.preventDefault();

    if (inputPassword.current.value === "" || inputEmail.current.value === "") {
      return false;
    }

    loginUserCallBack(formData.email, formData.password);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    cancelLoginCallback();
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (inputEmail.current.value === "") {
      alert("Please enter your email address in order to request a password reset.");
      return false;
    }

  }

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
            <div className="UserRegisterLogin__group__buttons">
            {loginType === "create" ? (
              <div className="UserRegisterLogin__group__buttons__btn" onClick={handleRegister}>
                <Icon iconIndex={9} iconName={"Create Account"} actionType="positive" />
              </div>
            ) : (
              <div className="UserRegisterLogin__group__buttons__btn" onClick={handleLogin}>
                <Icon iconIndex={8} iconName={"Login"} actionType="positive" />
              </div>
            )}
              <div className="UserRegisterLogin__group__buttons__btn" onClick={handleCancel}>
                <Icon iconIndex={6} iconName={"Cancel"} actionType="negative" />
              </div>
              <div className="UserRegisterLogin__group__buttons__btn" onClick={handlePasswordReset}>
                <Icon iconIndex={2} iconName={"Reset Password"} actionType="positive" />
              </div>
              <div className="UserRegisterLogin__group__buttons__btn" onClick={handleCancel}>
                <Icon iconIndex={5} iconName={"Verify Email"} actionType="positive" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
