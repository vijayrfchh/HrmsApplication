// import React, { useState, useEffect } from "react";
// import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
// import axiosInstance from "./axiosConfig";
// import EditPersonalDetails from "./createEmply";
// import { useNavigate } from "react-router-dom";

// const EmployeeTable = () => {
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]); // State for filtered employees
//   const [searchQuery, setSearchQuery] = useState(""); // State for search input
//   const [pageNumber, setPageNumber] = useState(0);
//   const [pageSize, setPageSize] = useState(5);
  // const [showPopup, setShowPopup] = useState(false);
  // const [showEditForm, setShowEditForm] = useState(false);
  // const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  // const [userRole, setUserRole] = useState("");
// const navigate = useNavigate()
//   // Fetch employees when pageNumber or pageSize changes
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axiosInstance.get(
//           `/hrmsapplication/employee/getAll`,
//           {
//             params: {
//               pageNumber,
//               size: pageSize,
//             },
//           }
//         );
//         setEmployees(response.data); // Update state with response data
//         setFilteredEmployees(response.data); // Initially set filtered employees to all employees
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       }
//     };

//     fetchEmployees();
//   }, [pageNumber, pageSize]);

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     // Filter employees based on search input
//     const filtered = employees.filter(
//       (employee) =>
//         employee.employeeId.toLowerCase().includes(query) ||
//         employee.firstname.toLowerCase().includes(query) ||
//         employee.email.toLowerCase().includes(query)
//     );

//     setFilteredEmployees(filtered); // Update filteredEmployees with search results
//   };

  // const handleButtonClick = () => {
  //   setShowPopup(true);
  // };

  // const handleClosePopup = () => {
  //   setShowPopup(false);
  // };

  // const handleCancel = () => {
  //   setShowEditForm(false); // Close the form without saving
  // };

  // const handleSave = (formValues) => {
  //   console.log("Saved data:", formValues);
  //   setShowEditForm(false); // Close the form after saving
  // };

  // const handleCreateEmployeeClick = () => {
  //   setShowEditForm(true); // Show the EditPersonalDetails form when clicked
  // };

//   const handleNextPage = () => {
//     setPageNumber((prevPage) => prevPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (pageNumber > 0) {
//       setPageNumber((prevPage) => prevPage - 1);
//     }
//   };

  // const handleConfirmRoleUpdate = async () => {
  //   const requestBody = {
  //     employeeId: selectedEmployeeId,
  //     userRole,
  //   };

  //   try {
  //     const response = await axiosInstance.patch(
  //       "/hrmsapplication/authentication/updateAuthenticationRole",
  //       requestBody
  //     );
  //     console.log("Role updated successfully:", response.data);
  //     setShowPopup(false); // Close the popup on success
  //   } catch (error) {
  //     console.error("Error updating role:", error);
  //   }
  // };

//   return (
//     <div className="container mx-auto p-6">
//       {/* Navigation Bar */}
//       <nav className="flex items-center mb-4 p-2 border rounded-lg shadow-md w-30">
//         <div className="flex items-center space-x-1">
//           <AiOutlineHome className="text-xl" />
//           <span className="text-lg font-bold">Home</span>
//         </div>
//       </nav>

//       {/* Action Buttons and Search Bar */}
//       <div className="flex justify-center items-center mb-4 space-x-4">
//         <div className="flex items-right border rounded-lg">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="py-2 px-3 focus:outline-none rounded-l-lg"
//             value={searchQuery} // Bind searchQuery state to input
//             onChange={handleSearchChange} // Trigger search on input change
//           />
//           <button className="bg-gray-200 text-gray-500 px-3 rounded-r-lg">
//             <AiOutlineSearch />
//           </button>
//         </div>

//         {/* Role Based Button */}
        // <button
        //   className="bg-gray-200 text-orange-400 font-semibold px-4 py-2 rounded"
        //   onClick={handleButtonClick}
        // >
        //   Role Based
        // </button>

//         {/* Create Employee Button */}
//         <button
//           className="bg-gray-200 text-orange-400 font-semibold py-2 px-2 rounded"
//           onClick={handleCreateEmployeeClick}
//         >
//           Create Employee
//         </button>
//       </div>

