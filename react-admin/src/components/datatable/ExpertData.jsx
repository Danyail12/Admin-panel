// ExpertData.js
import React, { useState, useEffect } from "react";
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {API_BASE_URL} from "../../api"
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";

const ExpertData = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [show ,hide] = useState(false);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}getExperts`);
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
      .delete(`${API_BASE_URL}admin/expert/${id}`)
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
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (selectedIds) => {
    setSelectedRows(selectedIds);
  };

  const handleMultipleDelete = () => {
    axios
      .delete(`${API_BASE_URL}admin/multipleDeleteForProducts`, { data: { ids: selectedRows } })
      .then((response) => {
        if (response.data.success) {
          const updatedProducts = experts.filter(product => !selectedRows.includes(product._id));
          setExperts(updatedProducts);
        } else {
          setError(response.data.message || "Error deleting Products");
        }
      })
      .catch((error) => {
        console.error("Error deleting Products:", error.response ? error.response.data : error.message);
        setError("Error deleting Products. Please check the console for details.");
      });
  };
  const handleBlock = (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "Unactived" : "active"; // Corrected status handling
    const url = `${API_BASE_URL}/expert/${currentStatus}/${id}`;
  
    axios.put(url)
      .then((response) => {
        if (response.data.success) {
          setExperts((prevExperts) =>
            prevExperts.map((expert) =>
              expert._id === id ? { ...expert, status: newStatus } : expert
            )
          );
        } else {
          setError(response.data.message || "Error updating expert status");
        }
      })
      .catch((error) => {
        console.error(`Error updating expert status for ID ${id}:`, error);
        setError(`Error updating expert status for ID ${id}. Please check the console for details.`);
      });
  };
   

  
  const columns = [
    {
      field: "selection",
      headerName: "Selection",
      width: 100,
      renderHeader: (params) => (
        <Checkbox
          onChange={(e) =>
            handleSelectionChange(
              e.target.checked ? experts.map((course) => course._id) : []
            )
          }
        />
      ),
      renderCell: (params) => (
        <Checkbox
          checked={selectedRows.includes(params.row._id)}
          onChange={(e) =>
            handleSelectionChange(
              e.target.checked
                ? [...selectedRows, params.row._id]
                : selectedRows.filter((id) => id !== params.row._id)
            )
          }
        />
      ),
    },

    { field: "_id", headerName: "ID", width: 200 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "city", headerName: "City", width: 200 },
    { field: "country", headerName: "Country", width: 200 },
    { field: "specialization", headerName: "Specialization", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
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
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
    {
      field: "Block/Unblock",
      headerName: "Block/Unblock",
      width: 200,
      renderCell: (params) => (
        <div>
          <Button onClick={() => handleBlock(params.row._id, params.row.status)}>
            {params.row.status === "active" ? "Unactived" : "active"}
          </Button>
        </div>
      ),
    },
    
  ];

  return (
    <div className="new">
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      <div className="top">

      <div className="datatable" style={{  height: 200, width: '100%' }}>
      <div className="datatableTitle" style={{ display: 'flex', justifyContent: 'center',  color: 'black', fontWeight: 'bold', fontSize: 30 }}>
             
             Expert Data
              </div>
      <Button variant="contained"  className="button" size="small" >

        <Link to="/expert/new" style={{ textDecoration: "none", color: 'white' }}>Add New Expert</Link>
        </Button> 
      
      <IconButton aria-label="delete" onClick={() => handleMultipleDelete()}>
                <DeleteIcon />
              </IconButton>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : experts.length > 0 ? (
        <DataGrid
        className="datagrid"
        autoHeight
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
