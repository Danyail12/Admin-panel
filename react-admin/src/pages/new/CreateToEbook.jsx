import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateToEbook = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    createby: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, category, createby, price } = formData;

    // if (!name || !description || !category || !createby || !price) {
    //   return alert("All fields are required.");
    // }

    try {
     
      // Make a POST request to your backend API
      const response = await axios.post("https://kukuk-backend-ealq.vercel.app/api/v1/createEbook", formData ,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
      );
      if (response.data.success) {
        alert("book created successfully.");
        // Additional logic or redirection can be added here after successful creation
        navigate("/Booking");
      } else {
        alert("Failed to create course.");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      alert("An error occurred while creating the course.");
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
  </div>  );
};

export default CreateToEbook;
