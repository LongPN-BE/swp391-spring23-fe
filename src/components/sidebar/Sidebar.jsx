import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupsIcon from '@mui/icons-material/Groups';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import StadiumIcon from '@mui/icons-material/Stadium';
import SportsIcon from '@mui/icons-material/Sports';
import { Link } from "react-router-dom";
import logo from "./logo.png"

const Sidebar = () => {

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("access_token")
    console.log("user is logged out")
    window.location.href = "/"
  }

  return (

    <div className="sidebar">
      <div className="top">
        <img src={logo} alt="" className="logo-img" />
        <span className="logo">Admin</span>
      </div>
      <div className="center">
        <ul>
          <p className="title">Main</p>

          <Link to="/admin" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">Account & User</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/order" style={{ textDecoration: "none" }}>
            <li>
              <FactCheckIcon className="icon" />
              <span>Order List</span>
            </li>
          </Link>
          {/* <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link> */}


          <p className="title">Manager</p>
          <Link to="/stadium" style={{ textDecoration: "none" }}>
            <li>
              <StadiumIcon className="icon" />
              <span>Stadium</span>
            </li>
          </Link>

          <Link to="/club" style={{ textDecoration: "none" }}>
            <li>
              <GroupsIcon className="icon" />
              <span>Club</span>
            </li>
          </Link>
          <Link to="/match" style={{ textDecoration: "none" }}>
            <li>
              <SportsIcon className="icon" />
              <span>Match</span>
            </li>
          </Link>

          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppIcon className="icon" />
              <span onClick={handleLogout}>Logout</span>
            </li>
          </Link>
        </ul >
      </div >
    </div >
  );
};

export default Sidebar;
