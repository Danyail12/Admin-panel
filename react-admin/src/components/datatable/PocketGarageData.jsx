import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';

import axios from 'axios';

const PocketGarrageData = () => {
  const [bookingSessions, setBookingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { expertId } = useParams(); // Get expertId from route parameters

  useEffect(() => {
    const fetchBookingSessions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/v1/admin/expert/${expertId}/getallPocketGarrageForExpert`);
        
        if (response.data.success) {
          setBookingSessions(response.data.onsiteInspection);
          console.log('Response:', response.data);
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
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'expires', headerName: 'Expires', width: 200 },
    { field: 'carBrand', headerName: 'Car Brand', width: 200 },
    { field: 'carModel', headerName: 'Car Model', width: 200 },
    { field: 'year', headerName: 'Year', width: 200 },
    { field: 'certificates', headerName: 'Certificates', width: 200 },
    { field: 'carImages', headerName: 'Car Images', width: 200, renderCell: (params) => <img src={params.value.url} alt="Car" style={{ width: 100, height: 100 }} /> },
    { field: 'Registration', headerName: 'Registration', width: 200, renderCell: (params) => <img src={params.value.url} alt="Registration" style={{ width: 100, height: 100 }} /> },
    { field: 'InspectionCertificates', headerName: 'Inspection Certificates', width: 200, renderCell: (params) => <img src={params.value.url} alt="Inspection Certificates" style={{ width: 100, height: 100 }} /> },
    { field: 'historyFile', headerName: 'History File', width: 200 },
    { field: 'ownershipHistory', headerName: 'Ownership History', width: 200 },
    { field: 'invoicesBill', headerName: 'Invoices Bill', width: 200 },
    { field: 'AdditionalPhotos', headerName: 'Additional Photos', width: 200 },
    { field: 'additionalDocuments', headerName: 'Additional Documents', width: 200 },
  ];
  
  

  return (
    <div className="new">
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      <div className="top">
    <div className="datatable" style={{ height: 800 , width: '100%', marginTop: 20 }}>
      <div className="datatableTitle" style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#1976d2', color: 'white' }}>All Pocket Garrage Data </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : bookingSessions.length > 0 ? (
        <DataGrid
  rows={bookingSessions.map(session => ({
    _id: session._id,
    name: session.name,
    email: session.email,
    description: session.description,
    expires: session.expires,
    carBrand: session.carBrand,
    carModel: session.carModel,
    year: session.year,
    certificates: session.certificates,
    carImages: session.carImages,
    Registration: session.Registration,
    InspectionCertificates: session.InspectionCertificates,
    historyFile: session.historyFile,
    ownershipHistory: session.ownershipHistory,
    invoicesBill: session.invoicesBill,
    AdditionalPhotos: session.AdditionalPhotos,
    additionalDocuments: session.additionalDocuments,
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

export default PocketGarrageData;
