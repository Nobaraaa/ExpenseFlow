import "./App.css"
import Login from "./components/Login";
//import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import { useState } from "react";
function App() {

  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true"); // Check if user is logged in from local storage

  if (isLoggedIn) {
    return <Dashboard setIsLoggedIn={setLoggedIn} />
  }

  return isLogin ? (

    <Login setIsLogin={setIsLogin} setIsLoggedIn={setLoggedIn} />

  ) : (
    <Signup setIsLogin={setIsLogin} />
  )

}
export default App;

