import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';

import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookingSessionData = () => {
  const [bookingSessions, setBookingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { expertId } = useParams(); // Get expertId from route parameters

  useEffect(() => {
    const fetchBookingSessions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/v1/admin/expert/${expertId}/booking-sessions`);
        
        if (response.data.success) {
          setBookingSessions(response.data.bookingSessions);
          console.log('Response:', response.data.bookingSessions);
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
    { field: 'ownership', headerName: 'Ownership', width: 200 },
    { field: 'durationofownership', headerName: 'Duration of Ownership', width: 200 },
    { field: 'notableFeatures', headerName: 'Notable Features', width: 200 },
    { field: 'purpose', headerName: 'Purpose', width: 200 },
    { field: 'additionalDetails', headerName: 'Additional Details', width: 200 },
    { field: 'question1', headerName: 'Question 1', width: 200 },
    { field: 'question2', headerName: 'Question 2', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'time', headerName: 'Time', width: 200 },
    { field: 'make', headerName: 'Make', width: 200 },
    { field: 'model', headerName: 'Model', width: 200 },
    { field: 'year', headerName: 'Year', width: 200 },
    { field: 'vehicleVin', headerName: 'Vehicle VIN', width: 200 },
    { field: 'sessionDescription', headerName: 'Session Description', width: 200 },
    { field: 'currentVehicleDescription', headerName: 'Current Vehicle Description', width: 200 },
    { field: 'linkToAdvertisement', headerName: 'Link To Advertisement', width: 200 },
  ];

  return (
    <div className="new">
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      <div className="top">
    <div className="datatable" style={{ height: 800 , width: '100%', marginTop: 20 }}>
      <div className="datatableTitle" style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#1976d2', color: 'white' }}>All Booking Session Data </div>
   
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : bookingSessions.length > 0 ? (
        <DataGrid
          rows={bookingSessions.map(session => ({ _id: session._id, ...session.booking, poster: session.poster }))}
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

export default BookingSessionData;
