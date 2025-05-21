import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import UserProfile from "./UserProfile";

const Home = () => {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState();
  const [imagePath, setImagePath] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [openProfile,setOpenProfile] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/profile/${userId}`
        );
        setUser(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleupload = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file);
    try {
      const res = await fetch("http://localhost:3030/upload", {
        method: "POST",
        body: formdata,
      });

      const result = await res.json();
      console.log(result);
      setImagePath(`http://localhost:3030/${result.path.replace("\\", "/")}`);
      console.log(imagePath);
    } catch (err) {
      alert("failed to upload image", err);
      console.log("error in uploading image", err);
    }
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
    setOpenProfile((prev)=>!prev)
    // navigate("/user")
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const Captialize = () => {
    const username = user?.name;

    const upper = username.charAt(0).toUpperCase() + username.slice(1);
    return upper;
  };

  return (
    <div className="main">
      <header className="navbar">
        <h2 className="logo">{user ? `${Captialize()}'s App` : "App"}</h2>
        <nav>
          <div className="menu">
            <p>Home</p>
            <p>About</p>
            <p>Services</p>
          </div>
         
              <CgProfile size={35} className="profile-icon" onClick={()=>setOpenProfile((prev)=>!prev)} /> 
            { openProfile && <div className="profile-div dropdownProfile">
              <ul className="profile-ul">
                <li onClick={handleProfileClick}>Profile </li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
             
            </div>
          }
          
        </nav>
      </header>

      <div className="content">
        <marquee>
          <h2>Welcome to the Home Page</h2>
        </marquee>
      </div>


      
    

      <div>
        {imagePath ? (
        <img src={imagePath} alt="image" width={350} />
      ) : (
        <div className="file-container">
          <div className="file-div">
            <IoCloudUploadOutline className="icon" />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              name=""
              id="file"
            />
          </div>
          <button onClick={handleupload}>upload</button>
        </div>
      )}
      </div>
      

      <div className="card">
        {showProfile && user && (
          <div className="profile-card">
            <h2>Profile Details</h2>
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Country:</strong> {user.country}
            </p>
          </div>
        )}
      </div>
    {/* <UserProfile showProfile={showProfile} user={user}/> */}
  
    </div>
  );
};

export default Home;
