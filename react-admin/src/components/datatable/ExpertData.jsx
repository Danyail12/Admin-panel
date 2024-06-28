// ExpertData.js
import React, { useState, useEffect } from "react";
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton, Checkbox } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { API_BASE_URL } from "../../api";

const ImageComponent = ({ src }) => {
return <img src={src} alt="Example"
style={{ width: '75%', height: '75%', objectFit: 'fill' }} 

/>;
};
const ExpertData = () => {
  const imgSrc = '/pics/images.jpeg';
  
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}getExperts`);
        if (response.data && response.data.success) {
          setExperts(response.data.data); // Set the data correctly here
          console.log('Response:', response.data.data);
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
  };

  const handleSelectionChange = (selectedIds) => {
    setSelectedRows(selectedIds);
  };

  const handleMultipleDelete = () => {
    axios
      .delete(`${API_BASE_URL}admin/multipleDeleteForProducts`, { data: { ids: selectedRows } })
      .then((response) => {
        if (response.data.success) {
          const updatedProducts = experts.filter(expert => !selectedRows.includes(expert._id));
          setExperts(updatedProducts);
        } else {
          setError(response.data.message || "Error deleting products");
        }
      })
      .catch((error) => {
        console.error("Error deleting products:", error.response ? error.response.data : error.message);
        setError("Error deleting products. Please check the console for details.");
      });
  };

  const handleBlock = (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "unactive" : "active";
    const url = `${API_BASE_URL}expert/${currentStatus === "active" ? "unactive" : "active"}/${id}`;

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
      renderHeader: () => (
        <Checkbox
          onChange={(e) =>
            handleSelectionChange(
              e.target.checked ? experts.map((expert) => expert._id) : []
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
    { field: 'image', headerName: 'Image', width: 200, renderCell: (params) =>  <ImageComponent src={imgSrc}   />
  },
    { field: "email", headerName: "Email", width: 200 },
    { field: "city", headerName: "City", width: 200 },
    { field: "country", headerName: "Country", width: 200 },
    { field: "specialization", headerName: "Specialization", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "viewBookingSession",
      headerName: "View Booking Session",
      width: 200,
      renderCell: (params) => (
        <Button variant="contained" className="button" size="small">
          <Link to={`/expert/${params.row._id}/booking-sessions`} style={{ textDecoration: "none", color: 'white' }}>
            View
          </Link>
        </Button>
      ),
    },
    {
      field: "viewOnlineInspection",
      headerName: "View Online Inspection",
      width: 200,
      renderCell: (params) => (
        <Button variant="contained" className="button" size="small">
          <Link to={`/expert/${params.row._id}/online-inspections`} style={{ textDecoration: "none", color: 'white' }}>
            View
          </Link>
        </Button>
      ),
    },
    {
      field: "viewOnsiteInspection",
      headerName: "View Onsite Inspection",
      width: 200,
      renderCell: (params) => (
        <Button variant="contained" className="button" size="small">
          <Link to={`/expert/${params.row._id}/onsite-inspections`} style={{ textDecoration: "none", color: 'white' }}>
            View
          </Link>
        </Button>
      ),
    },
    {
      field: "viewPocketGarage",
      headerName: "View Pocket Garage",
      width: 200,
      renderCell: (params) => (
        <Button variant="contained" className="button" size="small">
          <Link to={`/expert/${params.row._id}/pocket-garages`} style={{ textDecoration: "none", color: 'white' }}>
            View
          </Link>
        </Button>
      ),
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 200,
      renderCell: (params) => (
        <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
    {
      field: "BlockUnblock",
      headerName: "Block/Unblock",
      width: 200,
      renderCell: (params) => (
        <Button onClick={() => handleBlock(params.row._id, params.row.status)}>
          {params.row.status === "active" ? "Unactived" : "Active"}
        </Button>
      ),
    },
  ];

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <div className="datatable" style={{ height: '100%', width: '100%' }}>
            <div className="datatableTitle" style={{ display: 'flex', justifyContent: 'center', color: 'black', fontWeight: 'bold', fontSize: 30 }}>
              Expert Data
            </div>
            <Button variant="contained" className="button" size="small">
              <Link to="/expert/new" style={{ textDecoration: "none", color: 'white' }}>
                Add New Expert
              </Link>
            </Button>
            <IconButton aria-label="delete" onClick={handleMultipleDelete}>
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
