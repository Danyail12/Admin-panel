import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import {API_BASE_URL} from "../../api"
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Online = () => {
  const [bookingSessions, setBookingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { expertId } = useParams(); // Get expertId from route parameters

  useEffect(() => {
    const fetchBookingSessions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}admin/getAllOnlineInspection`);
        
        if (response.data.success) {
          setBookingSessions(response.data.onlineInspection);
          console.log('Response:', response.data.onlineInspection);
        } else {
          setError(response.data.message || 'Error fetching booking sessions');
        }
      } catch (error) {
        console.error('Error fetching booking sessions:', error);
        setError('Error fetching booking sessions');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingSessions();
  }, [expertId]);

  const columns = [
    { field: '_id', headerName:t('id'), width: 200 },
    { field: 'make', headerName: t('columns.make'), width: 200 },
    { field: 'model', headerName: t('columns.model'), width: 200 },
    { field: 'year', headerName: t('columns.year'), width: 200 },
    { field: 'vehicleVin', headerName: t('columns.vehicleVin'), width: 200 },
    { field: 'body', headerName: t('columns.body'), width: 200 },
    { field: 'licensePlates', headerName: t('columns.licensePlates'), width: 200 },
    { field: 'handTruck', headerName: t('columns.handTruck'), width: 200 },
    { field: 'glass', headerName: t('columns.glass'), width: 200 },
    { field: 'wiperBlades', headerName: t('columns.wiperBlades'), width: 200 },
    { field: 'reflectors', headerName: t('columns.reflectors'), width: 200 },
    { field: 'mudFlaps', headerName: t('columns.mudFlaps'), width: 200 },
    { field: 'racking', headerName: t('columns.racking'), width: 200 },
    { field: 'coldCurtains', headerName: t('columns.coldCurtains'), width: 200 },
    { field: 'doorIssues', headerName: t('columns.doorIssues'), width: 200 },
    { field: 'insurance', headerName: t('columns.insurance'), width: 200 },
    { field: 'headlights', headerName: t('columns.headlights'), width: 200 },
    { field: 'turnSignals', headerName: t('columns.turnSignals'), width: 200 },
    { field: 'makerLights', headerName: t('columns.makerLights'), width: 200 },
    { field: 'brakeLights', headerName: t('columns.brakeLights'), width: 200 },
    { field: 'carImages', headerName: t('columns.carImages'), width: 200 },
    { field: 'registrationImages', headerName: t('columns.registrationImages'), width: 200 },
    { field: 'documents', headerName: t('columns.documents'), width: 200 },
  ];

  

  return (
    <div className="new">
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      <div className="top">
    <div className="datatable" style={{ height: 800 , width: '100%', marginTop: 20 }}>
      <div className="datatableTitle" style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center', color: 'black' ,fontSize: 30, fontWeight: 'bold' }}>All Online Inspection Data </div>
   
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : bookingSessions.length > 0 ? (
        <DataGrid
          rows={bookingSessions.map(session => ({
            _id: session._id,
            make: session.make,
            model: session.model,
            year: session.year,
            vechicleVin: session.vechicleVin,
            body: session.body,
            licensePlates: session.licensePlates,
            handTruck: session.handTruck,
            glass: session.glass,
            wiperBlades: session.wiperBlades,
            Reflectors: session.Reflectors,
            mudFlaps: session.mudFlaps,
            racking: session.racking,
            coldCurtains: session.coldCurtains,
            doorIssues: session.doorIssues,
            insurance: session.insurance,
            headlights: session.headlights,
            turnsignals: session.turnsignals,
            makerlights: session.makerlights,
            brakeLights: session.brakeLights,
            carImages: session.carImages,
            RegistrationImages: session.RegistrationImages,
            Documents: session.Documents,
            poster: session.poster
          }))}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      ) : (
        <p>No Online Inspection data available</p>
      )}
    </div>
  </div>
  </div>
  </div>
  );
};

export default Online;
