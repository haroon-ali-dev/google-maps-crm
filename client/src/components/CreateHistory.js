import { useState } from "react";

const CreateHistory = ({ cId, createHistory }) => {
  const [date, setDate] = useState("");
  const [info, setInfo] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!date || !info) {
      return alert("Please enter date and info.");
    }

    try {
      const res = await fetch(`http://localhost:3001/api/histories/${cId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      <form onSubmit={submit}>
        <div>
          <label>
            Date
            <input id="name" type="date" value={date} onChange={(e) => { setDate(e.target.value); }} required />
          </label>
        </div>
        <div>
          <label>
            Info
            <textarea id="info" value={info} onChange={(e) => { setInfo(e.target.value); }} required></textarea>
          </label>
        </div>
        <div>
          <button id="btn-add" type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export default CreateHistory;