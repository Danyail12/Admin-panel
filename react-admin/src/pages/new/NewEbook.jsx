import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const NewEbook = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [lectureData, setLectureData] = useState({
    title: "",
    description: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLectureData({
      ...lectureData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleAddLecture = async (e) => {
    e.preventDefault();
    console.log("bookingId:", id);
  
    try {
      const authToken = localStorage.getItem('token');
      console.log('authToken:', authToken);
      // const yourAuthToken = `Bearer ${authToken}`;
      
      const response = await axios.post(
        `http://localhost:5000/api/v1/ebook/${id}`,
        lectureData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, 
            "Content-Type": "application/json",
          },
        }
      );
  
          console.log("Response:", response);
  
          if (response.data.success) {
              console.log("Lecture added successfully:", response.data.message);
              alert("Lecture added successfully");
              navigate("/booking");
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
  
 
  
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    name={input.name}
                    value={lectureData[input.name]}
                    placeholder={input.placeholder}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            <button type="button" onClick={(e) => handleAddLecture(e)}>
  Add Book
</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEbook;
