import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

export default function Sidebar({ chatSessions, switchSessionCallBack, addSessionCallback, deleteSessionCallback, updateSessionCallback }) {
  const fieldListRef = useRef();
  const [formData, setFormData] = useState(null);

  function handleEditButton(button_name) {
    const targetField = fieldListRef.current.querySelector(`input[name='${button_name}']`);
    targetField.disabled = false;
    targetField.focus();
  }

  function handleUpdateName(button_name, sessionID) {
    const targetField = fieldListRef.current.querySelector(`input[name='${button_name}']`);
    targetField.disabled = true;
    updateSessionCallback(sessionID, targetField.value);
  }

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setFormData([...formData, {"name": name, "value": value}]);
  }

  return (
    <>
      <div className="Sidebar">
        <div className="Sidebar__settings">
          <Link to="/setup">
            <p>Personality Settings</p>
          </Link>
        </div>
        <br></br>
        <br></br>
        <div className="Sidebar__sessionList">
          <Link to="/">
            <p className="Sidebar__sessionList__title">Chat Sessions</p>
          </Link>
          <form ref={fieldListRef} className="Sidebar__sessionList__list">
            {chatSessions.map((i, x) => (
              <div className="Sidebar__sessionList__list__group">
                <div
                  className="Sidebar__sessionList__list__group__itemContainer"
                  onClick={() => {
                    switchSessionCallBack(i.sessionID);
                  }}
                >
                  <input
                    name={`session_${x}`}
                    type="text"
                    className="Sidebar__sessionList__list__group__item"
                    onBlur={() => {
                      handleUpdateName(`session_${x}`, i.sessionID);
                    }}
                    onChange={handleChange} defaultValue={i.sessionName}
                    disabled
                  />
                </div>
                {deleteSessionCallback ? (
                  <button
                    className="Sidebar__sessionList__list__group__delete"
                    onClick={() => {
                      deleteSessionCallback(i.sessionID);
                    }}
                  >
                    D
                  </button>
                ) : (
                  <></>
                )}
                {updateSessionCallback ? (
                  <button
                    className="Sidebar__sessionList__list__group__edit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEditButton(`session_${x}`);
                    }}
                  >
                    E
                  </button>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </form>
          {addSessionCallback ? <button onClick={addSessionCallback}>+</button> : <></>}
        </div>
      </div>
    </>
  );
}
