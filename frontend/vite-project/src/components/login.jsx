import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Login = () => {
  const user = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const [userDetail, setUserDetail] = useState(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3030/login",
        userDetail
      );
      console.log(response);
      if (response.status !== 200 && response.status !== 201) {
        alert("failed to login ");
      } else {
        localStorage.setItem("userId", response.data.id);
        navigate(`/profile/${response.data.id}`);
      }
      console.log(response.data);
    } catch (err) {
     
      alert(`failed to login ${err.message}`);
    }
  };

  const handlesignup = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="heading">
        <h2>Login Page</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {/* <table>
          <tr> */}
        {/* <td> */}
        <label htmlFor="email">Email</label>
        {/* </td>
            <td> */}{" "}
        <input
          type="text"
          name="email"
          value={userDetail.email}
          onChange={(e) =>
            setUserDetail({ ...userDetail, email: e.target.value })
          }
          id="email"
        />
        {/* </td>
          </tr> */}
        <br />
        <br />
        {/* <tr>
            <td> */}{" "}
        <label htmlFor="password">Password</label>
        {/* </td> */}
        {/* <td> */}{" "}
        <input
          type="text"
          name="password"
          value={userDetail.password}
          onChange={(e) =>
            setUserDetail({ ...userDetail, password: e.target.value })
          }
          id="password"
        />
        {/* </td> */}
        {/* </tr> */}
        <br />
        <br />
        {/* </table> */}
        <div className="btn">
          <button>Login</button>
        </div>
      </form>
      <br />
      <br />
      <p>
        Don't have an Account? <span onClick={handlesignup}>Register</span>
      </p>
    </div>
  );
};

export default Login;
