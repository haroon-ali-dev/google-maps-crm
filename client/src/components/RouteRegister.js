import { useState } from "react";

const RouteRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    
  }

  return (
    <div className="cont">
      <form onSubmit={submit}>
        <div className="form-input-container">
          <label>
            Name
            <br />
            <input id="email" type="text" value={email} onChange={(e) => { setEmail(e.target.value); }} required />
          </label>
        </div>
        <div className="form-input-container">
          <label>
            Email
            <br />
            <input id="password" type="email" value={password} onChange={(e) => { setPassword(e.target.value); }} required />
          </label>
        </div>
        <div className="form-submit-container">
          <button className="btn btn-add" id="btn-add" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default RouteRegister;