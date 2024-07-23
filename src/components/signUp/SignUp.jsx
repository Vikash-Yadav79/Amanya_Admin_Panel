import React, { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    designation: "",
    bloodGroup: "",
    address: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    profilePicture: "",
    adharCardFront: "",
    adharCardBack: "",
    bio: "",
    username: "",
    password: "",
    confirmPassword: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">Admin Signup</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a1">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="a1"
                        placeholder="Enter First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a2">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="a2"
                        placeholder="Enter Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a3">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="a3"
                        placeholder="Enter Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a4">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="a4"
                        placeholder="Enter Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a5">
                        Gender
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="ri-user-2-line"></i>
                        </span>
                        <select
                          className="form-select"
                          id="a5"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                        >
                          <option value="0">Select</option>
                          <option value="1">Male</option>
                          <option value="2">Female</option>
                          <option value="3">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a6">
                        Designation
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="ri-briefcase-4-line"></i>
                        </span>
                        <select
                          className="form-select"
                          id="a6"
                          name="designation"
                          value={formData.designation}
                          onChange={handleChange}
                        >
                          <option value="0">Select</option>
                          <option value="1">Clerk</option>
                          <option value="2">Manager</option>
                          <option value="3">HR</option>
                          <option value="4">Admin</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a10">
                        Blood Group
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="ri-customer-service-2-line"></i>
                        </span>
                        <select
                          className="form-select"
                          id="a10"
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleChange}
                          required
                        >
                          <option value="0">Select</option>
                          <option value="1">A+</option>
                          <option value="2">A-</option>
                          <option value="3">B+</option>
                          <option value="4">B-</option>
                          <option value="5">AB+</option>
                          <option value="6">AB-</option>
                          <option value="7">O+</option>
                          <option value="8">O-</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a11">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="a11"
                        placeholder="Enter Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a12">
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="a12"
                        placeholder="Enter Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a13">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="a13"
                        placeholder="Enter State"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a14">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="a14"
                        placeholder="Enter City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a15">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="a15"
                        placeholder="Enter Postal Code"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a16">
                        Profile Picture
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="a16"
                        name="profilePicture"
                        onChange={(e) => handleChange(e, "profilePicture")}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a17">
                        Adhar Card Front
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="a17"
                        name="adharCardFront"
                        onChange={(e) => handleChange(e, "adharCardFront")}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a18">
                        Adhar Card Back
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="a18"
                        name="adharCardBack"
                        onChange={(e) => handleChange(e, "adharCardBack")}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a19">
                        Bio
                      </label>
                      <textarea
                        className="form-control"
                        id="a19"
                        rows="3"
                        placeholder="Enter Bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a20">
                        Username <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="a20"
                        placeholder="Enter Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a21">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="a21"
                        placeholder="Enter Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a22">
                        Confirm Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="a22"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-6">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a23">
                        Status
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="ri-checkbox-circle-line"></i>
                        </span>
                        <select
                          className="form-select"
                          id="a23"
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
