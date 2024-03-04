import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {
  const [totalData, setTotalData] = useState(null);
   const { t } = useTranslation();
  useEffect(() => {
    const fetchTotalData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/admin/totalData');
        setTotalData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching total data:', error);
      }
    };

    fetchTotalData();
  }, []);
 
  const translateWidgetType = (type) => {
    // Map your widget types to the corresponding translation keys
    const translations = {
      user: 'widgets.user',
      Experts: 'widgets.expert',
      earning: 'widgets.earning',
      "Booking Sessions": 'widgets.bookingSessions',
      'online Inspections': 'widgets.onlineInspections',
    'onsite Inspections': 'widgets.onsiteInspections',
    'Pocket Garrage': 'widgets.pocketGarrage',
    };

    return t(translations[type]); 
  };
 
 
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          {totalData && (
            <>
          <Widget type={translateWidgetType("user")} amount={totalData.users} />
              <Widget type={translateWidgetType("Experts")} amount={totalData.expert} />
              <Widget type={translateWidgetType("earning")} amount={totalData.ebooks} />
              <Widget type={translateWidgetType("Booking Sessions")} amount={totalData.bookingSession} />
              <Widget type={translateWidgetType("online Inspections")} amount={totalData.onlineInspections} />
              <Widget type={translateWidgetType("onsite Inspections")} amount={totalData.onsiteInspections} />
              <Widget type={translateWidgetType("Pocket Garrage")} amount={totalData.pocket} />
            </>
          )}
        </div>     
           <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
