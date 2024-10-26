//  //these contains the bro with no integrations ...............

//  import React, { useState, useEffect } from "react"; 
// import { FaEdit } from "react-icons/fa";
// import { FaLessThan } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import EditFamilyDetails from "./EditPersonalDetails";

// const PersonalInfo = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [personalDetails, setPersonalDetails] = useState({
//     prefix: "",
//     firstname: "",
//     middlename: "",
//     lastname: "",
//     email:"",
//     countryCode: "",
//     phoneNumber: "",
//     maritialStatus: "",
//     dob: "",
//     gender: "",
//     fatherName: "",
//     doj: "",
//     bloodGroup: "",
//   });
//   const [employeeId, setEmployeeId] = useState(null); // Store employeeId
//   const [isDataFetched, setIsDataFetched] = useState(false); // Track if data was fetched

//   useEffect(() => {
//     // Fetch data logic here
//   }, []);

//   const handleEditClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleSave = async (updatedDetails) => {
//     try {
//       const formattedDetails = {
//         ...updatedDetails,
//         dob: updatedDetails.dob,
//         doj: updatedDetails.doj,
//         maritialStatus: updatedDetails.maritialStatus,
//         countryCode: updatedDetails.countryCode,
//         phoneNumber: updatedDetails.phoneNumber,
//         placeOfBirth: updatedDetails.placeOfBirth,
//       };

//       setPersonalDetails(formattedDetails);
//       setIsModalOpen(false);
//       const patchDetails = {
//         ...formattedDetails,
//         employeeId: employeeId, // Include the employeeId
//       };

//       // Save logic here (POST or PATCH requests)
//     } catch (error) {
//       console.error("Error during save operation:", error.message);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <Link to="/dashboard">
//           <div className="flex items-center justify-start px-2 py-2 overflow-x-auto border-2 border-gray-800 rounded-md w-40 ml-5 mb-5 mt-5">
//             <FaLessThan className="text-orange-500 mr-2" />
//             <button>
//               <link to=""></link>
//               <span className="text font-semibold text-orange-500">
//                 Previous Page
//               </span>
//             </button>
//           </div>
//         </Link>
//       </div>
//       <div className="flex justify-center items-start p-5 mt-16">
//         <div className="w-2/3 mt-5 bg-white shadow-lg rounded-lg relative">
//           <div className="bg-orange-500 text-white p-6 rounded-t-lg"></div>
//           <div className="p-8 border border-gray-300 rounded-b-lg relative">
//             <div className="absolute top-9 right-9 flex space-x-2">
//               <button
//                 className="text-black-500 hover:text-orange-700"
//                 onClick={handleEditClick}
//               >
//                 <FaEdit size={20} />
//               </button>
//             </div>
//             <div className="bg-gray-100 p-5 rounded-md border border-gray-300">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div>
//                   <p className="font-bold">Prefix</p>
//                   <p>{personalDetails.prefix}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">First Name</p>
//                   <p>{personalDetails.firstname}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Last Name</p>
//                   <p>{personalDetails.lastname}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Middle Name</p>
//                   <p>{personalDetails.middlename}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Email</p>
//                   <p>{personalDetails.email}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Phone Number</p>
//                   <p>
//                     {personalDetails.countryCode} {personalDetails.phoneNumber}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Maritial Status</p>
//                   <p>{personalDetails.maritialStatus}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Date of Birth</p>
//                   <p>{personalDetails.dob}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Gender</p>
//                   <p>{personalDetails.gender}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Date of Joining</p>
//                   <p>{personalDetails.doj}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Father's Name</p>
//                   <p>{personalDetails.fatherName}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Blood Group</p>
//                   <p>{personalDetails.bloodGroup}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {isModalOpen && (
//           <EditFamilyDetails
//             member={personalDetails}
//             onCancel={handleModalClose}
//             onSave={handleSave}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PersonalInfo;

 
//  ----------------------------------------------------------------------------
 
  

  //these contains the code where uses the localstorage to save  the data...

