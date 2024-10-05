import "./UserRegisterLogin.scss";
import { useRef, useState } from "react";

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
      <div className="UserConfig">
        <form>
          {loginType === "create" ? (
            <div className="UserConfig__group">
              <p className="UserConfig__group__label">Name</p>
              <input ref={inputName} name="name" className="UserConfig__group__data" type="text" value={formData.name} onChange={handleChange}></input>
            </div>
          ) : (
            <></>
          )}

          <div className="UserConfig__group">
            <p className="UserConfig__group__label">Email</p>
            <input ref={inputEmail} name="email" className="UserConfig__group__data" type="email" value={formData.email} onChange={handleChange}></input>
          </div>
          <div className="UserConfig__group">
            <p className="UserConfig__group__label">Password</p>
            <input ref={inputPassword} name="password" className="UserConfig__group__data" type="password" value={formData.password} onChange={handleChange}></input>
          </div>
          {loginType === "create" ? (
            <div className="UserConfig__group">
              <p className="UserConfig__group__label">Confirm Pasword</p>
              <input ref={inputConfirmPassword} name="confirmPassword" className="UserConfig__group__data" type="password" value={formData.confirmPassword} onChange={handleChange}></input>
            </div>
          ) : (
            <></>
          )}

          <br></br>
          <div className="UserConfig__group">
            {loginType === "create" ? (
              <button className="UserConfig__group__save" onClick={handleRegister}>
                Create Account
              </button>
            ) : (
              <button className="UserConfig__group__save" onClick={handleLogin}>
                Login
              </button>
            )}

            <button className="UserConfig__group__delete" onClick={handleCancel}>
              Cancel
            </button>
            <div></div>
          </div>
        </form>
      </div>
    </>
  );
}
