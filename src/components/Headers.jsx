import React from "react";
import { TbBrandBooking } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
import { logoutUser } from "../features/userSlice";
import { IoMdCreate } from "react-icons/io";
import { SlUser } from "react-icons/sl";
import Logo from "../assets/logo.png"

const Headers = () => {
  let dispatch = useDispatch();
  let { light } = useSelector((state) => state.store);

  function logout() {
    dispatch(logoutUser());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
  return (
    <div
      className="headersMain"
      style={{
        background: !light ? "black" : "",
        color: !light ? "white" : "",
        boxShadow: !light ? "2px 2px 2px white" : "",
      }}
    >
      <div className="headersPart1">
        <Link to="/">
          <img src={Logo} style={{height:"40px",width:"40px"}}/>
          {/* <h4>ZolloPedia</h4> */}
        </Link>
      </div>

      <div className="headersPart2">
        <Link to="/userPlaces" style={{ color: "white" }}>
          <SlUser className="headersIcons" />
        </Link>

        <Link to="createPlace">
          <IoMdCreate className="headersIcons" style={{ color: "white" }} />
        </Link>
        
        <Link to="/Bookings">
        <TbBrandBooking className="headersIcons" style={{color:"white"}} />
        </Link>
      <AiOutlineLogout className="headersIcons" onClick={logout} />
        {/* <AiOutlineLogout className="headersIcons" onClick={logout} /> */}
      </div>
    </div>
  );
};

export default Headers;