// import React, { useState, useEffect } from "react";
// import { FaEdit } from "react-icons/fa";
// import { FaLessThan } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import EditFamilyDetails from "./EditPersonalDetails";
// // import Navbar from "./PersonalNavbar";

// const PersonalInfo = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isNewEmployee, setIsNewEmployee] = useState(true);
//   const [employeeId, setEmployeeId] = useState(
//     localStorage.getItem("employeeId") || "" // Retrieve employeeId from localStorage
//   );
//   const [personalDetails, setPersonalDetails] = useState(
//     JSON.parse(localStorage.getItem("personalDetails")) || {
//       prefix: "",
//       firstname: "",
//       middlename: "",
//       lastname: "",
//       email:"",
//       countryCode: "",
//       phoneNumber: "",
//       maritialStatus: "",
//       dob: "",
//       gender: "",
//       fatherName: "",
//       doj: "",
//       bloodGroup: "",
//     }
//   );

//   useEffect(() => {
//     const fetchData = async () => {
      
//       try {
        
//         if (employeeId) {
//           console.log("Employee ID before GET request:", employeeId);//rmoved to check
//           const response = await axios.get(
//             `http://192.168.0.119:8080/hrmsapplication/employee/getEmployeeProfile/${employeeId}`//removed to check
//             // `http://192.168.0.119:8080/hrmsapplication/employee/getEmployeeProfile/HRMS1`
//           );
//           const data = response.data;

//           if (!data || Object.keys(data).length === 0) {
//             // No data returned from API, clear localStorage
//             localStorage.removeItem("employeeId");
//             localStorage.removeItem("personalDetails");
//             setPersonalDetails({
//               // Reset to initial state
//               prefix: "",
//               firstname: "",
//               middlename: "",
//               lastname: "",
//               "email":"",
//               countryCode: "",
//               phoneNumber: "",
//               maritialStatus: "",
//               dob: "",
//               gender: "",
//               fatherName: "",
//               doj: "",
//               bloodGroup: "",
//               placeOfBirth:"",
//             });
//             setIsNewEmployee(true); // Consider as a new employee
//             return; // Exit early since there's no data
//           }

//           console.log("API response", data);
//           const fetchedDetails = {
//             prefix: data.prefix || "",
//             firstname: data.firstname,
//             lastname: data.lastname,
//             middlename: data.middlename || "",
//             email:data.email,
//             countryCode:data.countryCode,
//             phoneNumber: data.phoneNumber,
//             maritialStatus: data.maritialStatus,
//             dob: data.dob,
//             gender: data.gender,
//             fatherName: data.fatherName,
//             doj: data.doj,
//             bloodGroup: data.bloodGroup,
//           };

//           // Update state and store in localStorage
//           setPersonalDetails(fetchedDetails);
//           localStorage.setItem(
//             "personalDetails",
//             JSON.stringify(fetchedDetails)
//           );
//           setIsNewEmployee(false);
//         } 
//       } catch (error) {
//         console.error(
//           "Error fetching data:",
//           error.response?.data || error.message
//         );
//       }
//     };

//     fetchData();
//   }, [employeeId]);

//   const handleEditClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleSave = async (updatedDetails) => {
//     try {
//       // Log data before sending
//       console.log("Updated Details (before formatting):", updatedDetails);

//       const formattedDetails = {
//         ...updatedDetails,
//         // dob: updatedDetails.dob,
//         // doj: updatedDetails.doj,
//         // maritialStatus: updatedDetails.maritialStatus,
//         countryCode: updatedDetails.countryCode,
//         phoneNumber: updatedDetails.phoneNumber,
        
//       };

