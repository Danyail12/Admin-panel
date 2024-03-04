import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';

import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OnlineInspectionData = () => {
  const [bookingSessions, setBookingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { expertId } = useParams(); // Get expertId from route parameters

  useEffect(() => {
    const fetchBookingSessions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://kukuk-backend-ealq.vercel.app/api/v1/admin/expert/${expertId}/OnlineInspectionForExpert`);
        
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
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'make', headerName: 'Make', width: 200 },
    { field: 'model', headerName: 'Model', width: 200 },
    { field: 'year', headerName: 'Year', width: 200 },
    { field: 'vechicleVin', headerName: 'Vehicle VIN', width: 200 },
    { field: 'body', headerName: 'Body', width: 200 },
    { field: 'licensePlates', headerName: 'License Plates', width: 200 },
    { field: 'handTruck', headerName: 'Hand Truck', width: 200 },
    { field: 'glass', headerName: 'Glass', width: 200 },
    { field: 'wiperBlades', headerName: 'Wiper Blades', width: 200 },
    { field: 'Reflectors', headerName: 'Reflectors', width: 200 },
    { field: 'mudFlaps', headerName: 'Mud Flaps', width: 200 },
    { field: 'racking', headerName: 'Racking', width: 200 },
    { field: 'coldCurtains', headerName: 'Cold Curtains', width: 200 },
    { field: 'doorIssues', headerName: 'Door Issues', width: 200 },
    { field: 'insurance', headerName: 'Insurance', width: 200 },
    { field: 'headlights', headerName: 'Headlights', width: 200 },
    { field: 'turnsignals', headerName: 'Turn Signals', width: 200 },
    { field: 'makerlights', headerName: 'Maker Lights', width: 200 },
    { field: 'brakeLights', headerName: 'Brake Lights', width: 200 },
    { field: 'carImages', headerName: 'Car Images', width: 200 },
    { field: 'RegistrationImages', headerName: 'Registration Images', width: 200 },
    { field: 'Documents', headerName: 'Documents', width: 200 },
  ];
  

  return (
    <div className="new">
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      <div className="top">
    <div className="datatable" style={{ height: 800 , width: '100%', marginTop: 20 }}>
      <div className="datatableTitle" style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#1976d2', color: 'white' }}>All Online Inspection Data </div>
   
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
        <p>No booking session data available</p>
      )}
    </div>
  </div>
  </div>
  </div>
  );
};

export default OnlineInspectionData;
