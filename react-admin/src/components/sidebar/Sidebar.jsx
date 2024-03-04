import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { Button } from "@mui/material";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { Book, CountertopsRounded, GolfCourse } from "@mui/icons-material";
// import { useHistory } from "react-router";




const Sidebar = () => {
  const { t } = useTranslation();
 
  const navigate = useNavigate();

  const { dispatch, darkMode } = useContext(DarkModeContext);
  
  const handleLogout = async () => {
    try {
      const response = await axios.get("https://kukuk-backend-ealq.vercel.app/api/v1/logout");

      // Remove the token from localStorage or your authentication state
      localStorage.removeItem("token");

      // Redirect to the login page or any other page
  
      navigate("/login")

      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout error, display a message or redirect as needed
    }
  }; 

  // const { dispatch } = useContext(DarkModeContext);
  return (
    <div className={`sidebar ${darkMode ? 'dark' : ''}`}>
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Kukuk App</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
        <ul>
          <p className="title">{t('MAIN')}</p>
          <li>
            <DashboardIcon className="icon" />
            <span>{t('dashboard')}</span>
          </li>
          <p className="title">{t('LISTS')}</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>{t('users')}</span>
            </li>
          </Link>
          <Link to="/Expert" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>{t('expert')}</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>{t('products')}</span>
            </li>
          </Link>
          <Link to="/Booking" style={{ textDecoration: "none" }}>
            <li>
              <Book className="icon" />
              <span>{t('ebooks')}</span>
            </li>
          </Link>
          <Link to="/Course" style={{ textDecoration: "none" }}>
            <li>
              <Book className="icon" />
              <span>{t('courses')}</span>
            </li>
          </Link>
         
          {/* ... your existing code */}
          <p className="title">{t('SERVICE')}</p>
          <li>
            <CountertopsRounded className="icon" />
            <span>{t('coursesService')}</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>{t('onlineInspection')}</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>{t('onsiteInspection')}</span>
          </li>
          <p className="title">{t('USER')}</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>{t('profile')}</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={handleLogout}>{t('logout')}
            {/* <Button variant="contained" >{t('logout')}</Button> */}
            </span>
          </li>
          </ul>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
