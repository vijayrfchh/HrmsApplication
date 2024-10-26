import { useState, useEffect } from 'react';
import axiosInstance from "./axiosConfig";

const OrganizationCreation = () => {
  const [organizationName, setOrganizationName] = useState('');
  const [employeeDomain, setEmployeeDomain] = useState('');
  const [weekOfOne, setWeekOfOne] = useState('');
  const [weekOfTwo, setWeekOfTwo] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [rootDesignation, setRootDesignation] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [multiLevel, setMultiLevel] = useState(true);

  const handleDaySelect = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      if (selectedDays.length < 2) {
        setSelectedDays([...selectedDays, day]);
      } else {
        setSelectedDays([selectedDays[1], day]);
      }
    }
  };

  const handleSetWeekOff = () => {
    if (selectedDays.length > 0) {
      setWeekOfOne(selectedDays[0]);
      if (selectedDays.length === 2) {
        setWeekOfTwo(selectedDays[1]);
      } else {
        setWeekOfTwo('');
      }
      setSelectedDays([]);
      setIsSaved(true);
    } else {
      alert('Please select at least one day for week off.');
    }
  };

  const handleFinalSave = async () => {
    const organizationData = {
      organizationName,
      employeeDomain,
      logoUrl,
      rootDesignation,
      weekOfOne,
      weekOfTwo,
      multiLevel,
    };

    try {
      const response = await axiosInstance.post(
        '/hrmsapplication/organization/create',
        organizationData
      );
      alert('Organization created successfully!');
      console.log('Organization created:', response.data);
    } catch (error) {
      console.error('Error creating organization:', error);
      alert('Error creating organization. Please try again.');
    }
  };

  const fetchOrganizationData = async () => {
    try {
      const response = await axiosInstance.get(
        '/hrmsapplication/organization/getOrganizationRFCHH'
      );

      const data = response.data;
      setOrganizationName(data.organizationName);
      setEmployeeDomain(data.employeeDomain);
      setLogoUrl(data.logoUrl);
      setRootDesignation(data.rootDesignation);
      setWeekOfOne(data.weekOfOne);
      setWeekOfTwo(data.weekOfTwo);
      setMultiLevel(data.multiLevel);
    } catch (error) {
      console.error('Failed to fetch organization data:', error);
    }
  };

  useEffect(() => {
    fetchOrganizationData();
  }, []);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg p-8 rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-2xl font-bold mb-6 text-center">Create Organization</h1>

          <div className="mb-6 shadow-md p-4 rounded-lg">
            <label className="block text-lg font-semibold mb-2">Organization Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter organization name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
            />
          </div>

          <div className="mb-6 shadow-md p-4 rounded-lg">
            <label className="block text-lg font-semibold mb-2">Employee ID Domain</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter employee domain"
              value={employeeDomain}
              onChange={(e) => setEmployeeDomain(e.target.value)}
            />
          </div>

          <div className="mb-6 shadow-md p-4 rounded-lg">
            <label className="block text-lg font-semibold mb-2">Root Designation</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Create Root Designation"
              value={rootDesignation}
              onChange={(e) => setRootDesignation(e.target.value)}
            />
          </div>

          <div className="mb-6 shadow-md p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Approval Type</h2>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="approvalType"
                  value="single"
                  checked={!multiLevel}
                  onChange={() => setMultiLevel(false)}
                  className="mr-2"
                />
                Single Level
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="approvalType"
                  value="multi"
                  checked={multiLevel}
                  onChange={() => setMultiLevel(true)}
                  className="mr-2"
                />
                Multi Level
              </label>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-center">Select Week Offs</h2>

            <div className="shadow-md p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">Choose one or two days</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    className={`px-4 py-2 rounded-lg ${
                      isSaved && (weekOfOne === day || weekOfTwo === day)
                        ? 'bg-red-600 text-white'
                        : selectedDays.includes(day)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    onClick={() => handleDaySelect(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSetWeekOff}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Set Week Off
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleFinalSave}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save All
        </button>
      </div>
    </div>
  );
};

export default OrganizationCreation;
