import { useState } from "react";
import moment from "moment";

const CreateHistory = ({ cId, createHistory }) => {
  const [date, setDate] = useState("2022-05-05");
  const [info, setInfo] = useState("");

  const token = localStorage.getItem("token");

  const submit = async (e) => {
    e.preventDefault();

    if (!date || !info) {
      return alert("Please enter date and info.");
    }

    try {
      const res = await fetch(`http://localhost:3001/api/histories/${cId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ customerId: cId, date, info })
      });

      const data = await res.json();
      if (data.message === "success") {
        createHistory(data.history);
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <form className="form-create-history" onSubmit={submit}>
        <div>
          <label>
            Date
            <br />
            <input id="date" type="date" value={date} onChange={(e) => { setDate(moment(e.target.value).format('YYYY-MM-DD')); }} required />
          </label>
        </div>
        <div>
          <label>
            Info
            <br />
            <textarea id="info" cols="30" rows="10" value={info} onChange={(e) => { setInfo(e.target.value); }} required></textarea>
          </label>
        </div>
        <div>
          <button className="btn btn-add" id="btn-add" type="submit" style={{ marginTop: "0px" }}>Add</button>
        </div>
      </form>
    </div>
  );
}

export default CreateHistory;