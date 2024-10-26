// import React from 'react'
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard1 from './components/Dashboard.js';
// import Profile from './components/PersonalInfo.js'
// import Education from "../src/components/Education.js";
// import Current from "../src/components/CurrentExperience.js"
// import FamilyDetails from "../src/components/FamilyDetails.js"
// import Experience from "../src/components/Experience"
// import Location  from "../src/components/Location";
// import National from "../src/components/National.js"
// import Travel from "../src/components/Travel.js"
// import Navbar from "../src/components/MainNavbar";
// import EmployeeProvider from "../src/components/EmployeeProvider";

// function App() {
//   return (
//     <>
//      <EmployeeProvider>
//  <Router>
//   <div>
// <Navbar/>
//       <Routes>
//         <Route path="/" element={<Dashboard1 />} />
//         <Route path="/personalDetails" element={<Profile/>} />
//         <Route path="/educationDetails" element={<Education/>} />
//         <Route path="/current" element={<Current/>} />
//         <Route path="/familyDetails" element={<FamilyDetails/>} />
//         <Route path="/experience" element={<Experience/>} />
//         <Route path="/location" element={<Location/>} />
//         <Route path="/National" element={<National/>} />
//         <Route path="/Travel" element={<Travel/>} />
//       </Routes>
//   </div>
// </Router>
// </EmployeeProvider>

// {/* <div><Career/></div>   */}
// {/* <div><Forget/></div> */}
// {/* <div><Dash/></div> */}

// {/* <div><Login/></div> */}
//    {/* <div><Travel/></div> */}
//    {/* <div><National/></div> */}
//    {/* <div><Holiday/></div> */}
//    {/* <div><Profile/></div> */}
//    {/* <div><Experience/></div> */}
//    {/* <div><Education/></div> */}
//    {/* <div><Location/></div> */}
//     </>
//   )
// }

// export default App

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard1 from './components/Dashboard.js';
// // import Dashboard1 from './components/Dashboardex.js';
// import Profile from './components/PersonalInfo.js';
// import Education from "./components/Education.js";
// import Current from "./components/CurrentExperience.js";
// import FamilyDetails from "./components/FamilyDetails.js";
// import Experience from "./components/Experience.js";
// import Location from "./components/Location.js";
// import National from "./components/National.js";
// import Travel from "./components/Travel.js";
// import Navbar from "./components/MainNavbar";
// import EmployeeProvider from "./components/EmployeeProvider";
// import Login from "./components/Login";

// function App() {
//   return (
//       <>
//     <EmployeeProvider>
//       <Router>
//         <div>
//           <Navbar />
//           <Routes>
//             <Route path='/' element={<Login/>}/>
//             <Route path="/Dashboard" element={<Dashboard1 />} />
//             {/* Dynamic Route with :id parameter */}
//             <Route path="/personalDetails/:id" element={<Profile />} />
//             {/* Route without :id for creating a new employee */}
//             <Route path="/personalDetails" element={<Profile />} />
//             <Route path="/educationDetails" element={<Education />} />
//             <Route path="/current" element={<Current />} />
//             <Route path="/familyDetails" element={<FamilyDetails />} />
//             <Route path="/experience" element={<Experience />} />
//             <Route path="/location" element={<Location />} />
//             <Route path="/National" element={<National />} />
//             <Route path="/Travel" element={<Travel />} />
//           </Routes>
//         </div>
//       </Router>
//     </EmployeeProvider>
//     {/* <div><Login/></div> */}
//     </>
//   );
// }

// export default App;

//localstorage and protected configuration
// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/AdminDashboard.js";
// import Dashboard from "./components/MainDashboard.js";
import Dashboard1 from "./components/Dashboard.js";
import Profile from "./components/PersonalInfo.js";
import Education from "./components/Education.js";
import Current from "./components/CurrentExperience.js";
import FamilyDetails from "./components/FamilyDetails.js";
import Experience from "./components/Experience.js";
import Location from "./components/Location.js";
import National from "./components/National.js";
import Travel from "./components/Travel.js";
import Navbar from "./components/MainNavbar";
import EmployeeProvider from "./components/EmployeeProvider";
import Login from "./components/Login.js";  
import ProtectedRoute from "./components/ProtectedRoute"; 
import AttendanceSheet from "./components/Attendence.js";
import Interview from "./components/onboarding/Interview.js";
import Onboarding from "./components/onboarding/Onboarding.js";
import AllEmployee from "./components/AllEmployees.js";
// import ProfileCreation from "./components/onboarding/  "
import ProfileCreation from './components/onboarding/interviewprofile';
import OrganizationCreation from "./components/Organizations.js";
import Department from "./components/Department.js";
import UserDashboard from "./components/UserDashboard.js";
import Careers from "./components/Careers.js";
import Holidays from "./components/Holidays"
import Project from "./components/Project.js";
import AssignmentCreation from "./components/Assignmentcreation.js";
function App() {
  return (
    <>
      <EmployeeProvider>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Login />} />

              {/* Protected routes require login */}
              {/* <Route path="/MainDashboard"element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/> */}
              <Route
                path="/dashboard/:employeeId" element={<Dashboard1 />}/>
                {/* path="/dashboard"element={ <ProtectedRoute><Dashboard1/></ProtectedRoute>}/> */}
              <Route
                path="/personalDetails/:employeeId"element={<Profile />}
              />
                <Route path="/familyDetails" element={<FamilyDetails />}  />
              <Route
                path="/personalDetails"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/educationDetails"
                element={
                  <ProtectedRoute>
                    <Education />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/current"
                element={
                  <ProtectedRoute>
                    <Current />
                  </ProtectedRoute>
                }
              />
            
              <Route
                path="/experience"
                element={
                  <ProtectedRoute>
                    <Experience />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/location"
                element={
                  <ProtectedRoute>
                    <Location />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/National"
                element={
                  <ProtectedRoute>
                    <National />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Travel"
                element={
                  <ProtectedRoute>
                    <Travel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/attendenceSheet"
                element={
                  <ProtectedRoute>
                    <AttendanceSheet  />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <Onboarding/>
                  </ProtectedRoute>
                }
              />
     
              <Route path="/AdminDashboard"element={<Dashboard/>}/>
               <Route path="/interview" element={<Interview/>} />
               <Route path="/onboardingDocuments" element={<Onboarding/>} />
               <Route path='/allEmployee' element={<AllEmployee/>}/>
               <Route path='/profilecreation' element={<ProfileCreation/>}/>
               <Route path='/createorganization' element={<OrganizationCreation/>}/>
               <Route path='/department' element={<Department/>}/>
               <Route path='/userdashboard' element={<UserDashboard />}/>
               <Route path='/careers' element={<Careers />}/>
               <Route path='/holidays/:employeeId' element={<Holidays />}/>
               <Route path="/attendenceSheet/:employeeId" element={ <AttendanceSheet  />}/>
               <Route path="/projects" element={ <Project/>}/>
               <Route path="/assignmentcreation" element={ <AssignmentCreation  />}/>
            </Routes>
          </div>
        </Router>
      </EmployeeProvider>
    </>
  );
}

export default App;
