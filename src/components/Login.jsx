import axios from "axios";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import "../App.css";
function Login({ setIsLogin, setIsLoggedIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleLogin() {
    if (email.trim() === "") {
      setEmailError("Email is Required");
    }
    else if (!email.includes("@")) {
      setEmailError("Invalid Email Address")

    }
    else {
      setEmailError("");
    }
    //password Validation
    if (password.trim() === "") {
      setPasswordError("Password is required");
    }
    else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    }
    else {
      setPasswordError("");
    }
    if (email.trim() === "" || !email.includes("@") || password.trim() === "" || password.length < 8) {
      return;
    }
    //object to send to the backend
    const loginData = {
      email: email,
      password: password
    };
    axios.post("http://localhost:8080/api/login", loginData)
      .then((response) => {
        // Handle successful login
        toast.success("Login successful!");
        console.log("Login response:", response.data);
        console.log(response.data);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", response.data.id); // Store the user ID in local storage
        setIsLoggedIn(true);
      })
      .catch((error) => {
        // Handle login error
        toast.error("Login failed!");
        console.log(error);
      });

  }

  return (
    <div className="container">
      <div className="card">
        <h1> Expense-Flow </h1>
        <h4> Welcome Buddy ❤️  </h4>
        <input className="input-box" type="text" placeholder="Email Address" value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }} />{emailError && (
          <p className="error">{emailError}</p>
        )}

        <div className="password-container">
          <input
            className="input-box"
            type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => { setpassword(e.target.value); setPasswordError(""); }}
          />{passwordError && (
            <p className="error">{passwordError}</p>
          )}
          <FaEye
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <br /> <br />
        <button className="click" onClick={handleLogin}>Login</button>
        <p className="Signup-text">Don't have an account ? <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsLogin(false);
          }}
        >
          Sign Up
        </a>

        </p>
      </div>

    </div>
  );
}

export default Login;