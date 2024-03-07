// ExpertData.js
import React, { useState, useEffect } from "react";
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {API_BASE_URL} from "../../api"
import axios from "axios";

const Product = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}products`);
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
      .delete(`${API_BASE_URL}deleteProduct/${id}`)
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
    { field: "name", headerName: "name", width: 200 },
    { field: "description", headerName: "description", width: 200 },
    { field: "price", headerName: "price", width: 200 },
    { field: "image", headerName: "image", width: 200 },
    {
      field: "Delete",
      headerName: "Delete",
      width: 200,
      renderCell: (params) => (
        <div>
          <IconButton aria-label="delete">
            <DeleteIcon onClick={() => handleDelete(params.row._id)} />
          </IconButton>
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
          <div className="datatable" style={{ height: 600, width: '100%'}}>
            <div className="datatableTitle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black' , fontWeight: 'bold', fontSize: 30 }}>
           
           Products Data
           
            </div>
              <Button variant="contained" href="#contained-buttons" className="button" size="small">
                <Link to="/product/new" style={{ textDecoration: "none", color: 'white' }}>Add New Product</Link>
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
                rows={experts}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                getRowId={(row) => row._id}
              />
            ) : (
              <p>No Product data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
            }
export default Product;
