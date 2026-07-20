import "../App.css";

import { useState } from "react";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

function Signup({ setIsLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");


  //creating a function Here

  function handleSignup() {

    if (fullName.trim() === "") {
      setFullNameError("Name is Required");
    } else {
      setFullNameError("");
    }

    //email validation
    if (email.trim() === "") {
      setEmailError("Email is Required");
    }
    else if (!email.includes("@")) {
      setEmailError("Invalid Email Address")

    }
    else {
      setEmailError("");
    }

    //password validation
    if (password.trim() === "") {
      setPasswordError("Password is required");
    }
    else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    }
    else {
      setPasswordError("");
    }
    //confirm validation
    if (phone.trim() === "") {
      setPhoneError("Phone number is required");
    }
    else if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Phone number must be 10 digits");
    }
    else {
      setPhoneError("");
    }
    //object
    const user = {
      fullName,
      email,
      password,
      phone
    };

    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      !email.includes("@") ||
      phone.trim() === "" ||
      !/^\d{10}$/.test(phone) ||
      password.trim() === "" ||
      password.length < 8
    ) {
      return;
    }


    axios.post("http://localhost:8080/api/register", user)
      .then(() => {
        toast.success("Registration Successful!");
        setIsLogin(true);
      })
      .catch((error) => {
        console.log(error);
        toast("Registration Failed!");
      });

  }


  return (
    <div className="container">
      <div className="card1">
        <h1> Expense-Flow  </h1>
        <h4> Let's Create Account  </h4>
        <input className="input-box1" type="text" placeholder="Full Name " value={fullName} onChange={(e) => { setFullName(e.target.value); setFullNameError(""); }} />  {fullNameError && (
          <p className="error">{fullNameError}</p>
        )}


        <input className="input-box1" type="email" placeholder="Email Address" value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }} /> {emailError && (
          <p className="error">{emailError}</p>
        )}

        <div className="password-container">
          <input
            className="input-box1"
            type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
          />{passwordError && (
            <p className="error">{passwordError}</p>
          )}
          <FaEye
            className="eye-icon1"
            onClick={() => setShowPassword(!showPassword)}
          />
          <input
            className="input-box1"
            type="text" placeholder=" Phone Number" value={phone} onChange={(e) => { setPhone(e.target.value); setPhoneError(""); }}
          />{phoneError && (
            <p className="error">{phoneError}</p>
          )}

        </div>
        <br /> <br />
        <button className="click1" onClick={handleSignup}>Create Account</button>
        <p className="Signup-text">Already have an account ? <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsLogin(true);
          }}
        >
          Login
        </a></p>
      </div>

    </div>
  );
}

export default Signup;