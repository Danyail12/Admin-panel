import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

// ... (imports)

// ... (imports)

const Widget = ({ type }) => {
  let data;
  const { t } = useTranslation();

  const [totalData, setTotalData] = useState(null);

  useEffect(() => {
    const fetchTotalData = async () => {
      try {
        const response = await axios.get('https://kukuk-backend-ealq.vercel.app/api/v1/admin/totalData');
        setTotalData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching total data:', error);
      }
    };

    fetchTotalData();
  }, []);

  switch (type) {
    case "widgets.user":
      data = {
        title: t('users'),
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
        count: totalData ? totalData.users : 0,
      };
      break;
    case "widgets.expert":
      data = {
        title: t('expert'),
        isMoney: false,
        link: "See all experts",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        count: totalData ? totalData.expert : 0,
      };
      break;
    case "widgets.earning":
      data = {
        title: t('ebooks'),
        isMoney: false,
        link: "See all ebooks",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        count: totalData ? totalData.ebooks : 0,
      };
      break;
    case "widgets.bookingSessions":
      data = {
        title: t('BookingSessions'),
        isMoney: false,
        link: "See all Booking Sessions",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        count: totalData ? totalData.bookingSession : 0,
      };
      break;
    case "widgets.onlineInspections":
      data = {
        title: t('online Inspections'),
        isMoney: false,
        link: "See all online inspections",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        count: totalData ? totalData.onlineInspections : 0,
      };
      break;
    case "widgets.onsiteInspections":
      data = {
        title: t('Online Inspections'),
        isMoney: false,
        link: "See all onsite inspections",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        count: totalData ? totalData.onsiteInspections : 0,
      };
      break;
    case "widgets.pocketGarrage":
      data = {
        title: t('Pocket Garrage'),
        isMoney: false,
        link: "See all Pocket Garrage",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        count: totalData ? totalData.pocket : 0,
      };
      break;
    default:
      console.error("Invalid type:", type);
      break;
  }
  if (!totalData) {
    return null; // or you can render a loading state or handle it in another way
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.count}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
