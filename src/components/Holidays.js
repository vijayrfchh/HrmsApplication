//holiday.js
import React, { useEffect, useState } from 'react';
import { TiPencil } from 'react-icons/ti';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdCancelPresentation } from 'react-icons/md';
import { FaLessThan } from 'react-icons/fa';
import axiosInstance from './axiosConfig';

function App() {
  const initialData = {
    holidayName: '',
    date: '',
    location: '',
    holidayId: '',
  };

  const [formData, setFormData] = useState({ ...initialData });
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Retrieve user role from localStorage
    const role = localStorage.getItem('userRole'); // Assuming userRole is stored as 'userRole'
    setUserRole(role);
    
    fetchCurrentDetails();
  }, []);

  const fetchCurrentDetails = async () => {
    try {
      const response = await axiosInstance.get("hrmsapplication/holiday/getHoliday");
      setTableData(response.data);
      console.log("Fetched data:", response.data);
    } catch (error) {
      console.error("Error fetching Holiday Details:", error);
    }
  };

  const today = new Date();
  const currentYear = today.getFullYear();
  const nextYear = currentYear + 1;
  const startDate = `${currentYear}-01-01`;
  const endDate = `${nextYear}-12-31`;
  const nameRegex = /^[a-zA-Z][a-zA-Z\s]*$/;

  const validateForm = () => {
    let newError = {};
    
    if (!formData.holidayName.trim()) {
      newError.holidayName = 'Holiday Name is required';
    } else if (!nameRegex.test(formData.holidayName)) {
      newError.holidayName = 'Holiday Name must start with a character and contain only alphabets and spaces';
    } else if (formData.holidayName.length < 2 || formData.holidayName.length > 30) {
      newError.holidayName = 'Holiday Name must be between 2 and 30 characters';
    }

    if (!formData.date) {
      newError.date = 'Holiday Date is required';
    } else if (tableData.some((row, index) =>
      row.date === formData.date && index !== editIndex)) {
      newError.date = 'Date is already taken';
    }

    if (!formData.location.trim()) {
      newError.location = 'Location is required';
    } else if (!nameRegex.test(formData.location)) {
      newError.location = 'Location must start with a character and contain only alphabets and spaces';
    } else if (formData.location.length < 1 || formData.location.length > 30) {
      newError.location = 'Location must be between 1 and 30 characters';
    }

    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const handleOpenPopup = (index = null) => {
    setFormData(index !== null ? { ...tableData[index] } : { ...initialData });
    setEditIndex(index);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditIndex(null);
  };

  const formatPostDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        const updatedFormData = {
          ...formData,
          date: formatPostDate(formData.date),
        };

        if (editIndex !== null) {
          const response = await axiosInstance.patch(
            'https://hrms-application-oxy0.onrender.com/hrmsapplication/holiday/',
            { holidayId: tableData[editIndex].holidayId, ...updatedFormData },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("PATCH Response Data:", response.data);

          // Update the local state
          const newTableData = [...tableData];
          newTableData[editIndex] = { ...newTableData[editIndex], ...updatedFormData };
          setTableData(newTableData);
        } else {
          const response = await axiosInstance.post(
            'https://hrms-application-oxy0.onrender.com/hrmsapplication/holiday/',
            updatedFormData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("POST Response Data:", response.data);
          const newHolidayEntry = { ...updatedFormData, holidayId: response.data.holidayId };
          setTableData([...tableData, newHolidayEntry]);
        }
  
        handleClosePopup();
      } catch (error) {
        console.error("Error during request:", error.response?.data || error.message);
        alert("There was an error saving the holiday details. Please try again.");
      }
    } else {
      console.log("Form validation failed.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleDelete = async (index) => {
    const holidayId = tableData[index].holidayId;

    try {
      await axiosInstance.delete(
        `/hrmsapplication/holiday/${holidayId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("DELETE Response Data:", holidayId);
      setTableData(tableData.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error during deletion:", error.response?.data || error.message);
      alert("There was an error deleting the holiday. Please try again.");
    }
  };

  const handleAddRow = () => {
    handleOpenPopup();
  };

  const preventManualInput = (e) => {
    if (e.key !== 'Tab') {
      e.preventDefault();
    }
  };

  const handleNameChar = (e) => {
    const key = e.key;
    const value = e.target.value;

    if ((value === "" && key === " ") || !/[a-zA-Z\s]/.test(key)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="mr-10 ml-6">
        <div className="flex items-center justify-start px-2 py-2 overflow-x-auto border-2 border-gray-800 rounded-md w-40 ml-5 mb-5 mt-5">
          <FaLessThan className="text-orange-500 mr-2" />
          <button>
            <span className="text font-semibold text-orange-500">Previous Page</span>
          </button>
        </div>
      </div>
      <div className="p-4 pt-5 mt-5 ml-10 mr-10 lg:ml-48 lg:mr-48">
        <div className='overflow-x-auto'>
          <table className="w-full ">
            <thead>
              <tr>
                <th className="py-5 px-4 text-left bg-orange-500 text-white border-2 border-solid border-black" colSpan="4"></th>
              </tr>
              <tr>
                <th className="py-2 px-4 text-left text-black border-2 border-solid border-black" colSpan="4">
                  <div className="flex justify-between items-center">
                    <span>Holidays</span>
                    {userRole === 'ROLE_HR' && (
                      <button className="bg-green-600 text-white py-1 px-4 rounded" onClick={handleAddRow} type="button">
                        Add
                      </button>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className='border border-black border-collapse'>
              <tr>
                <th className="bg-gray-400 w-1/4 py-2 border-2 border-solid border-black">Name of The Holiday</th>
                <th className="bg-gray-400 w-1/4 py-2 border-2 border-solid border-black">Date</th>
                <th className="bg-gray-400 w-1/4 py-2 border-2 border-solid border-black">Location</th>
                <th className="bg-gray-400 w-1/4 py-2 border-2 border-solid border-black">Action</th>
              </tr>
              {tableData.map((row, index) => (
                <tr key={row.holidayId}>
                  <td className="py-2 px-4 border-2 border-solid border-black">{row.holidayName}</td>
                  <td className="py-2 px-4 border-2 border-solid border-black">{row.date}</td>
                  <td className="py-2 px-4 border-2 border-solid border-black">{row.location}</td>
                  <td className="py-2 px-4 border-2 border-solid border-black">
                    {userRole === 'ROLE_HR' && (
                      <div className="flex">
                        <button onClick={() => handleOpenPopup(index)}><TiPencil className="text-blue-500" /></button>
                        <button onClick={() => handleDelete(index)}><RiDeleteBin6Line className="text-red-500 ml-2" /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">{editIndex !== null ? 'Edit Holiday' : 'Add Holiday'}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Holiday Name:</label>
                <input
                  type="text"
                  name="holidayName"
                  value={formData.holidayName}
                  onChange={handleChange}
                  onKeyDown={handleNameChar}
                  required
                  className={`border ${errors.holidayName ? 'border-red-500' : 'border-gray-300'} p-2 w-full`}
                />
                {errors.holidayName && <p className="text-red-500 text-sm">{errors.holidayName}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className={`border ${errors.date ? 'border-red-500' : 'border-gray-300'} p-2 w-full`}
                />
                {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className={`border ${errors.location ? 'border-red-500' : 'border-gray-300'} p-2 w-full`}
                />
                {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
              </div>
              <div className="flex justify-end">
                <button type="button" className="bg-red-500 text-white py-1 px-4 rounded mr-2" onClick={handleClosePopup}>
                  <MdCancelPresentation />
                </button>
                <button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded">
                  {editIndex !== null ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
