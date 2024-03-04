// ExpertData.js
import React, { useState, useEffect } from "react";
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
import axios from "axios";

const ExpertData = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://kukuk-backend-ealq.vercel.app/api/v1/getExperts');
        if (response.data) {
          setExperts(response.data);
          console.log('Response:', response.data);
        } else {
          setError(response.data.message || "Error fetching experts");
        }
      } catch (error) {
        console.error("Error fetching experts:", error);
        setError("Error fetching experts");
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);


  const handleDelete = (id) => {
    axios
      .delete(`https://kukuk-backend-ealq.vercel.app/api/v1/admin/expert/${id}`)
      .then((response) => {
        if (response.data) {
          setExperts(experts.filter((expert) => expert._id !== id));
        } else {
          setError(response.data.message || "Error deleting expert");
        }
      })
      .catch((error) => {
        console.error("Error deleting expert:", error);
        setError("Error deleting expert");
      });
  }

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "city", headerName: "City", width: 200 },
    { field: "country", headerName: "Country", width: 200 },
    { field: "specialization", headerName: "Specialization", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    // {
    //   field: "pocketGarrage",
    //   headerName: "Pocket Garrage",
    //   width: 400,
    //   height: 400,
    //   renderCell: (params) => {
    //     return (
    //       <div>
    //         {params.row.pocketGarrage.map((item, index) => (
    //           <div key={index}>
    //             <p>Name: {item.name}</p>
    //             <p>Email: {item.email}</p>
    //             <p>Description: {item.description}</p>
    //             <p>Expires: {item.expires}</p>
    //             {/* Add other pocket garage fields as needed */}
    //           </div>
    //         ))}
    //       </div>
    //     );
    //   },
    // },
    // Add similar structures for onlineInspection and onsiteInspection
    // ...
    {
      field: "view Booking Session",
      headerName: "view Booking Session",
      width: 200,
      renderCell: (params) => (
        <div>
          <Button variant="contained" href="#contained-buttons" className="button" size="small" >

          <Link to={`/expert/${params.row._id}/booking-sessions`} style={{ textDecoration: "none" }}>View</Link>
          </Button>
        </div>
      ),
    },
    {
      field: "view online Inspection",
      headerName: "view online Inspection",
      width: 200,
      renderCell: (params) => (
        <div>
           <Button variant="contained" href="#contained-buttons" className="button" size="small" >

          <Link to={`/expert/${params.row._id}/online-inspections`}style={{ textDecoration: "none" }}>View</Link>
          </Button>
        </div>
      ),
    },
    {
      field: "view onsite Inspection",
      headerName: "view onsite Inspection",
      width: 200,
      renderCell: (params) => (
        <div>
           <Button variant="contained" href="#contained-buttons" className="button" size="small" >

          <Link to={`/expert/${params.row._id}/onsite-inspections`}style={{ textDecoration: "none" }}>View</Link>
          </Button>
        </div>
      ),
    },
    {
      field: "view Pocket Garage",
      headerName: "view Pocket Garage",
      width: 200,
      renderCell: (params) => (
        <div>
           <Button variant="contained" href="#contained-buttons" className="button" size="small" >

          <Link to={`/expert/${params.row._id}/pocket-garages`}  style={{ textDecoration: "none" }}>View</Link>
          </Button>
        </div>
      ),
      
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 200,
      renderCell: (params) => (
        <div>
          <IconButton aria-label="delete">
  <DeleteIcon 
onClick={() => handleDelete(params.row._id)}
  />
</IconButton>
      
        </div>
      ),
      
    }
    
  ];

  return (
    
    <div className="new">
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      <div className="top">

    <div className="datatable" style={{  height: 800, width: '100%', marginTop: 20 }}>
      <div className="datatableTitle" style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#1976d2', color: 'white' }}>
      <Button variant="contained" href="#contained-buttons" className="button" size="medium" >

        <Link to="/expert/new" style={{ textDecoration: "none" }}>Add New Expert</Link>
        </Button> 
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : experts.length > 0 ? (
        <DataGrid
        className="datagrid"
          rows={experts}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      ) : (
        <p>No expert data available</p>
      )}
    </div>
    </div>
    </div>
    </div>

  );
};

export default ExpertData;
