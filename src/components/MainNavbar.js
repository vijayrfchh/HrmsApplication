// import React,{ useContext } from "react";
// import { SlEnvolope } from "react-icons/sl";
// import { IoNotifications } from "react-icons/io5";

// const Navbar = ({ employeeProfileDetails }) => {
//   return (
//     <div className="flex justify-between items-center p-2 bg-white shadow-md rounded-md">
//       <img
//         src="/rfchh.jpg"
//         alt="Logo"
//         className="h-11 w-12 object-cover rounded-xl"
//       />
//       <h1 className="text-xl font-bold ml-44">Dashboard</h1>
//       <div className="flex items-center space-x-4">
//         <i>
//           <SlEnvolope size={20} />
//         </i>
//         <i>
//           <IoNotifications size={20} />
//         </i>
//         <div className="flex items-center">
//           <img
//             src="/rfchh.jpg"
//             alt="Profile"
//             className="w-8 h-8 rounded-full"
//           />
//           <span className="mr-2">{employeeProfileDetails?.firstname}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useContext } from "react";
import { EmployeeContext } from "./EmployeeProvider";
import { SlEnvolope } from "react-icons/sl";
import { IoNotifications } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { IoPersonSharp, IoLocationOutline } from "react-icons/io5";
import { TiGroup } from "react-icons/ti";
import { FaRegIdCard, FaBookReader } from "react-icons/fa";
import { PiSuitcaseSimpleFill, PiAirplaneTiltFill } from "react-icons/pi";

const Navbar = () => {
  const location = useLocation();
  const employeeData = useContext(EmployeeContext);
  const employeeProfileDetails = employeeData?.employeeProfileDetails;

  const getTitleAndIcon = (pathname) => {
    switch (pathname) {
      case "/":
        return { title: "Dashboard" };
      case "/personalDetails":
        return {
          title: "Profile",
          icon: <IoPersonSharp size={24} />,
          bgColor: "bg-orange-500",
        };
      // case `/personalDetails/${id}1`:
      //   return {
      //     title: "Profile",
      //     icon: <IoPersonSharp size={24} />,
      //     bgColor: "bg-orange-500",
      //   };
      case "/educationDetails":
        return {
          title: "Education Details",
          icon: <FaBookReader size={24} />,
          bgColor: "bg-orange-500",
        };
      case "/current":
        return {
          title: "Current Experience Details",
          icon: <PiSuitcaseSimpleFill size={24} />,
          bgColor: "bg-orange-500",
        };
      case "/familyDetails":
        return {
          title: "Family Details",
          icon: <TiGroup size={24} />,
          bgColor: "bg-orange-500",
        };
      case "/experience":
        return {
          title: "Experience Details",
          icon: <PiSuitcaseSimpleFill size={24} />,
          bgColor: "bg-orange-500",
        };
      case "/location":
        return {
          title: "Address Details",
          icon: <IoLocationOutline size={24} />,
          bgColor: "bg-orange-500",
        };
      case "/National":
        return {
          title: "National Details",
          icon: <FaRegIdCard size={24} />,
          bgColor: "bg-orange-500",
        };
      case "/Travel":
        return {
          title: "Travel Details",
          icon: <PiAirplaneTiltFill size={24} />,
          bgColor: "bg-orange-500",
        };
      default:
        return { title: "Dashboard" };
    }
  };

  const { title, icon, bgColor } = getTitleAndIcon(location.pathname);

  return (
    <div className={`flex justify-between items-center p-2 ${bgColor} shadow-md rounded-md`}>
      {/* Left Section - Logo */}
      <div className="flex items-center">
        <img
          src="/rfchh.jpg"
          alt="Logo"
          className="h-11 w-12 object-cover rounded-xl"
        />
      </div>

      {/* Center Section - Title with Icon */}
      <div className="flex items-center space-x-2 text-center sm:text-left sm:flex-col md:flex-row">
        {icon}
        <h1 className="text-base sm:text-lg md:text-xl font-bold">{title}</h1>
      </div>

      {/* Right Section - Icons and Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <i>
          <SlEnvolope size={20} />
        </i>
        <i>
          <IoNotifications size={20} />
        </i>
        <div className="flex items-center space-x-2">
          <img
            src="/rfchh.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm sm:text-lg font-bold">
            {employeeProfileDetails?.firstname || 'Guest' }
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
