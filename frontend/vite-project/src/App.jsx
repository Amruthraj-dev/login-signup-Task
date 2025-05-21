import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Home from "./components/Home";
import Login from "./components/login";
import "./App.css";
import UserProfile from "./components/UserProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Home />} />
        {/* <Route path="/user" element={<UserProfile />} /> */}

      </Routes>
    </Router>
  );
};

export default App;
