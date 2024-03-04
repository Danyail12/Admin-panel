import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Booking = () => {
  const [bookingSessions, setBookingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lectureData, setLectureData] = useState({
    title: "",
    description: "",
  });


  useEffect(() => {
    const fetchBookingSessions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://kukuk-backend-ealq.vercel.app/api/v1/ebook`);
        
        if (response.data.success) {
          setBookingSessions(response.data.eBook);
          console.log('Response:', response.data.eBook);
        } else {
          setError(response.data.message || 'Error fetching eBooks');
        }
      } catch (error) {
        console.error('Error fetching eBooks:', error);
        setError('Error fetching eBooks');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingSessions();
  }, []);

  const handleAddLecture = async (id) => {
    try {
      const response = await axios.post(`https://kukuk-backend-ealq.vercel.app/api/v1/ebook/${id}`, {
        title: lectureData.title,
        description: lectureData.description,
      });
  
      if (response.data.success) {
        console.log("Lecture added successfully:", response.data.message);
        setLectureData({
          title: "",
          description: "",
        });
      } else {
        console.error("Failed to add lecture:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding lecture:", error.message);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://kukuk-backend-ealq.vercel.app/api/v1/deleteEbook/${id}`)
      .then((response) => {
        if (response.data) {
          setBookingSessions(bookingSessions.filter((bookingSession) => bookingSession._id !== id));
        } else {
          setError(response.data.message || "Error deleting course");
        }
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
        setError("Error deleting course");
      });
  }


  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'category', headerName: 'Category', width: 200 },
    { field: 'Price', headerName: 'Price', width: 200 },
    { field: 'numOfEbooks', headerName: 'Number of eBooks', width: 200 },
    { field: 'fullBook', headerName: 'Full Book', width: 200 },
    { field: 'poster', headerName: 'Poster', width: 200, renderCell: (params) => <img src={params.row.poster.url} alt="Poster" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> },
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
      
    },
    {
      field: "Add to Lecture",
      headerName: "Add to Lecture",
      width: 200,
      renderCell: (params) => (
          <div>
            <IconButton aria-label="example" onClick={() => handleAddLecture(params.row._id)}>
              <Button>
              <Link to={`/Booking/${params.row._id}`}>
                  Add to lectures
              </Link>
              </Button>
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
    <div className="datatable" style={{ height: 800 , width: '100%', marginTop: 20 }}>
      <div className="datatableTitle" style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#1976d2', color: 'white' }}>All EBooking Data
      
      <Button variant="contained" href="#contained-buttons" className="button " size="small" >
      <Link to="/Booking/new" style={{ textDecoration: "none" }}>Create New book</Link>
</Button>
       </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : bookingSessions.length > 0 ? (
        <DataGrid
          rows={bookingSessions.map(session => ({ _id: session._id, ...session, poster: session.poster }))}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      ) : (
        <p>No eBook data available</p>
      )}
    </div>
  </div>
    </div>
  </div>
  );
};

export default Booking;
