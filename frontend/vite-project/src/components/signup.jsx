import React, {  useState } from "react";
import axios from "axios";
import "./auth.css"
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const user = {
    name: "",
    email: "",
    country: "",
    phone: "",
    password: "",
  };

  const [userDetails, setUserDetails] = useState(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3030/signup",
        userDetails
      );

      alert("signup successful", response.data);
      setUserDetails(user);
      navigate("/login")
    } catch (err) {
      console.log("failed to signup", err);
    }
  };

  const handlelogin = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="heading"><h2>Registration Page</h2></div>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={userDetails.name}
          onChange={(e) =>
            setUserDetails({ ...userDetails, name: e.target.value })
          }
          id="name"
        />
        <br />
        <br />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
          id="email"
        />
        <br />
        <br />

        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          value={userDetails.country}
          onChange={(e) =>
            setUserDetails({ ...userDetails, country: e.target.value })
          }
          id="country"
        />
        <br />
        <br />

        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={userDetails.phone}
          onChange={(e) =>
            setUserDetails({ ...userDetails, phone: e.target.value })
          }
          id="phone"
        />
        <br />
        <br />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          value={userDetails.password}
          onChange={(e) =>
            setUserDetails({ ...userDetails, password: e.target.value })
          }
          id="password"
        />
        <br />
        <br />
        <div className="btn"> <button>Register</button></div>
       
      </form>
      <br />
      <br />

      <p>
        Already have an Account? <span onClick={handlelogin}>Login</span>
      </p>
    </div>
  );
};

export default Signup;
