
import React, { useState, useEffect } from "react"; 
import { FaEdit } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa";
import { Link } from "react-router-dom";
import EditFamilyDetails from "../EditPersonalDetails";

const PersonalInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    prefix: "",
    firstname: "",
    middlename: "",
    lastname: "",
    email:"",
    countryCode: "",
    phoneNumber: "",
    maritialStatus: "",
    dob: "",
    gender: "",
    fatherName: "",
    doj: "",
    bloodGroup: "",
  });
  const [employeeId, setEmployeeId] = useState(null); // Store employeeId
  const [isDataFetched, setIsDataFetched] = useState(false); // Track if data was fetched

  useEffect(() => {
    // Fetch data logic here
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (updatedDetails) => {
    try {
      const formattedDetails = {
        ...updatedDetails,
        dob: updatedDetails.dob,
        doj: updatedDetails.doj,
        maritialStatus: updatedDetails.maritialStatus,
        countryCode: updatedDetails.countryCode,
        phoneNumber: updatedDetails.phoneNumber,
        placeOfBirth: updatedDetails.placeOfBirth,
      };

      setPersonalDetails(formattedDetails);
      setIsModalOpen(false);
      const patchDetails = {
        ...formattedDetails,
        employeeId: employeeId, // Include the employeeId
      };

      // Save logic here (POST or PATCH requests)
    } catch (error) {
      console.error("Error during save operation:", error.message);
    }
  };

  return (
    <div>
      <div>
        <Link to="/dashboard">
          <div className="flex items-center justify-start px-2 py-2 overflow-x-auto border-2 border-gray-800 rounded-md w-40 ml-5 mb-5 mt-5">
            <FaLessThan className="text-orange-500 mr-2" />
            <button>
              <link to=""></link>
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
            onCancel={handleModalClose}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;