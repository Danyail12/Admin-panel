import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns } from "../../datatablesource";
import { adminAPI } from "../../api";
import { Button, ButtonBase } from "@mui/material";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all users from the backend when the component mounts
    adminAPI.getAllUsers()
      .then((response) => {
        setData(response.success ? response.users : []);
        console.log(response);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
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
    
    <div className="datatable" style={{  height: 800, width: '100%', marginTop: 20 }}>
    <div className="datatableTitle" style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#1976d2', color: 'white' }}>
      Add New User
        <Link to="/users/new" className="link" style={{ textDecoration: 'none' }}>
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    
    </div>
  );
};

export default Datatable;