//       {/* Employee Table */}
//       <table className="min-w-full bg-white border border-gray-200">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="py-3 px-4 border-b">Employee ID</th>
//             <th className="py-2 px-4 border-b">Employee Name</th>
//             <th className="py-2 px-4 border-b">Email ID</th>
//             <th className="py-2 px-4 border-b">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredEmployees.length > 0 ? (
//             filteredEmployees.map((employee) => (
//               <tr
//                 key={employee.employeeId}
//                 className="hover:bg-gray-100 text-center"
//               >
//                 <td className="py-2 px-4 border-b">{employee.employeeId}</td>
//                 <td className="py-2 px-4 border-b">{employee.firstname}</td>
//                 <td className="py-2 px-4 border-b">{employee.email}</td>
//                 <button
//                   className="text-blue-500 hover:underline"
//                   onClick={() => navigate(`/dashboard/`)} 
//                 >
//                   View
//                 </button>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3" className="py-2 px-4 border-b text-center">
//                 No employees found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="flex justify-between mt-4">
//         <button
//           className="bg-gray-200 text-orange-400 px-4 py-2 rounded"
//           onClick={handlePreviousPage}
//           disabled={pageNumber === 0}
//         >
//           Previous
//         </button>
//         <button
//           className="bg-gray-200 text-orange-400 px-4 py-2 rounded"
//           onClick={handleNextPage}
//         >
//           Next
//         </button>
//       </div>

//       {/* Popup Modal for Role Based Assignment */}
      // {showPopup && (
      //   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      //     <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      //       <h2 className="text-xl font-semibold mb-4">Assign Role</h2>
      //       <div className="mb-4">
      //         <label className="block text-gray-700 font-semibold mb-2">
      //           empId
      //         </label>
      //         <input
      //           type="text"
      //           className="w-full border border-gray-300 px-4 py-2 rounded"
      //           placeholder="Enter empId"
      //           value={selectedEmployeeId}
      //           onChange={(e) => setSelectedEmployeeId(e.target.value)} // Capture empId input
      //         />
      //       </div>

      //       {/* Roles */}
      //       <div className="mb-5">
      //         <label className="block text-gray-700 font-semibold mb-2">
      //           Role
      //         </label>
      //         <div>
      //           <label className="inline-flex items-center mr-2">
      //             <input
      //               type="radio"
      //               name="role"
      //               value="ROLE_MANAGER"
      //               className="form-radio"
      //               checked={userRole === "ROLE_MANAGER"}
      //               onChange={(e) => setUserRole(e.target.value)} // Capture role selection
      //             />
      //             <span className="ml-2">Manager</span>
      //           </label>
      //           <label className="inline-flex items-center mr-2">
      //             <input
      //               type="radio"
      //               name="role"
      //               value="ROLE_HR"
      //               className="form-radio"
      //               checked={userRole === "ROLE_HR"}
      //               onChange={(e) => setUserRole(e.target.value)} // Capture role selection
      //             />
      //             <span className="ml-2">HR</span>
      //           </label>
      //           <label className="inline-flex items-center mr-2">
      //             <input
      //               type="radio"
      //               name="role"
      //               value="ROLE_EMPLOYEE"
      //               className="form-radio"
      //               checked={userRole === "ROLE_EMPLOYEE"}
      //               onChange={(e) => setUserRole(e.target.value)} // Capture role selection
      //             />
      //             <span className="ml-2">Employee</span>
      //           </label>
      //           <label className="inline-flex items-center">
      //             <input
      //               type="radio"
      //               name="role"
      //               value="ROLE_ADMIN"
      //               className="form-radio"
      //               checked={userRole === "ROLE_ADMIN"}
      //               onChange={(e) => setUserRole(e.target.value)} // Capture role selection
      //             />
      //             <span className="ml-2">Admin</span>
      //           </label>
      //         </div>
      //       </div>

      //       {/* Confirm and Cancel Buttons */}
      //       <div className="flex justify-end">
      //         <button
      //           className="bg-red-500 text-white px-4 py-2 rounded mr-2"
      //           onClick={handleClosePopup}
      //         >
      //           Cancel
      //         </button>
      //         <button
      //           className="bg-green-500 text-white px-4 py-2 rounded"
      //           onClick={handleConfirmRoleUpdate} // Handle role update submission
      //         >
      //           Confirm
      //         </button>
      //       </div>
      //     </div>
      //   </div>
      // )}

      // {/* Edit Employee Details Form */}
      // {showEditForm && (
      //   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      //     <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      //       <EditPersonalDetails onCancel={handleCancel} onSave={handleSave} />
      //     </div>
      //   </div>
      // )}
//     </div>
//   );
// };

// export default EmployeeTable;

import React, { useState, useEffect } from "react";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import axiosInstance from "./axiosConfig";
import { useNavigate } from "react-router-dom";
import EditPersonalDetails from "./createEmply";


