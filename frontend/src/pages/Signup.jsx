import { useState } from "react";
import API from "../services/api";

function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSignup = async () => {
    await API.post("/auth/signup", form);
    alert("Signup successful");
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;