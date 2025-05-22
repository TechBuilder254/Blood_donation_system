import React, { useState } from "react";
import "../styles/style.css";
import axios from "axios";

const DonorRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    bloodGroup: "",
    phone: "",
    email: "",
    Age: "",
    city: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/register-donor", formData); // Replace with your actual endpoint
      console.log("Server response:", response.data);
      alert("Registration successful!");
      setFormData({
        fullName: "",
        bloodGroup: "",
        phone: "",
        email: "",
        Age: "",
        city: "",
        gender: "",
      });
    } catch (error) {
      console.error("Error registering donor:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <section className="donor-registration container">
      <h2>Register as a Blood Donor</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A−</option>
            <option value="B+">B+</option>
            <option value="B-">B−</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB−</option>
            <option value="O+">O+</option>
            <option value="O-">O−</option>
          </select>
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>City / Location</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group gender-group">
          <label>Gender</label>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                required
              />
              Female
            </label>
          </div>
        </div>

        <button type="submit" className="btn">Register</button>
      </form>
    </section>
  );
};

export default DonorRegister;