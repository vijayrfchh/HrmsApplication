import React, { useEffect, useState } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import {  IoPersonSharp,  IoLocationOutline,} from "react-icons/io5";
import { FaRegIdCard, FaBookReader } from "react-icons/fa";
import { PiSuitcaseSimpleFill, PiAirplaneTiltFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { TiGroup } from "react-icons/ti";
import axiosInstance from "./axiosConfig";
import { useParams } from 'react-router-dom';
 const Dashboard = () => {
  const { employeeId: paramEmployeeId } = useParams();
  const [employeeData, setEmployeeData] = useState(null);

  const employeeId = paramEmployeeId || localStorage.getItem('EmpId');

  // mockdetails incase if api stops working
  const mockData = {
    employeeProfileDetails: {
      firstname: "Mock",
      employeeId: "HRMS123",
      employeeDesignation: "Software Developer",
      dob: "1990-01-01",  
      phoneNumber: "1234567890",
      doj: "2020-01-01",
    },
    educationDetails: {
      degree: "B.Tech",
      institutionName: "XYZ University",
      yearOfPass: "2012",
    },
    currentExperienceDetails: {
      organisationName: "TechCorp",
      experience: "2",
      designation: "Senior Developer",
    },
    experienceDetails: {
      organisationName: "OldTech",
      experience: "3",
      designation: "Junior Developer",
    },
    familyDetails: {
      name: "Doe Family",
      relation: "Father",
    },
    locationDetails: { 
      hno: "123",
      street: "Main Street",
      village: "Sample Village",
      town: "Sample Town",
      district: "Sample District",
      state: "Sample State",
      country: "Sample Country",
      pincode: "123456",
    },
    nationalIDDetails: {
      nationalId: "Passport",
      nationalIDNum: "A1234567",
    },
    travelDetails: {
      passportNumber: "A1234567",
      issueDate: "2015-01-01",
      expireDate: "2025-01-01",
    },
  };

  // const id = "HRMS9";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`hrmsapplication/employee/getProfileDashboard/${employeeId}`);
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setEmployeeData(mockData); // Fallback to mock data in case of error
      }
    };

    fetchData();
  }, [employeeId]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userId = sessionStorage.getItem('EmpId'); ;
  
  //       if (userId) {
  //         const response = await axiosInstance.get(`/hrmsapplication/employee/getProfileDashboard/${userId}`);
  //         setEmployeeData(response.data);
  //         console.log(`${userId}`)
  //       } else {
  //         console.error("UserId not found in sessionStorage/localStorage.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setEmployeeData(mockData); // Fallback to mock data in case of error
  //     }
  //   };
    
  //   fetchData();
  // }, []);
  
  if (!employeeData) {
    return (
      <div className={`flex items-center justify-center h-screen `}>
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-current mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <h2 className="mt-4 text-xl text-gray-700">
            Loading... Please wait while we fetch your data.
          </h2>
        </div>
      </div>
    );
  }

  const {
    employeeProfileDetails,
    educationDetails,
    currentExperienceDetails,
    experienceDetails,
    familyDetails,
    locationDetails,
    nationalIDDetails,
    travelDetails,
  } = employeeData;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Home Header */}
      <div className="mt-2 flex p-1 bg-gray-200 shadow-md max-w-7xl mx-auto border border-black rounded-md">
        <AiTwotoneHome size={20} className="mt-1 mr-2" />
        <h1 className="text-xl font-bold">Home</h1>
      </div>

      {/* Profile Section */}
      <div className="mt-4 p-3 bg-white shadow-lg max-w-6xl mx-auto border border-black rounded-md">
        <div className="flex items-center border space-x-4">
          <img
            src="/rfchh.jpg"
            alt="Profile"
            className="w-16 h-16 border border-black rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {employeeProfileDetails?.prefix} {employeeProfileDetails?.firstname} (
              {employeeProfileDetails?.employeeId})
            </h2>
            <h2 className="text-sm text-gray-600">Designation</h2>
            <p>{employeeProfileDetails?.employeeDesignation}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-4 p-4 bg-gray-200 shadow-lg rounded-md max-w-7xl border border-black mx-auto border-t-2">
        <div className="mt-4 p-3 bg-white shadow-md flex border border-black text-sm flex-nowrap space-x-4 mb-6 max-w-7xl mx-auto rounded-md overflow-x-auto">
          {[
            { name: "Profile", route:`/personalDetails/${employeeId}` },
            { name: "National-ID", route: "/National" },
            { name: "Education-Details", route: "/educationDetails" },
            { name: "Address-Details", route: "/location" },
            { name: "Travel-Details", route: "/Travel" },
            { name: "Experience-Details", route: "/experience" },
            { name: "Family-Details", route: "/familyDetails" },
            { name: "Current-Experience-Details", route: "/current" },
          ].map((tab, index) => (
            <Link to={tab.route} key={index}>
              <button className="px-3 py-1 ml-3 border-2 border-transparent hover:border-yellow-700 rounded-md">
                {tab.name}
              </button>
            </Link>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 max-w-7xl mx-auto">
          {/* Personal Section */}
          <Link to={`/personalDetails/${employeeId}`}>
            <div className="bg-white p-4 shadow-md rounded-md border border-black">
              <div className="flex items-center mb-2 bg-gray-300 rounded-md">
                <IoPersonSharp size={28} className="mr-2 pl-2" />
                <h3 className="font-semibold text-base">Profile</h3>
              </div>
              <p><strong>Name:</strong> {employeeProfileDetails?.prefix} {employeeProfileDetails?.firstname}</p>
              <p><strong>Date of Birth:</strong> {employeeProfileDetails?.dob}</p>
              <p><strong>Phone Number:</strong> {employeeProfileDetails?.phoneNumber}</p>
              <p><strong>Date of Joining:</strong> {employeeProfileDetails?.doj}</p>
            </div>
          </Link>

          {/* National ID Section */}
          {nationalIDDetails ? (
            <Link to="/National">
              <div className="bg-white p-4 shadow-md rounded-md border border-black">
                <div className="flex items-center mb-2 bg-gray-300 rounded-md">
                  <FaRegIdCard size={28} className="mr-2 pl-2" />
                  <h3 className="font-semibold">National ID</h3>
                </div>
                <p><strong>ID Type:</strong> {nationalIDDetails.nationalId}</p>
                <p><strong>ID Number:</strong> {nationalIDDetails.nationalIDNum}</p>
              </div>
            </Link>
          ) : (
            <div className="bg-white p-4 shadow-md rounded-md border border-black">
              <div className="flex items-center mb-2 bg-gray-300 rounded-md">
                <FaRegIdCard size={28} className="mr-2 pl-2" />
                <h3 className="font-semibold">National ID</h3>
              </div>
              <p className="text-gray-500">No National ID details available.</p>
            </div>
          )}

          {/* Education Details Section */}
          {educationDetails ? (
            <Link to="/educationDetails">
              <div className="bg-white p-4 shadow-md rounded-md border border-black">
                <div className="flex items-center bg-gray-300 mb-2 rounded-md">
                  <FaBookReader size={25} className="pl-2 mr-1" />
                  <h3 className="font-semibold">Education Details</h3>
                </div>
                <p><strong>Degree:</strong> {educationDetails.degree}</p>
                <p><strong>Institute:</strong> {educationDetails.institutionName}</p>
                <p><strong>Year of Passing:</strong> {educationDetails.yearOfPass}</p>
              </div>
            </Link>
          ) : (
            <div className="bg-white p-4 shadow-md rounded-md border border-black">
              <div className="flex items-center bg-gray-300 mb-2 rounded-md">
                <FaBookReader size={25} className="pl-2 mr-1" />
                <h3 className="font-semibold">Education Details</h3>
              </div>
              <p className="text-gray-500">No Education details available.</p>
            </div>
          )}

          {/* Location Section */}
          {locationDetails ? (
            <Link to="/location">
              <div className="bg-white p-4 shadow-md rounded-md border border-black">
                <div className="flex items-center bg-gray-300 mb-2 rounded-md">
                  <IoLocationOutline size={28} className="pl-2 mr-1" />
                  <h3 className="font-semibold">Address Details</h3>
                </div>
                <p>
                  <strong>Address:</strong>{" "}
                  {`${locationDetails.hno}, ${locationDetails.street}, ${locationDetails.village}, ${locationDetails.town}, ${locationDetails.district}, ${locationDetails.state}, ${locationDetails.country} - ${locationDetails.pincode}`}
                </p>
              </div>
            </Link>
          ) : (
            <div className="bg-white p-4 shadow-md rounded-md border border-black">
              <div className="flex items-center bg-gray-300 mb-2 rounded-md">
                <IoLocationOutline size={28} className="pl-2 mr-1" />
                <h3 className="font-semibold">Address Details</h3>
              </div>
              <p className="text-gray-500">No Address details available.</p>
            </div>
          )}

          {/* Travel Details Section */}
          {travelDetails ? (
            <Link to="/Travel">
              <div className="bg-white p-4 shadow-md rounded-md border border-black">
                <div className="flex items-center bg-gray-300 mb-2 rounded-md">
                  <PiAirplaneTiltFill size={28} className="pl-2 mr-1" />
                  <h3 className="font-semibold">Travel Details</h3>
                </div>
                <p><strong>Passport:</strong> {travelDetails.passportNumber}</p>
                <p><strong>Issue Date:</strong> {travelDetails.issueDate}</p>
                <p><strong>Expire Date:</strong> {travelDetails.expireDate}</p>
              </div>
            </Link>
          ) : (
            <div className="bg-white p-4 shadow-md rounded-md border border-black">
              <div className="flex items-center bg-gray-300 mb-2 rounded-md">
                <PiAirplaneTiltFill size={28} className="pl-2 mr-1" />
                <h3 className="font-semibold">Travel Details</h3>
              </div>
              <p className="text-gray-500">No Travel details available.</p>
            </div>
          )}

          {/* Experience Details Section */}
          {experienceDetails ? (
            <Link to="/experience">
              <div className="bg-white p-4 shadow-md rounded-md border border-black">
                <div className="flex items-center bg-gray-300 mb-2 rounded-md">
                  <PiSuitcaseSimpleFill size={28} className="pl-2 mr-1" />
                  <h3 className="font-semibold">Experience Details</h3>
                </div>
                <p><strong>Organization:</strong> {experienceDetails.organisationName}</p>
                <p><strong>Experience:</strong> {experienceDetails.experience} Years</p>
                <p><strong>Designation:</strong> {experienceDetails.designation}</p>
              </div>
            </Link>
          ) : (
            <div className="bg-white p-4 shadow-md rounded-md border border-black">
              <div className="flex items-center bg-gray-300 mb-2 rounded-md">
                <PiSuitcaseSimpleFill size={28} className="pl-2 mr-1" />
                <h3 className="font-semibold">Experience Details</h3>
              </div>
              <p className="text-gray-500">No Experience details available.</p>
            </div>
          )}

          {/* Family Details Section */}
          {familyDetails ? (
            <Link to={`/familyDetails`}>
              <div className="bg-white p-4 shadow-md rounded-md border border-black">
                <div className="flex items-center bg-gray-300 mb-2 rounded-md">
                  <TiGroup size={28} className="pl-2 mr-1" />
                  <h3 className="font-semibold">Family Details</h3>
                </div>
                <p><strong>Name:</strong> {familyDetails.name}</p>
                <p><strong>Relationship:</strong> {familyDetails.relation}</p>
                {/* Assuming Marital Status is part of familyDetails or can be derived */}
                <p><strong>Marital Status:</strong> Unmarried</p>
              </div>
            </Link>
          ) : (
            <div className="bg-white p-4 shadow-md rounded-md border border-black">
              <div className="flex items-center bg-gray-300 mb-2 rounded-md">
                <TiGroup size={28} className="pl-2 mr-1" />
                <h3 className="font-semibold">Family Details</h3>
              </div>
              <p className="text-gray-500">No Family details available.</p>
            </div>
          )}

          {/* Current Experience Details Section */}
          {currentExperienceDetails ? (
            <Link to="/current">
              <div className="bg-white p-4 shadow-md rounded-md border border-black">
                <div className="flex items-center bg-gray-300 mb-2 rounded-md">
                  <PiSuitcaseSimpleFill size={28} className="pl-2 mr-1" />
                  <h3 className="font-semibold">Current Experience</h3>
                </div>
                <p><strong>Organization:</strong> {currentExperienceDetails.organisationName}</p>
                <p><strong>Experience:</strong> {currentExperienceDetails.experience} Years</p>
                <p><strong>Designation:</strong> {currentExperienceDetails.designation}</p>
              </div>
            </Link>
          ) : (
            <div className="bg-white p-4 shadow-md rounded-md border border-black">
              <div className="flex items-center bg-gray-300 mb-2 rounded-md">
                <PiSuitcaseSimpleFill size={28} className="pl-2 mr-1" />
                <h3 className="font-semibold">Current Experience</h3>
              </div>
              <p className="text-gray-500">No Current Experience details available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