//       console.log("Formatted Details (for POST):", formattedDetails);
//       setPersonalDetails(formattedDetails);
//       localStorage.setItem("personalDetails", JSON.stringify(formattedDetails)); // Update localStorage
//       setIsModalOpen(false);
//       if (isNewEmployee) {
//         // POST request for new employee
//         const response = await axios.post(
//           "http://192.168.0.119:8080/hrmsapplication/employee/create",
//           formattedDetails,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log("POST Response:", response.data);
//         const newEmployeeId = response.data.employeeId;
//         setEmployeeId(newEmployeeId);
//         localStorage.setItem("employeeId", newEmployeeId); // Save new employeeId to localStorage

//         //After POST, trigger GET to fetch newly created employee profile
//         await axios.get(
//           `http://192.168.0.119:8080/hrmsapplication/employee/getEmployeeProfile/${newEmployeeId}`
//         );
//         setIsNewEmployee(false);
//         // setIsNewEmployee(false); // Now switch to patch mode
//         // await fetchData(); // Re-fetch to get complete employee profile
//       } else {
//         // PATCH request for existing employee
//         const patchDetails = {
//           ...formattedDetails,
//           employeeId: employeeId, // Include the employeeId in the PATCH request
//         };
//         console.log("Employee ID before PATCH request:", employeeId);
//         const response = await axios.patch(
//           `http://192.168.0.119:8080/hrmsapplication/employee/update`,
//           patchDetails,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log("PATCH Response:", response.data);
//       }
//       // Close the modal and update the personal details state
//       setPersonalDetails(formattedDetails);
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error(
//         "Error during POST/PATCH request:",
//         error.response?.data || error.message
//       );
//     }
//   };
//   return (
//     <div>
//       {/* <Navbar
//         title="Personal Details"
//         employeeProfileDetails={employeeProfileDetails}
//         bgColor="bg-orange-100" // Change background color for this page
//       /> */}
//       {/* <Navbar /> */}
//       {/* <Navbar employeeProfileDetails={employeeProfileDetails} /> */}
//       <div>
//         <Link to="/">
//           <div className="flex items-center justify-start px-2 py-2 overflow-x-auto border-2 border-gray-800 rounded-md w-40 ml-5 mb-5 mt-5">
//             <FaLessThan className="text-orange-500 mr-2" />
//             <button>
//               <link to=""></link>
//               <span className="text font-semibold text-orange-500">
//                 Previous Page
//               </span>
//             </button>
//           </div>
//         </Link>
//       </div>
//       <div className="flex  justify-center  items-start p-5 mt-16 ">
//         <div className="w-2/3 mt-5 bg-white shadow-lg rounded-lg relative">
//           <div className="bg-orange-500 text-white p-6 rounded-t-lg">
//             {/* <h1 className="text-base sm:text-lg font-bold">
//               {personalDetails.firstname} {personalDetails.lastname}
//             </h1> */}
//           </div>
//           <div className="p-8 border border-gray-300 rounded-b-lg relative">
//             {/* <div className="absolute top-9 right-8 flex space-x-2"> */}
//             <div className="absolute top-9   right-9 flex space-x-2">
//               <button
//                 className="text-black-500 hover:text-orange-700"
//                 onClick={handleEditClick}
//               >
//                 <FaEdit size={20} />
//               </button>
//             </div>
//             <div className="bg-gray-100 p-5 rounded-md border border-gray-300">
//               {/* <div className="grid grid-cols-4 gap-4"> */}
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div>
//                   <p className="font-bold">Prefix</p>
//                   <p>{personalDetails.prefix}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">First Name</p>
//                   <p>{personalDetails.firstname}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Last Name</p>
//                   <p>{personalDetails.lastname}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Middle Name</p>
//                   <p>{personalDetails.middlename}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Email</p>
//                   <p>{personalDetails.email}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Phone Number</p>
//                   <p>
//                     {personalDetails.countryCode} {personalDetails.phoneNumber}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Maritial Status</p>
//                   <p>{personalDetails.maritialStatus}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Date of Birth</p>
//                   <p>{personalDetails.dob}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Gender</p>
//                   <p>{personalDetails.gender}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Date of Joining</p>
//                   <p>{personalDetails.doj}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Father's Name</p>
//                   <p>{personalDetails.fatherName}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Blood Group</p>
//                   <p>{personalDetails.bloodGroup}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {isModalOpen && (
//           <EditFamilyDetails
//             member={personalDetails}
//             onSave={handleSave}
//             onCancel={handleModalClose}
//           />
//         )}
//       </div>
//     </div>
//   );
// };
// export default PersonalInfo;
// ---------------------------------------------------------------------------------------------- pattern2
//these contains the code tha will not get refreshed but when user moves back to different path and come back again the data will get lost

// PersonalInfo.js
// import React, { useState, useEffect } from "react";
// import { FaEdit, FaLessThan } from "react-icons/fa";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import EditFamilyDetails from "./EditPersonalDetails";
// // import axios from "axios"; 
// import axiosInstance from "./axiosConfig";
// const PersonalInfo = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { id: routeEmployeeId } = useParams(); //  to Get employeeId from URL
//   const navigate = useNavigate(); 
//   const [personalDetails, setPersonalDetails] = useState({
//     prefix: "",
//     firstname: "",
//     middlename: "",
//     lastname: "",
//     email: "",
//     countryCode: "",
//     phoneNumber: "",
//     maritialStatus: "", 
//     dob: "",
//     gender: "",
//     fatherName: "",
//     doj: "",
//     bloodGroup: "",
//   });
// console.log(routeEmployeeId);

//   // Effect to fetch employee data if employeeId is present in URL
//   useEffect(() => {
//     if (routeEmployeeId) {
//       // Fetch employee data via GET api
//       const fetchEmployeeProfile = async () => {
//         try {
//           const response = await axiosInstance.get(
//             `http://192.168.0.245:8080/hrmsapplication/employee/getEmployeeProfile/${routeEmployeeId}`, // GET API URL with dynamic ID
//             {
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             }
//           );

