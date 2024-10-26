// import React from "react";
// import { FaRegIdCard } from "react-icons/fa";
// import { SlEnvolope } from "react-icons/sl";
// import { IoNotifications } from "react-icons/io5";

// function Navbar() {
//   return (
//     <nav className="relative flex items-center justify-between bg-orange-500 px-3 py-1 h-16 z-10 border-b border-gray-300">

//       {/* {/ Left side (Logo) /} */}
//       <div className="h-8 w-8 border rounded-lg flex-shrink-0"> 
//         <img
//           src="/Rfchh logo"
//           alt="Logo"
//           className="h-full w-full object-contain"
//         />
//       </div>

//       {/* {/ Centered icon and label /} */}
//       <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center text-black">
//         <FaRegIdCard className="text-xl mr-1 sm:mr-2" />
//         <h1 className="text-sm sm:text-lg font-semibold whitespace-nowrap">NationalDetails</h1>
//       </div>

//       {/* {/ Right side (Profile-related icons) /} */}
//       <div className="flex items-center space-x-1 sm:space-x-2">
//         <SlEnvolope className="text-black text-lg sm:text-xl" />
//         <IoNotifications className="text-black text-lg sm:text-xl" />

//         <div className="flex items-center space-x-1 p-1 sm:p-2 rounded">
//           <div className="h-6 w-6 bg-gray-300 rounded-full" />

//           <div className="hidden sm:flex flex-col">
//             <span className="text-black text-xs font-semibold">Vijay</span>
//             <span className="text-xs text-black-600">Front-end Developer</span>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import React from "react";
import { FaRegIdCard } from "react-icons/fa";
import { SlEnvolope } from "react-icons/sl";
import { IoNotifications } from "react-icons/io5";

function Navbar() {
  return (
    <nav className="relative flex items-center justify-between bg-orange-500 px-3 py-1 h-16 z-10">

      {/* Left side (Logo) */}
      <div className="h-12 w-12   rounded-md "> 
        <img
          src="/Rfchh logo"
          alt="Logo"
          className="h-full w-full object-contain rounded-lg"
        />
      </div>

      {/* Centered icon and label */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center text-black">
        <FaRegIdCard className="text-xl mr-1 sm:mr-2" />
        <h1 className="text-sm sm:text-lg font-semibold whitespace-nowrap">National Details</h1>
      </div>

      {/* Right side (Profile-related icons) */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        <SlEnvolope className="text-black text-lg sm:text-xl" />
        <IoNotifications className="text-black text-lg sm:text-xl" />

        <div className="flex items-center space-x-1 p-1 sm:p-2 rounded">
          <div className="h-8 w-8 bg-gray-300 rounded-full" />

          <div className="hidden sm:flex flex-col">
            <span className="text-black  font-semibold">Sananth</span>
            <span className="text-sm text-black-600">Front-end Developer</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
