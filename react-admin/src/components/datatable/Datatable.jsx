import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns } from "../../datatablesource";
import { adminAPI } from "../../api";
import { API_BASE_URL } from "../../api";
import { Button, ButtonBase } from "@mui/material";
import axios from "axios";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}admin/users`);
        console.log(response.data);
  
        // Check if the response data and users array are defined
        if (response.data && response.data.users) {
          const usersWithUserRole = response.data.users.filter(user => user.role === "user");
  
          if (usersWithUserRole.length > 0) {
            setData(usersWithUserRole);
          } else {
            console.error('No users with the role "user" found');
            setError('No users found with the role "user"');
          }
        } else {
          console.error('Invalid response format:', response);
          setError('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users');
      }
    };
  
    fetchData();
  }, []);
  
  
  const handleDelete = (id) => {
    // Ensure id is defined and not an empty string
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) {
      return;
    }
    if (!id || typeof id !== 'string' || id.trim() === '') {
      console.error('Invalid ID');
      return;
    }


    // Implement delete functionality using the backend API
    adminAPI.deleteUser(id)
      .then((response) => {
        if (response.success) {
          setData((prevData) => prevData.filter((item) => item._id !== id));
        } else {
          console.error('Error deleting user:', response.message);
          setError('Error deleting user');
        }
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        setError('Error deleting user');
      });
  };
  
  

  const actionColumn = [
    {
      field: "Delete",
      headerName: "Delete",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
           <Button
  onClick={() => handleDelete(params.row._id)}
>
  Delete
</Button>
</div>
        );
      },
    },
  
  ];


  const columns = [
    { field: "_id", headerName: "ID", width: 200 },

    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    // Add more fields based on your schema
    { field: "role", headerName: "Role", width: 200 },
    { field: "createdAt", headerName: "Created At", width: 200 },
    // Example for embedded tasks
    // Example for embedded pocketGarrage
    {
      field: "pocketGarrage",
      headerName: "Pocket Garrage",
      width: 200,
      renderCell: (params) => (
        <div>
          {params.row.pocketGarrage.map((garage, index) => (
            <div key={index}>
              {`Name: ${garage.name}, Email: ${garage.email}, Description: ${garage.description}`}
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>
      ),
    },
    // Add more fields as needed
  ];
  

  return (
    <div className="new">
    <div className="newContainer">
      <div className="top">
    <div className="datatable" style={{  height: 200, width: '100%' }}>
    <div className="datatableTitle" style={{ display: 'flex', justifyContent: 'center', color: 'black', fontSize: 30 , fontWeight: 'bold' }}>
    
        User Data    
      </div>
     
      <DataGrid
        className="datagrid"
        autoHeight
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    
    </div>
    </div>
    </div>
    </div>
  );
};

export default Datatable;