//           if (response.status === 200) {
//             console.log("Data fetched successfully:", response.data);
//             setPersonalDetails(response.data);
//           } else {
//             console.error("Failed to fetch employee profile:", response);
//             alert("Failed to fetch employee profile.");
//           }
//         } catch (error) {
//           console.error("Error fetching employee profile:", error);
//           alert("An error occurred while fetching employee profile.");
//         }
//       };

//       fetchEmployeeProfile();
//     }
//   }, [routeEmployeeId]);

//   const handleEditClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleSave = (updatedDetails) => {
//     // Update the local state with the updated details
//     setPersonalDetails({
//       ...personalDetails,
//       ...updatedDetails,
//     });
//     setIsModalOpen(false);
//     console.log("Personal details updated successfully:", updatedDetails);
//   };

//   // Function to handle form submission and POST data to the server
//   const handleSubmit = async () => {
//     try {
//       // 1. POST the personalDetails to create a new employee
//       const postResponse = await  axiosInstance.post(
//         "http://192.168.0.119:8080/hrmsapplication/employee/create", // POST API URL
//         personalDetails, // Send the personalDetails object
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
      
//       if (postResponse.status === 200 || postResponse.status === 201) {
//         console.log("Data posted successfully:", postResponse.data);
//         alert("Employee data has been saved successfully!");

//         // Assume the response contains the employee ID
//         const newEmployeeId = postResponse.data.id || postResponse.data.employeeId;
//         if (!newEmployeeId) {
//           throw new Error("Employee ID not found in the response.");
//         }

//         // Navigate to the employee profile page with the new ID
//         navigate(`/personalDetails/${newEmployeeId}`);
//       } else {
//         console.error("Failed to post data:", postResponse);
//         alert("Failed to save employee data.");
//       }
//     } catch (error) {
//       console.error("Error during submission:", error);
//       alert("An error occurred while saving employee data.");
//     }
//   };