const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");



  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get(
          `/hrmsapplication/employee/getAll`,
          {
            params: {
              pageNumber,
              size: pageSize,
            },
          }
        );
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, [pageNumber, pageSize]);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = employees.filter(
      (employee) =>
        employee.employeeId.toLowerCase().includes(query) ||
        employee.firstname.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query)
    );
    setFilteredEmployees(filtered);
  };
  const handleCreateEmployeeClick = () => {
    setShowEditForm(true); // Show the EditPersonalDetails form when clicked
  };
  const handleButtonClick = () => {
    setShowPopup(true);
  };
  // Update the onClick handler to pass employeeId to the Dashboard component
  const handleViewClick = (employeeId) => {
    navigate(`/dashboard/${employeeId}`);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowEditForm(false); // Close the form without saving
  };

  const handleSave = (formValues) => {
    console.log("Saved data:", formValues);
    setShowEditForm(false); // Close the form after saving
  };

  const handleConfirmRoleUpdate = async () => {
    const requestBody = {
      employeeId: selectedEmployeeId,
      userRole,
    };

    try {
      const response = await axiosInstance.patch(
        "/hrmsapplication/authentication/updateAuthenticationRole",
        requestBody
      );
      console.log("Role updated successfully:", response.data);
      setShowPopup(false); 
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };
  return (
    <div className="container mx-auto p-6">
      <nav className="flex items-center mb-4 p-2 border rounded-lg shadow-md w-30">
        <div className="flex items-center space-x-1">
          <AiOutlineHome className="text-xl" />
          <span className="text-lg font-bold">Home</span>
        </div>
      </nav>

      <div className="flex justify-center items-center mb-4 space-x-4">
        <div className="flex items-right border rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            className="py-2 px-3 focus:outline-none rounded-l-lg"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="bg-gray-200 text-gray-500 px-3 rounded-r-lg">
            <AiOutlineSearch />
          </button>
          <button
          className="bg-gray-200 text-orange-400 font-semibold py-2 px-2 rounded"
          onClick={handleCreateEmployeeClick}
        >
          Create Employee
        </button>
        </div>
        <button
          className="bg-gray-200 text-orange-400 font-semibold px-4 py-2 rounded"
          onClick={handleButtonClick}
        >
          Role Based
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-4 border-b">Employee ID</th>
            <th className="py-2 px-4 border-b">Employee Name</th>
            <th className="py-2 px-4 border-b">Email ID</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee.employeeId} className="hover:bg-gray-100 text-center">
                <td className="py-2 px-4 border-b">{employee.employeeId}</td>
                <td className="py-2 px-4 border-b">{employee.firstname}</td>
                <td className="py-2 px-4 border-b">{employee.email}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleViewClick(employee.employeeId)} // Navigate to dashboard with employeeId
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-2 px-4 border-b text-center">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-200 text-orange-400 px-4 py-2 rounded"
          onClick={() => setPageNumber((prev) => prev - 1)}
          disabled={pageNumber === 0}
        >
          Previous
        </button>
        <button
          className="bg-gray-200 text-orange-400 px-4 py-2 rounded"
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Assign Role</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                empId
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-2 rounded"
                placeholder="Enter empId"
             
                onChange={(e) => setSelectedEmployeeId(e.target.value)} // Capture empId input
              />
            </div>

            {/* Roles */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Role
              </label>
              <div>
                <label className="inline-flex items-center mr-2">
                  <input
                    type="radio"
                    name="role"
                    value="ROLE_MANAGER"
                    className="form-radio"
                 
                    onChange={(e) => setUserRole(e.target.value)} // Capture role selection
                  />
                  <span className="ml-2">Manager</span>
                </label>
                <label className="inline-flex items-center mr-2">
                  <input
                    type="radio"
                    name="role"
                    value="ROLE_HR"
                    className="form-radio"
                 
                    onChange={(e) => setUserRole(e.target.value)} // Capture role selection
                  />
                  <span className="ml-2">HR</span>
                </label>
                <label className="inline-flex items-center mr-2">
                  <input
                    type="radio"
                    name="role"
                    value="ROLE_EMPLOYEE"
                    className="form-radio"
                 
                    onChange={(e) => setUserRole(e.target.value)} // Capture role selection
                  />
                  <span className="ml-2">Employee</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="ROLE_ADMIN"
                    className="form-radio"
                  
                    onChange={(e) => setUserRole(e.target.value)} // Capture role selection
                  />
                  <span className="ml-2">Admin</span>
                </label>
              </div>
            </div>

            {/* Confirm and Cancel Buttons */}
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmRoleUpdate} // Handle role update submission
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Details Form */}
      {showEditForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <EditPersonalDetails onCancel={handleCancel} onSave={handleSave} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
