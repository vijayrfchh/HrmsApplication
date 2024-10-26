import { useState } from 'react';
import axiosInstance from "./axiosConfig";

const Department = () => {
  const [departmentId, setDepartmentId] = useState(''); // New state for department ID
  const [departmentName, setDepartmentName] = useState('');
  const [departmentHead, setDepartmentHead] = useState('');
  const [departments, setDepartments] = useState([]);

  const handleAddDepartment = async () => {
    if (!departmentId.trim() || !departmentName.trim() || !departmentHead.trim()) {
      alert('Please enter department ID, name, and head.');
      return;
    }

    const departmentData = {
      departmentId,
      departmentName,
      departmentHead,
    };

    try {
      const response = await axiosInstance.post(
        '/hrmsapplication/department/create',
        departmentData
      );

      // Assuming response is already in JSON format, depending on your backend
      const result = response.data;

      // Update local department list
      setDepartments([...departments, departmentData]);

      // Clear input fields
      setDepartmentId('');
      setDepartmentName('');
      setDepartmentHead('');

      alert('Department added successfully!');
      console.log('Department added:', result);
    } catch (error) {
      console.error('Error adding department:', error);
      alert('Error adding department. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Departments</h2>
      <div className="mb-6 shadow-md p-4 rounded-lg">
        <input
          type="text"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
          placeholder="Enter department ID"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
        />
        <input
          type="text"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
          placeholder="Enter department name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        <input
          type="text"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
          placeholder="Enter department head"
          value={departmentHead}
          onChange={(e) => setDepartmentHead(e.target.value)}
        />
        <button
          onClick={handleAddDepartment}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Add Department
        </button>
      </div>

      <div className="shadow-md p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Department List</h3>
        <ul className="list-disc pl-6">
          {departments.length > 0 ? (
            departments.map((dept, index) => (
              <li key={index} className="mb-2 text-gray-700">
                <strong>ID:</strong> {dept.departmentId} - <strong>Name:</strong> {dept.departmentName} - <strong>Head:</strong> {dept.departmentHead}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No departments added yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Department;
