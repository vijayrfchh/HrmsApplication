import React, { useState, useEffect } from "react";
import { FaEdit, FaLessThan } from "react-icons/fa";
import { Link } from "react-router-dom";
// import axios from 'axios';
import axiosInstance from "./axiosConfig";
import EditFamilyDetails from "./EditPersonalDetails";
import { useParams } from "react-router-dom"; 
const PersonalInfo = () => {
  const { employeeId } = useParams(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    prefix: "",
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    maritialStatus: "",
    dob: "",
    gender: "",
    fatherName: "",
    doj: "",
    bloodGroup: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`hrmsapplication/employee/getEmployeeProfile/${employeeId}`);
        const data = response.data;

        setPersonalDetails({
          prefix: data.prefix || "",
          firstname: data.firstname || "",
          middlename: data.middlename || "",
          lastname: data.lastname || "",
          email: data.email || "",
          countryCode: data.countryCode || "",
          phoneNumber: data.phoneNumber || 0,
          maritialStatus: data.maritialStatus || "",
          dob: data.dob || "",
          gender: data.gender || "",
          fatherName: data.fatherName || "",
          doj: data.doj || "",
          bloodGroup: data.bloodGroup || "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [employeeId]); // Empty dependency array to run once on component mount

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (updatedDetails) => {
    try {
      // Include employeeId in the request body
      const dataToUpdate = {
        employeeId, // Pass the employeeId here
        ...updatedDetails, // Spread the updated details
      };

      const response = await axiosInstance.patch("hrmsapplication/employee/update", dataToUpdate);
      
      // Optionally, you can handle the response after the update
      console.log("Update successful:", response.data);
      
      // Close the modal and optionally refetch the data
      setIsModalOpen(false);
      // You can refetch data here if needed
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div>
      <div>
        <Link to="/dashboard">
          <div className="flex items-center justify-start px-2 py-2 overflow-x-auto border-2 border-gray-800 rounded-md w-40 ml-5 mb-5 mt-5">
            <FaLessThan className="text-orange-500 mr-2" />
            <button>
              <span className="text font-semibold text-orange-500">
                Previous Page
              </span>
            </button>
          </div>
        </Link>
      </div>
      <div className="flex justify-center items-start p-5 mt-16">
        <div className="w-2/3 mt-5 bg-white shadow-lg rounded-lg relative">
          <div className="bg-orange-500 text-white p-6 rounded-t-lg"></div>
          <div className="p-8 border border-gray-300 rounded-b-lg relative">
            <div className="absolute top-9 right-9 flex space-x-2">
              <button
                className="text-black-500 hover:text-orange-700"
                onClick={handleEditClick}
              >
                <FaEdit size={20} />
              </button>
            </div>
            <div className="bg-gray-100 p-5 rounded-md border border-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="font-bold">Prefix</p>
                  <p>{personalDetails.prefix}</p>
                </div>
                <div>
                  <p className="font-bold">First Name</p>
                  <p>{personalDetails.firstname}</p>
                </div>
                <div>
                  <p className="font-bold">Last Name</p>
                  <p>{personalDetails.lastname}</p>
                </div>
                <div>
                  <p className="font-bold">Middle Name</p>
                  <p>{personalDetails.middlename}</p>
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p>{personalDetails.email}</p>
                </div>
                <div>
                  <p className="font-bold">Phone Number</p>
                  <p>
                    {personalDetails.countryCode} {personalDetails.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className="font-bold">Maritial Status</p>
                  <p>{personalDetails.maritialStatus}</p>
                </div>
                <div>
                  <p className="font-bold">Date of Birth</p>
                  <p>{personalDetails.dob}</p>
                </div>
                <div>
                  <p className="font-bold">Gender</p>
                  <p>{personalDetails.gender}</p>
                </div>
                <div>
                  <p className="font-bold">Date of Joining</p>
                  <p>{personalDetails.doj}</p>
                </div>
                <div>
                  <p className="font-bold">Father's Name</p>
                  <p>{personalDetails.fatherName}</p>
                </div>
                <div>
                  <p className="font-bold">Blood Group</p>
                  <p>{personalDetails.bloodGroup}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <EditFamilyDetails
            member={personalDetails}
            onSave={handleSave}
            onCancel={handleModalClose}
          />
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
