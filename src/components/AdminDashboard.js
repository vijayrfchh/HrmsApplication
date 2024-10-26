import PropTypes from 'prop-types'; 
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaClipboardCheck,
  FaCalendarAlt,
  FaChartLine,
  FaFileAlt,
  FaSuitcase,
  FaClipboard,
  FaCalendar,
  FaTrophy,
  FaSitemap,
} from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreateOrganization = () => {
    navigate('/createorganization');
  };

  const handleDepartment = () => {
    navigate('/department');
  };

  const handleCardClick = (title) => {
    if (title === 'Profile') navigate('/allEmployee');
    if (title === 'Approvals') navigate('/approvals');
    if (title === 'Leaves') navigate('/leaves');
    if (title === 'Attendance') navigate('/attendenceSheet');
    if (title === 'OnBoarding') navigate('/interview');
    if (title === 'Careers') navigate('/careers');
    if (title === 'Assignment') navigate('/projects');
    if (title === 'Holidays') navigate('/holidays');
    if (title === 'Employee Performance') navigate('/employeePerformance');
    if (title === 'Organisation Chart') navigate('/organisationChart');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">Welcome Admin!</h1>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
          <div className="flex space-x-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleCreateOrganization}
            >
              Create Organization
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleDepartment}
            >
              Department
            </button>
          </div>
        </div>

        <div className="p-40 bg-gradient-to-r from-pink-400 to-yellow-400 text-3xl font-bold text-center text-white shadow-xl rounded-lg mb-6">
          Good Morning
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Quick Masters</h2>

          <div className="flex space-x-2 justify-center">
            <DashboardCard title="Profile" icon={<FaUser />} onClick={() => handleCardClick('Profile')} color="bg-green-500" />
            <DashboardCard title="Approvals" icon={<FaClipboardCheck />} onClick={() => handleCardClick('Approvals')} color="bg-red-500" />
            <DashboardCard title="Leaves" icon={<FaFileAlt />} onClick={() => handleCardClick('Leaves')} color="bg-blue-500" />
            <DashboardCard title="Attendance" icon={<FaCalendarAlt />} onClick={() => handleCardClick('Attendance')} color="bg-gray-500" />
            <DashboardCard title="On Boarding" icon={<FaSuitcase />} onClick={() => handleCardClick('OnBoarding')} color="bg-orange-500" />
            <DashboardCard title="Careers" icon={<FaChartLine />} onClick={() => handleCardClick('Careers')} color="bg-yellow-500" />
            <DashboardCard title="Assignment" icon={<FaClipboard />} onClick={() => handleCardClick('Assignment')} color="bg-purple-500" />
            <DashboardCard title="Holidays" icon={<FaCalendar />} onClick={() => handleCardClick('Holidays')} color="bg-teal-500" />
            <DashboardCard title="Employee Performance" icon={<FaTrophy />} onClick={() => handleCardClick('Employee Performance')} color="bg-pink-500" />
            <DashboardCard title="Organisation Chart" icon={<FaSitemap />} onClick={() => handleCardClick('Organisation Chart')} color="bg-cyan-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, icon, color, onClick }) => {
  return (
    <div
      className={`${color} text-white p-3 w-[120px] h-[120px] rounded-lg shadow-md flex flex-col items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-1`}
      onClick={onClick} // Call onClick when the card is clicked
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h2 className="text-sm font-semibold text-center">{title}</h2>
    </div>
  );
};

// Validate the types of props being passed to DashboardCard
DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired, // Add onClick prop type
};

export default Dashboard;
