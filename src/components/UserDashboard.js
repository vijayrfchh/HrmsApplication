import PropTypes from 'prop-types'; 
import { useNavigate} from 'react-router-dom';
import { FaUser,  FaClipboardCheck,  FaCalendarAlt,  FaChartLine,  FaFileAlt,  FaSuitcase,  FaClipboard,  FaCalendar,
  FaTrophy,  FaSitemap,  FaMoneyBill,  FaSignInAlt,  FaCheckSquare,  FaProjectDiagram,  FaMedal,  FaIdBadge,} from 'react-icons/fa';

const UserDashboard = () => {
  const navigate = useNavigate();  
  const employeeId = localStorage.getItem('EmpId'); 
  const handleCardClick = (title) => {
    switch (title) {
      case 'My Assessments':
        navigate('/');
        break;
      case 'Timesheet':
        navigate('/approvals');
        break;
      case 'Holidays':
        navigate(`/holidays/${employeeId}`);
        break;
      case 'Attendance':
        navigate(`/attendenceSheet/${employeeId}`);
        break;
      case 'Careers':
        navigate(`/careers`);
        break;
      case 'Associate 360':
        navigate('/interview');
        break;
      case 'MyPay':
        navigate('/careersb');
        break;
      case 'On Boarding':
        navigate('/assignment');
        break;
      case 'Leave Balance':
        navigate('/leaves');
        break;
      case 'Organisation Chart':
        navigate('/employeePerformance');
        break;
      case 'Employee Performance':
        navigate('/organisationChart');
        break;
      case 'Employee Profile':
        navigate(`/dashboard/${employeeId}`);
        break;
      case 'Employee ID':
        navigate('/organisationChart');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">Welcome, Have A Good Day!</h1>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
        </div>

        {/* Greeting Section */}
        <div className="p-40 bg-gradient-to-r from-pink-400 to-yellow-400 text-3xl font-bold text-center text-white shadow-xl rounded-lg mb-6">
          Good Morning
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Quick Masters</h2>
        </div>

        {/* Divider */}
        <hr className="my-8 border-t border-gray-300" />

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">Menu</h2>
          <div className="flex justify-center">
            <div className="grid grid-cols-6 gap-20">
              {[
                { title: "My Assessments", icon: <FaClipboardCheck /> },
                { title: "Timesheet", icon: <FaFileAlt /> },
                { title: "Holidays", icon: <FaCalendarAlt /> },
                { title: "Attendance", icon: <FaCheckSquare /> },
                { title: "Careers", icon: <FaChartLine /> },
                { title: "Associate 360", icon: <FaMedal /> },
                { title: "MyPay", icon: <FaMoneyBill /> },
                { title: "On Boarding", icon: <FaSignInAlt /> },
                { title: "Leave Balance", icon: <FaFileAlt /> },
                { title: "Organisation Chart", icon: <FaSitemap /> },
                { title: "Employee Performance", icon: <FaTrophy /> },
                { title: "Employee Profile", icon: <FaUser /> },
                { title: "Employee ID", icon: <FaIdBadge /> },
              ].map((menuItem) => (
                <MenuCard
                  key={menuItem.title}
                  title={menuItem.title}
                  icon={menuItem.icon}
                  onClick={() => handleCardClick(menuItem.title)} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuCard = ({ title, icon, onClick }) => {
  return (
    <div
      onClick={onClick} 
      className="bg-white text-gray-800 p-3 w-[150px] h-[80px] rounded-lg shadow-md flex flex-col items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="text-2xl mb-1">{icon}</div>
      <h2 className="text-sm font-semibold text-center">{title}</h2>
    </div>
  );
};

MenuCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired, 
};

export default UserDashboard;
