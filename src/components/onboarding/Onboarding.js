  import { useState } from "react";
  import { validateOnboardingDocuments } from "./Onboardingvalidations";
  import {Link} from 'react-router-dom'
  // import interviewNav from "./InterviewNav"
  import {FaHome  } from 'react-icons/fa';
  const OnboardingDocuments = () => {
    const [formValues, setFormValues] = useState({
      aadharName: "",
      aadharNumber: "",
      panName: "",
      panNumber: "",
      panDocument: null,
      aadharDocument: null,
      higherEducationFile: null,
      intermediateFile: null,
      sscFile: null,
    });

    const [errors, setErrors] = useState({});
    

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      const regex = /^[a-zA-Z].*[\s]*$/;

      if (["aadharName", "panName", "panNumber"].includes(name)) {
        if (value === "" || regex.test(value)) {
          setFormValues({ ...formValues, [name]: value });
          setErrors({ ...errors, [name]: "" });
        } else {
          setErrors({
            ...errors,
            [name]: "Only characters, with space between words.",
          });
          return;
        }
      } else {
        setFormValues({ ...formValues, [name]: value });
      }
      setFormValues({ ...formValues, [name]: value });
    };

    const handleFileChange = (e) => {
      const { name, files } = e.target;
      setFormValues({ ...formValues, [name]: files[0] });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      const validationErrors = validateOnboardingDocuments(formValues);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        console.log("Form Submitted Successfully", formValues);
      } else {
        console.log("Form contains errors");
      }
    };

    return (
      <div className="container mx-auto w-auto text-center font-serif bg-gray-200 p-6">
      
        <div className="flex mb-4">
          {/* <button>
          <Link to='/interview'><span className="border border-black rounded-md ml-4 flex ">Previous Page</span></Link>  
          </button> */}
         <div className='flex items-center justify-start px-2 py-2 border-2 border-gray-800 rounded-md h-20 ml-[13rem] mb-5'>
          <FaHome className="text-black-500 mr-2" />
          <button><link to=''></link><span className="text font-semibold text-black-500">Home</span></button>
          <div className='flex items-center justify-center space-x-10 px-2 py-2 rounded-md w-full ml-3 mb-5 mt-5'>
          <Link to='/interview'><button><span className="text font-semibold text-black-500">Interview Details Section</span></button></Link>
          <Link to='/onboardingDocuments'><button><span className="text font-semibold text-black-500">Onboarding Documents Section</span></button></Link>
          <Link to='/allEmployee'><button><span className="text font-semibold text-black-500">Profile Creation</span></button></Link>
          <Link to='/payrollSection'> <button><span className="text font-semibold text-black-500">Pay Roll Section</span></button></Link>
          </div>
        </div>
        </div>
        <h2 className="text-xl font-serif mb-6  text-center underline">Onboarding-Documents-Section</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-9">
            <div className="bg-white text-black p-4 rounded-md">
              <h3 className="text-lg  bg-blue-950  text-white p-1 rounded-md font-semibold mb-4">
                Government ID
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-base">
                  <label className="mr-2 font-serif ">Person Name as per Aadhar</label>
                  <input
                    type="text"
                    name="aadharName"
                    value={formValues.aadharName}
                    onChange={handleInputChange}
                    className="input-field border border-gray-800 rounded-md"
                  />
                  {errors.aadharName && (
                    <p className="text-red-500">{errors.aadharName}</p>
                  )}
                </div>
                <div className="text-base">
                  <label className="mr-2 font-serif ">Aadhar Card Number</label>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formValues.aadharNumber}
                    onChange={handleInputChange}
                    className="input-field border border-gray-800 rounded-md"
                  />
                  {errors.aadharNumber && (
                    <p className="text-red-500">{errors.aadharNumber}</p>
                  )}
                </div>
                <div className="text-base">
                  <label className="mr-2 font-serif ">Document</label>
                  <input
                    type="file"
                    name="aadharDocument"
                    onChange={handleFileChange}
                    className="input-field rounded-md"
                  />
                  {errors.aadharDocument && (
                    <p className="text-red-500">{errors.aadharDocument}</p>
                  )}
                </div>

                <div className="text-base">
                  <label className="mr-2 font-serif ">Person Name as per PAN</label>
                  <input
                    type="text"
                    name="panName"
                    value={formValues.panName}
                    onChange={handleInputChange}
                    className="input-field border border-gray-800 rounded-md"
                  />
                  {errors.panName && (
                    <p className="text-red-500">{errors.panName}</p>
                  )}
                </div>
                <div className="text-base">
                  <label className="mr-2">PAN Card Number</label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formValues.panNumber}
                    onChange={handleInputChange}
                    className="input-field border border-gray-800 rounded-md"
                  />
                  {errors.panNumber && (
                    <p className="text-red-500">{errors.panNumber}</p>
                  )}
                </div>
                <div className="text-base">
                  <label className="mr-2">Document</label>
                  <input
                    type="file"
                    name="panDocument"
                    onChange={handleFileChange}
                    className="input-field rounded-md"
                  />
                  {errors.panDocument && (
                    <p className="text-red-500">{errors.panDocument}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white text-black p-4 rounded-md">
              <h3 className="text-lg bg-blue-950  text-white p-1 rounded-md font-semibold mb-4">
                Educational Documents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-base">
                  <label className="mr-2">Higher Education</label>
                  <input
                    type="file"
                    name="higherEducationFile"
                    onChange={handleFileChange}
                    className="input-field rounded-md"
                  />
                  {errors.higherEducationFile && (
                    <p className="text-red-500">{errors.higherEducationFile}</p>
                  )}
                </div>
                <div className="text-base">
                  <label className="mr-2">Intermediate / Diploma</label>
                  <input
                    type="file"
                    name="intermediateFile"
                    onChange={handleFileChange}
                    className="input-field rounded-md"
                  />
                  {errors.intermediateFile && (
                    <p className="text-red-500">{errors.intermediateFile}</p>
                  )}
                </div>
                <div className="text-base">
                  <label className="mr-2">SSC</label>
                  <input
                    type="file"
                    name="sscFile"
                    onChange={handleFileChange}
                    className="input-field rounded-md"
                  />
                  {errors.sscFile && (
                    <p className="text-red-500">{errors.sscFile}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white text-black p-3 rounded-md">
              <h3 className="text-lg bg-blue-950  text-white p-1 rounded-md font-semibold mb-4">
                Experience Certificates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="text-base">
                  <label className="mr-2">Experience Letters</label>
                  <input
                    type="file"
                    name="experienceLettersFile"
                    onChange={handleFileChange}
                    className="input-field p-1 rounded-md"
                  />
                </div>
                <div className="text-base">
                  <label className="mr-2">Course/Training Certifications</label>
                  <input
                    type="file"
                    name="courseCertificationsFile"
                    onChange={handleFileChange}
                    className="input-field p-1 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#00246B] mt-4 text-white p-1 rounded-md"
            >
              <span className="text-lg text-white p-1">Submit</span>
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default OnboardingDocuments;