//   return (
//     <div>
//       <div>
//         <Link to="/dashboard">
//           <div className="flex items-center justify-start px-2 py-2 overflow-x-auto border-2 border-gray-800 rounded-md w-40 ml-5 mb-5 mt-5">
//             <FaLessThan className="text-orange-500 mr-2" />
//             <button>
//               <span className="text font-semibold text-orange-500">
//                 Previous Page
//               </span>
//             </button>
//           </div>
//         </Link>
//       </div>
//       <div className="flex justify-center items-start p-5 mt-16">
//         <div className="w-2/3 mt-5 bg-white shadow-lg rounded-lg relative">
//           <div className="bg-orange-500 text-white p-6 rounded-t-lg"></div>
//           <div className="p-8 border border-gray-300 rounded-b-lg relative">
//             <div className="absolute top-9 right-9 flex space-x-2">
//               <button
//                 className="text-black-500 hover:text-orange-700"
//                 onClick={handleEditClick}
//               >
//                 <FaEdit size={20} />
//               </button>
//             </div>
//             <div className="bg-gray-100 p-5 rounded-md border border-gray-300">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div>
//                   <p className="font-bold">Prefix</p>
//                   <p>{personalDetails.prefix}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">First Name</p>
//                   <p>{personalDetails.firstname}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Last Name</p>
//                   <p>{personalDetails.lastname}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Middle Name</p>
//                   <p>{personalDetails.middlename}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Email</p>
//                   <p>{personalDetails.email}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Phone Number</p>
//                   <p>
//                     {personalDetails.countryCode} {personalDetails.phoneNumber}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Marital Status</p>
//                   <p>{personalDetails.maritialStatus}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Date of Birth</p>
//                   <p>{personalDetails.dob}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Gender</p>
//                   <p>{personalDetails.gender}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Date of Joining</p>
//                   <p>{personalDetails.doj}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Father's Name</p>
//                   <p>{personalDetails.fatherName}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Blood Group</p>
//                   <p>{personalDetails.bloodGroup}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-5">
//               {/* Only show the Save button if there's no employeeId in the URL */}
//               {!routeEmployeeId && (
//                 <button
//                   className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
//                   onClick={handleSubmit}
//                 >
//                   Save Employee Data
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//         {isModalOpen && (
//           <EditFamilyDetails
//             member={personalDetails}
//             onCancel={handleModalClose}
//             onSave={handleSave}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PersonalInfo;





// import React, { useState, useEffect } from "react";
// import { FaEdit, FaLessThan } from "react-icons/fa";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import EditFamilyDetails from "./EditPersonalDetails";
// import axios from "axios"; // Import axios for API requests
// import { axiosInstance } from '.components/axiosConfig';
// import { axiosInstance } from '.components/axiosConfig';
// import { useParams } from 'react-router-dom';

// const PersonalInfo = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { id: routeEmployeeId } = useParams(); // Get employeeId from URL
//   const navigate = useNavigate(); // For navigation

//   const [personalDetails, setPersonalDetails] = useState({
//     prefix: "",
//     firstname: "",
//     middlename: "",
//     lastname: "",
//     email: "",
//     countryCode: "",
//     phoneNumber: "",
//     maritialStatus: "",
//     dob: "",
//     gender: "",
//     fatherName: "",
//     doj: "",
//     bloodGroup: "",
//   });
// console.log(routeEmployeeId);

//   // Effect to fetch employee data if employeeId is present in URL
//   useEffect(() => {
//     if (routeEmployeeId) {
//       // Fetch employee data via GET api
//       const fetchEmployeeProfile = async () => {
//         try {
//           const response = await axios.get(
//             `http://192.168.0.119:8080/hrmsapplication/employee/getEmployeeProfile/${routeEmployeeId}`, // GET API URL with dynamic ID
//             {
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             }
//           );

//           if (response.status === 200) {
//             console.log("Data fetched successfully:", response.data);
//             setPersonalDetails(response.data);
//           } else {
//             console.error("Failed to fetch employee profile:", response);
//             alert("Failed to fetch employee profile.");
//           }
//         } catch (error) {
//           console.error("Error fetching employee profile:", error);
//           alert("An error occurred while fetching employee profile.");
//         }
//       };

