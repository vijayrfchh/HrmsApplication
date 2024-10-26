import { useState, useEffect } from "react";
import { AiTwotoneHome, AiOutlinePlus, AiOutlineDownload } from "react-icons/ai";
import { MdExpandMore, MdExpandLess, MdEdit, MdDelete, MdCancel } from "react-icons/md";
import EditCareerPopup from "./CareerPop";
import axiosInstance from "./axiosConfig";

function Career() {
  // State variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [careers, setCareers] = useState([]); // Current page's job posts
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const jobsPerPage = 6;

  // Get user role from localStorage to restrict functionality
  const userRole = localStorage.getItem("UserRole");

  // Fetch job posts when the component mounts or currentPage changes
  useEffect(() => {
    fetchJobPosts();
  }, [currentPage]);

  // Function to fetch job posts based on currentPage and jobsPerPage
  const fetchJobPosts = async () => {
    try {
      const response = await axiosInstance.get(
        `hrmsapplication/carrers/getJobPosts?pageNumber=${currentPage - 1}&size=${jobsPerPage}`
      );

      if (response.data.jobList && Array.isArray(response.data.jobList)) {
        const jobPosts = response.data.jobList.map((post) => ({
          jobId: post.jobId,
          jobTitle: post.jobTitle,
          status: post.status,
          publishDate: post.publishDate,
          expiryDate: post.expiryDate,
          jobLocation: null,
          experienceYear: null,
          experienceMonth: null,
          workMode: null,
          noOfRequirements: null,
          salaryFrom: null,
          salaryTo: null,
          jobType: null,
          skillSet: null,
          age: null,
          jobDescription: null,
        }));

        setCareers(jobPosts);

        if (response.data.totalPages) {
          setTotalPages(response.data.totalPages);
        } else if (response.data.totalJobs) {
          setTotalPages(Math.ceil(response.data.totalJobs / jobsPerPage));
        } else {
          if (response.data.jobList.length === jobsPerPage) {
            setTotalPages(currentPage + 1);
          } else {
            setTotalPages(currentPage);
          }
        }
      } else {
        console.error("Expected an array in jobList but got:", response.data.jobList);
      }
    } catch (error) {
      console.error("Error fetching job posts:", error);
    }
  };

  // Handler to open the Add/Edit modal
  const handleAddClick = () => {
    if (userRole === "ROLE_ADMIN") {
      setIsModalOpen(true);
      setSelectedCareer(null);
    }
  };

  // Handler to save career data (add or edit)
  const handleSaveCareer = async (careerData) => {
    if (selectedCareer !== null) {
      try {
        await axiosInstance.patch(`hrmsapplication/carrers/update`, careerData, {
          params: { jobId: careerData.jobId },
        });

        const updatedCareers = careers.map((career) =>
          career.jobId === careerData.jobId ? careerData : career
        );
        setCareers(updatedCareers);

        alert(`Job "${careerData.jobTitle}" has been successfully updated.`);
      } catch (error) {
        console.error("Error updating the job:", error);
        alert("Failed to update the job. Please try again.");
      }
    } else {
      try {
        const response = await axiosInstance.post(`hrmsapplication/carrers/create`, careerData);

        setCareers([...careers, response.data]);

        alert(`Job "${careerData.jobTitle}" has been successfully added.`);
      } catch (error) {
        console.error("Error adding the job:", error);
        alert("Failed to add the job. Please try again.");
      }
    }

    setIsModalOpen(false);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to toggle the expansion of a card
  const toggleExpandCard = async (index) => {
    if (expandedCardIndex === index) {
      setExpandedCardIndex(null);
      return;
    }

    setExpandedCardIndex(index);

    const job = careers[index];
    if (!job.jobLocation) {
      try {
        const response = await axiosInstance.get(`hrmsapplication/carrers/${job.jobId}`);

        const detailedJob = response.data;

        const updatedCareers = [...careers];
        updatedCareers[index] = {
          ...updatedCareers[index],
          jobLocation: detailedJob.jobLocation,
          numberOfYears: detailedJob.numberOfYears,
          numberOfMonths: detailedJob.numberOfMonths,
          workMode: detailedJob.workMode,
          noOfRequirements: detailedJob.noOfRequirements,
          salaryFrom: detailedJob.salaryFrom,
          salaryTo: detailedJob.salaryTo,
          jobType: detailedJob.jobType,
          skillSet: detailedJob.skillSet,
          age: detailedJob.age,
          jobDescription: detailedJob.jobDescription,
        };

        setCareers(updatedCareers);
      } catch (error) {
        console.error("Error fetching job details:", error);
        alert("Failed to fetch job details. Please try again later.");
      }
    }
  };

  // Handler to open the Edit modal with selected career
  const handleEditClick = (career) => {
    if (userRole === "ROLE_ADMIN") {
      setSelectedCareer(career);
      setIsModalOpen(true);
    }
  };

  // Handler to delete a career
  const handleDeleteClick = async (career) => {
    if (userRole === "ROLE_ADMIN") {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete the job "${career.jobTitle}"?`
      );
      if (!confirmDelete) return;

      try {
        await axiosInstance.delete(`hrmsapplication/carrers/deletecareers/${career.jobId}`);

        const updatedCareers = careers.filter((c) => c.jobId !== career.jobId);
        setCareers(updatedCareers);

        const newTotalPages = Math.ceil(updatedCareers.length / jobsPerPage) || 1;
        if (currentPage > newTotalPages) {
          setCurrentPage(newTotalPages);
        }

        alert(`Job "${career.jobTitle}" has been successfully deleted.`);
      } catch (error) {
        console.error("Error deleting job post:", error);
        alert("Failed to delete the job post. Please try again.");
      }
    }
  };

  // Handler to cancel a job by updating its status to 'cancelled'
  const handleCancelJob = async (career) => {
    if (userRole === "ROLE_ADMIN") {
      const confirmCancel = window.confirm(
        `Are you sure you want to cancel the job "${career.jobTitle}"?`
      );
      if (!confirmCancel) return;

      try {
        await axiosInstance.patch(`hrmsapplication/carrers/updateStatus?`, null, {
          params: {
            jobId: career.jobId,
            status: "cancelled",
          },
        });

        const updatedCareers = careers.map((c) =>
          c.jobId === career.jobId ? { ...c, status: "cancelled" } : c
        );
        setCareers(updatedCareers);

        alert(`Job "${career.jobTitle}" has been successfully cancelled.`);
      } catch (error) {
        console.error("Error cancelling the job:", error);
        alert("Failed to cancel the job. Please try again.");
      }
    }
  };

  // Handler for pagination button clicks
  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate an array of page numbers for pagination controls
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-8">
      {/* Only display Add button for admin users */}
      {userRole === "ROLE_ADMIN" && (
        <button
          className="mb-4 bg-blue-600 text-white p-2 rounded shadow-md hover:bg-blue-700 transition duration-300"
          onClick={handleAddClick}
        >
          <AiOutlinePlus className="inline-block mr-2" /> Add Career
        </button>
      )}

      {/* Job Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careers.map((career, index) => (
          <div
            key={career.jobId}
            className="bg-white p-4 rounded shadow-md hover:shadow-lg transition duration-300 relative"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">{career.jobTitle}</h3>
              <div>
                {/* Edit, Delete, Cancel buttons only for admin users */}
                {userRole === "ROLE_ADMIN" && (
                  <>
                    <button className="text-blue-600 mr-2" onClick={() => handleEditClick(career)}>
                      <MdEdit size={24} />
                    </button>
                    <button className="text-red-600 mr-2" onClick={() => handleDeleteClick(career)}>
                      <MdDelete size={24} />
                    </button>
                    <button
                      className="text-yellow-600"
                      onClick={() => handleCancelJob(career)}
                    >
                      <MdCancel size={24} />
                    </button>
                  </>
                )}
              </div>
            </div>
            <p className="text-gray-600 mb-2">
              Status:{" "}
              <span className={career.status === "cancelled" ? "text-red-500" : "text-green-500"}>
                {career.status}
              </span>
            </p>
            <p className="text-gray-600 mb-2">Published Date: {career.publishDate}</p>
            <p className="text-gray-600 mb-2">Expiry Date: {career.expiryDate}</p>

            {/* Expand/Collapse Button */}
            <button
              className="text-blue-600 mt-4"
              onClick={() => toggleExpandCard(index)}
            >
              {expandedCardIndex === index ? (
                <>
                  <MdExpandLess size={24} className="inline-block mr-2" /> Hide Details
                </>
              ) : (
                <>
                  <MdExpandMore size={24} className="inline-block mr-2" /> Show Details
                </>
              )}
            </button>

            {/* Expanded details */}
            {expandedCardIndex === index && (
              <div className="mt-4 text-gray-600">
                <p>Location: {career.jobLocation}</p>
                <p>
                  Experience: {career.experienceYear} years, {career.experienceMonth} months
                </p>
                <p>Work Mode: {career.workMode}</p>
                <p>Number of Requirements: {career.noOfRequirements}</p>
                <p>Salary: {career.salaryFrom} to {career.salaryTo}</p>
                <p>Job Type: {career.jobType}</p>
                <p>Skill Set: {career.skillSet}</p>
                <p>Age: {career.age}</p>
                <p>Description: {career.jobDescription}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="mt-8 flex justify-center space-x-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`px-4 py-2 border ${number === currentPage ? "bg-blue-600 text-white" : "bg-white text-blue-600"} hover:bg-blue-500 hover:text-white transition duration-300`}
            onClick={() => handlePageClick(number)}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Add/Edit Career modal */}
      {isModalOpen && (
        <EditCareerPopup
          career={selectedCareer}
          onSave={handleSaveCareer}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Career;
