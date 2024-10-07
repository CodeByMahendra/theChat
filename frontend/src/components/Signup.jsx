import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3005/api/v1/user/register";
      console.log('Sending request to:', url);
      console.log('Request data:', user);

      const res = await axios.post(url, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      // Improved error handling
      const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      console.log('Error details:', error);
    }

    // Reset form
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
}

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-md p-6 bg-white bg-opacity-90 rounded-lg shadow-xl" style={{ maxHeight: '550px' }}>
        <div className="p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
          <h1 className="text-3xl font-extrabold text-center text-black bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">Signup</h1>

          <form onSubmit={onSubmitHandler} className="mt-6">
            {/* Full Name */}
            <div className="mb-2">
              <label className="block text-gray-700 text-md font-bold mb-2">Full Name</label>
              <input
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                className="w-full h-8 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-300 ease-in-out bg-white text-gray-700"
                type="text"
                placeholder="Enter your full name"
              />
            </div>

            {/* Username */}
            <div className="mb-2">
              <label className="block text-gray-700 text-md font-bold mb-2">Username</label>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full h-8 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-300 ease-in-out bg-white text-gray-700"
                type="text"
                placeholder="Enter your username"
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="block text-gray-700 text-md font-bold mb-2">Password</label>
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full h-8 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-300 ease-in-out bg-white text-gray-700"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-2">
              <label className="block text-gray-700 text-md font-bold mb-2">Confirm Password</label>
              <input
                value={user.confirmPassword}
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                className="w-full h-8 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-300 ease-in-out bg-white text-gray-700"
                type="password"
                placeholder="Confirm your password"
              />
            </div>

            {/* Gender Selection */}
            <div className="flex items-center mb-5">
              <div className="flex items-center mr-4">
                <p className='text-black'>Male</p>
                <input
                  type="checkbox"
                  checked={user.gender === "male"}
                  onChange={() => handleCheckbox("male")}
                  className="checkbox border-black mx-2 focus:ring-pink-500"
                />
              </div>
              <div className="flex items-center">
                <p className='text-black'>Female</p>
                <input
                  type="checkbox"
                  checked={user.gender === "female"}
                  onChange={() => handleCheckbox("female")}
                  className="checkbox border-black mx-2 focus:ring-pink-500"
                />
              </div>
            </div>

            {/* Already have an account */}
            <p className="text-center mb-5 text-black">Already have an account? <Link to="/" className="text-yellow-300 underline">Login</Link></p>

            {/* Signup Button */}
            <div>
              <button
                type="submit"
                className="w-full h-8 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
