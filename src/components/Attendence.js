import { useState, useEffect } from 'react';
import { AiTwotoneHome, AiOutlineDownload } from "react-icons/ai";
import axiosInstance from './axiosConfig';

const AttendanceSheet = () => {
  const [attendance, setAttendance] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [clickedDay, setClickedDay] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [tempStartTime, setTempStartTime] = useState('');
  const [tempEndTime, setTempEndTime] = useState('');
  const [totalWorkHours, setTotalWorkHours] = useState(null);
  const [attendanceType, setAttendanceType] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');

  const formatDateForAPI = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    setSelectedDate(date);
    setClickedDay(date.toLocaleDateString('en-US', { weekday: 'short' }));
    fetchAttendance(date);  // Fetch details for the selected date
  };

  const getEmployeeId = () => {
    return localStorage.getItem('EmpId');
  };

  const fetchAttendance = async (date) => {
    const employeeId = getEmployeeId();
    const formattedDate = formatDateForAPI(date);

    try {
      const response = await axiosInstance.get(`/hrmsapplication/attendance/self`, {
        params: {
          employeeId: employeeId,
          attendanceDate: formattedDate
        }
      });
      const fetchedAttendance = response.data;

      if (fetchedAttendance && Object.keys(fetchedAttendance).length > 0) {
        setAttendance(fetchedAttendance);
        setStartTime(fetchedAttendance.inTime || '');
        setEndTime(fetchedAttendance.outTime || '');
        setTotalWorkHours(fetchedAttendance.totalWorkingHours || '');
        setAttendanceType(fetchedAttendance.type || '');
        setErrorMessage('');  // Clear any previous error message
      } else {
        clearForm();  // Reset the form when no data is found
        setErrorMessage('No attendance data available for this date.');
      }
    } catch (error) {
      clearForm();  // Reset the form on error
      console.error("Error fetching attendance:", error);
      setErrorMessage('Error fetching attendance data.');
    }
  };

  const clearForm = () => {
    setAttendance(null);
    setStartTime('');
    setEndTime('');
    setTotalWorkHours(null);
    setAttendanceType('');
  };

  useEffect(() => {
    // Fetch attendance for the initially selected date
    fetchAttendance(selectedDate);
  }, []);

  const handleCreate = () => {
    setTempStartTime(startTime);
    setTempEndTime(endTime);
    setShowPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  const calculateTotalWorkingHours = (inTime, outTime) => {
    const [inHours, inMinutes] = inTime.split(':').map(Number);
    const [outHours, outMinutes] = outTime.split(':').map(Number);
    
    const start = new Date();
    start.setHours(inHours, inMinutes, 0);

    const end = new Date();
    end.setHours(outHours, outMinutes, 0);

    const totalMinutes = Math.abs((end - start) / 60000); // Calculate total minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  const handleSubmit = async () => {
    const employeeId = getEmployeeId();
    const formattedDate = formatDateForAPI(selectedDate);

    const calculatedTotalWorkingHours = calculateTotalWorkingHours(tempStartTime, tempEndTime);

    const payload = {
      employeeId: employeeId,
      inTime: tempStartTime,
      outTime: tempEndTime,
      attendanceDate: formattedDate,
      totalWorkingHours: calculatedTotalWorkingHours, // Calculate total working hours here
      type: attendanceType // Use the selected attendance type
    };

    try {
      const response = await axiosInstance.post("https://hrms-application-oxy0.onrender.com/hrmsapplication/attendance/create", payload);
      console.log("Attendance successfully created:", response.data);
      // Optionally, fetch updated attendance or reset form after successful submission
      setShowPopUp(false);
      fetchAttendance(selectedDate); // Refresh attendance data
    } catch (error) {
      console.error("Error creating attendance:", error);
      setErrorMessage('Error creating attendance.');
    }
  };

  return (
    <>
      <div className="w-full lg:w-10/12 xl:w-9/12 mx-auto mt-2 bg-white rounded-md border border-black/90 shadow-md p-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <AiTwotoneHome size={20} className="mr-2" />
          </div>
          <div className="flex gap-3 items-center">
            <button className="flex items-center px-5 py-2 bg-blue-950 text-white rounded-lg hover:bg-orange-500 transition duration-300">
              <AiOutlineDownload className="mr-2" />
              Export to Excel
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Attendance Tracker</h2>
          <input
            type="date"
            onChange={handleDateChange}
            className="border rounded-md p-2 w-full mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {clickedDay && selectedDate <= new Date() && (
          <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
            <h3 className="text-xl font-semibold mb-4 text-white text-center border border-blue-900 bg-blue-950">
              {attendance ? `Attendance Date: ${attendance.attendanceDate}` : "No Attendance Data"}
            </h3>

            <div className="text-center text-lg font-bold text-gray-800">
              {attendance ? (
                <>
                  {`Total Working Hours: ${attendance.totalWorkingHours}`}<br />
                  {`Type: ${attendance.type}`}
                </>
              ) : (
                <p>{errorMessage || "No data available for this date."}</p>
              )}
            </div>

            <div className="flex justify-center items-center space-x-4 mb-6">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-46"
                placeholder="Start Time"
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-46"
                placeholder="End Time"
              />
            </div>

            {totalWorkHours && (
              <div className="text-center text-lg font-bold text-gray-800">
                Total Work Hours: {totalWorkHours}
              </div>
            )}

            <div className="flex justify-center mb-2">
              <button
                onClick={handleCreate}
                className="bg-blue-950 text-white py-2 px-6 rounded-md shadow-md hover:bg-orange-500 transition duration-200"
              >
                Click For TopUp
              </button>
            </div>
            <div className="text-center text-red-500">
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        )}

        {showPopUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg relative">
              <h2 className="text-xl font-bold mb-6 text-white text-center border border-blue-900 bg-blue-950">Top Up</h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Attendance Type</label>
                <select
                  value={attendanceType}
                  onChange={(e) => setAttendanceType(e.target.value)}
                  className="border rounded-md p-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="workfromhome">Work From Home</option>
                  <option value="office">Office</option>
                  <option value="leave">Leave</option>
                  {/* Add other attendance types as needed */}
                </select>
              </div>

              <div className="flex">
                <div className="w-1/2 pr-2">
                  <label className="block text-gray-700 font-medium mb-2">Start Time</label>
                  <input
                    type="time"
                    value={tempStartTime}
                    onChange={(e) => setTempStartTime(e.target.value)}
                    className="border rounded-md p-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-gray-700 font-medium mb-2">End Time</label>
                  <input
                    type="time"
                    value={tempEndTime}
                    onChange={(e) => setTempEndTime(e.target.value)}
                    className="border rounded-md p-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-950 text-white py-2 px-6 rounded-md shadow-md hover:bg-orange-500 transition duration-200 mr-4"
                >
                  Save
                </button>
                <button
                  onClick={handleClosePopUp}
                  className="bg-gray-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AttendanceSheet;
