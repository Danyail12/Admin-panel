import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {API_BASE_URL} from "../../api"
import axios from "axios";

const CreateToCourses = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const fieldName = e.target.name.toLowerCase();
    const fieldValue = e.target.value;
  
    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      // Make a POST request to your backend API
      const response = await axios.post(
        `${API_BASE_URL}createProduct`,
        formData ,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
        );
        
        console.log(response.data);
      console.log(response);

      if (response.data.success) {
        alert("Product created successfully.");
        // Additional logic or redirection can be added here after successful creation
        navigate("/product");
        setFormData({
            name: "",
            description: "",
            price: "",
        });
      } else {
        alert("Failed to create Product.");
      }
    } catch (error) {
      console.error("Error creating Product:", error);
      alert("An error occurred while creating the Product.");
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
      name={input.label.toLowerCase()}  // Corrected this line
      value={formData[input.label]}  // Updated this line
      placeholder={input.placeholder}
      onChange={handleInputChange}
    />
  </div>
))}

          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Send
</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);
};

export default CreateToCourses;
