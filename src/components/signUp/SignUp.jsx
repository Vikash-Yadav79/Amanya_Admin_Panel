import React, { useState } from "react";
import "./SignUp.css";
import api from "../api";

const statesInIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",102
];

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    employee_id: "",
    email: "",
    mobile_number: "",
    marital_status: "",
    qualification: "",
    designation: "",
    blood_group: "",
    address: "",
    country: "India", // Default to India
    state: "",
    city: "",
    pincode: "",
    bio: "",
    username: "",
    password: "",
    confirmPassword: "",
    status: "active",
    profilePicture: null,
    adharCardFront: null,
    adharCardBack: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create FormData object to handle file uploads
    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== "") {
        data.append(key, formData[key]);
      }
    }
  
    try {
      const response = await api.post('create-admin', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Sign Up Successful:', response.data);
      // Handle successful sign up, e.g., redirect to login page
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.error('Error response data:', error.response.data);
        // console.error('Error response status:', error.response.status);
        // console.error('Error response headers:', error.response.headers);
        
        // If the error response contains validation errors
        if (error.response.data.errors) {
          console.error('Validation errors:', error.response.data.errors);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">Admin SignUp</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Input Fields */}
                  {[
                    { label: "First Name", name: "first_name", type: "text", placeholder: "Enter First Name", required: true },
                    { label: "Last Name", name: "last_name", type: "text", placeholder: "Enter Last Name", required: true },
                    { label: "Email", name: "email", type: "email", placeholder: "Enter Email", required: true },
                    { label: "Mobile Number", name: "mobile_number", type: "tel", placeholder: "Enter Mobile Number", required: true },
                    { label: "Gender", name: "gender", type: "select", options: ["Select", "male", "female", "other"] },
                    { label: "Designation", name: "designation", type: "select", options: ["Select", "1", "2", "3", "4"] },
                    { label: "Blood Group", name: "blood_group", type: "select", options: ["Select", "1", "2", "3", "4"] },
                    { label: "Address", name: "address", type: "text", placeholder: "Enter Address", required: true },
                    { label: "Country", name: "country", type: "select", options: ["India",101] },
                    { label: "State", name: "state", type: "select", options: statesInIndia },
                    { label: "City", name: "city", type: "text", placeholder: "Enter City", required: true },
                    { label: "Pincode", name: "pincode", type: "text", placeholder: "Enter Pincode", required: true },
                    { label: "Age", name: "age", type: "text", placeholder: "Enter Age", required: true },
                    { label: "Marital Status", name: "marital_status", type: "select", options: ["Select", "Single", "Married"] },
                    { label: "Qualification", name: "qualification", type: "text", placeholder: "Enter Qualification", required: true },
                    { label: "Employee ID", name: "employee_id", type: "text", placeholder: "Enter Employee ID", required: true },
                  ].map(({ label, name, type, placeholder, options, required }, index) => (
                    <div className="col-xxl-3 col-lg-4 col-sm-6" key={index}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor={name}>
                          {label} {required && <span className="text-danger">*</span>}
                        </label>
                        {type === "select" ? (
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className={`ri-${name}-line`}></i>
                            </span>
                            <select
                              className="form-select"
                              id={name}
                              name={name}
                              value={formData[name]}
                              onChange={handleChange}
                            >
                              {options.map((option, i) => (
                                <option value={option} key={i}>{option}</option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <input
                            type={type}
                            className="form-control"
                            id={name}
                            placeholder={placeholder}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            required={required}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                  {/* File Upload Fields */}
                  {[
                    { label: "Profile Picture", name: "profilePicture" },
                    { label: "Adhar Card Front", name: "adharCardFront" },
                    { label: "Adhar Card Back", name: "adharCardBack" },
                  ].map(({ label, name }, index) => (
                    <div className="col-xxl-3 col-lg-4 col-sm-6" key={index}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor={name}>
                          {label}
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id={name}
                          name={name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  ))}
                  {/* Bio Field */}
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="bio">
                        Bio
                      </label>
                      <textarea
                        className="form-control"
                        id="bio"
                        rows="3"
                        placeholder="Enter Bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  {/* Username, Password, Confirm Password */}
                  {[
                    { label: "Username", name: "username", type: "text", placeholder: "Enter Username", required: true },
                    { label: "Password", name: "password", type: "password", placeholder: "Enter Password", required: true },
                    { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm Password", required: true },
                  ].map(({ label, name, type, placeholder, required }, index) => (
                    <div className="col-xxl-3 col-lg-4 col-sm-6" key={index}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor={name}>
                          {label} {required && <span className="text-danger">*</span>}
                        </label>
                        <input
                          type={type}
                          className="form-control"
                          id={name}
                          placeholder={placeholder}
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                          required={required}
                        />
                      </div>
                    </div>
                  ))}
                  {/* Status Field */}
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="status">
                        Status
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="ri-checkbox-circle-line"></i>
                        </span>
                        <select
                          className="form-select"
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