//       fetchEmployeeProfile();
//     }
//   }, [routeEmployeeId]);

//   const handleEditClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleSave = (updatedDetails) => {
//     // Update the local state with the updated details
//     setPersonalDetails({
//       ...personalDetails,
//       ...updatedDetails,
//     });
//     setIsModalOpen(false);
//     console.log("Personal details updated successfully:", updatedDetails);
//   };

//   // Function to handle form submission and POST data to the server
//   const handleSubmit = async () => {
//     try {
//       // 1. POST the personalDetails to create a new employee
//       const postResponse = await axios.post(
//         "http://192.168.0.119:8080/hrmsapplication/employee/create", // POST API URL
//         personalDetails, // Send the personalDetails object
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
      
//       if (postResponse.status === 200 || postResponse.status === 201) {
//         console.log("Data posted successfully:", postResponse.data);
//         alert("Employee data has been saved successfully!");

//         // Assume the response contains the employee ID
//         const newEmployeeId = postResponse.data.id || postResponse.data.employeeId;
//         if (!newEmployeeId) {
//           throw new Error("Employee ID not found in the response.");
//         }

//         // Navigate to the employee profile page with the new ID
//         navigate(`/personalDetails/${newEmployeeId}`);
//       } else {
//         console.error("Failed to post data:", postResponse);
//         alert("Failed to save employee data.");
//       }
//     } catch (error) {
//       console.error("Error during submission:", error);
//       alert("An error occurred while saving employee data.");
//     }
//   };

//   return (
//     <div>
//       <div>
//         <Link to="/">
//           <div className="flex items-center justify-start px-2 py-2 overflow-x-auto border-2 border-gray-800 rounded-md w-40 ml-5 mb-5 mt-5">
//             <FaLessThan className="text-orange-500 mr-2" />
//             <button>
//               <span className="text font-semibold text-orange-500">
//                 Previous Page
//               </span>
//             </button>
//           </div>
//         </Link>
//       </div>
//       <div className="flex justify-center items-start p-5 mt-16">
//         <div className="w-2/3 mt-5 bg-white shadow-lg rounded-lg relative">
//           <div className="bg-orange-500 text-white p-6 rounded-t-lg"></div>
//           <div className="p-8 border border-gray-300 rounded-b-lg relative">
//             <div className="absolute top-9 right-9 flex space-x-2">
//               <button
//                 className="text-black-500 hover:text-orange-700"
//                 onClick={handleEditClick}
//               >
//                 <FaEdit size={20} />
//               </button>
//             </div>
//             <div className="bg-gray-100 p-5 rounded-md border border-gray-300">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div>
//                   <p className="font-bold">Prefix</p>
//                   <p>{personalDetails.prefix}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">First Name</p>
//                   <p>{personalDetails.firstname}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Last Name</p>
//                   <p>{personalDetails.lastname}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Middle Name</p>
//                   <p>{personalDetails.middlename}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Email</p>
//                   <p>{personalDetails.email}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Phone Number</p>
//                   <p>
//                     {personalDetails.countryCode} {personalDetails.phoneNumber}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Marital Status</p>
//                   <p>{personalDetails.maritialStatus}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Date of Birth</p>
//                   <p>{personalDetails.dob}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Gender</p>
//                   <p>{personalDetails.gender}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Date of Joining</p>
//                   <p>{personalDetails.doj}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Father's Name</p>
//                   <p>{personalDetails.fatherName}</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">Blood Group</p>
//                   <p>{personalDetails.bloodGroup}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-5">
//               {/* Only show the Save button if there's no employeeId in the URL */}
//               {!routeEmployeeId && (
//                 <button
//                   className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
//                   onClick={handleSubmit}
//                 >
//                   Save Employee Data
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//         {isModalOpen && (
//           <EditFamilyDetails
//             member={personalDetails}
//             onCancel={handleModalClose}
//             onSave={handleSave}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PersonalInfo;//code changed by glen