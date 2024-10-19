import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa'; // Importing FontAwesome Home icon
import axios from 'axios'; // Importing axios to handle API requests

const JobForm = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  const toggleForm = () => {
   
    setShowForm(!showForm); // Toggle form visibility
  };

  const handleSubmit = async (e) => {
    window.location.reload();
    e.preventDefault();
    try {
      // Make the POST request to your API
      const response = await axios.post('https://asignment-cuvvet.onrender.com/api/auth/createinterview', {
        jobTitle,
        jobDescription,
        experienceLevel,
        candidateEmail,
        endDate,
      });
      console.log('Response:', response.data);

      // Reset form fields after successful submission
      setJobTitle('');
      setJobDescription('');
      setExperienceLevel('');
      setCandidateEmail('');
      setEndDate('');

      alert('Job created and interview email sent successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to create job and send email');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Icon and Button at the top left */}
      <div className="flex items-center p-4">
        {/* Home Icon */}
        <FaHome className="text-xl text-gray-700 mr-4" />

        {/* Vertical line between icon and button */}
        <div className="h-8 border-r border-gray-400"></div>

        {/* Button to toggle form */}
        <button
          onClick={toggleForm}
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none"
        >
          {showForm ? 'Home' : 'Create Interview'}
        </button>
      </div>

      {/* Form appears only if showForm is true */}
      {showForm && (
        <form
          className="w-2/3 p-8 border-2 border-gray-300 rounded-md mt-4 ml-4"
          onSubmit={handleSubmit} // Handling form submission
        >
          {/* Job Title */}
          <div className="flex items-center mb-4">
            <label htmlFor="jobTitle" className="w-1/4 text-xl font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter Job Title"
              className="w-3/4 border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Job Description */}
          <div className="flex items-center mb-4">
            <label htmlFor="jobDescription" className="w-1/4 text-lg font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Enter Job Description"
              className="w-3/4 border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 h-24"
              required
            />
          </div>

          {/* Experience Level */}
          <div className="flex items-center mb-4">
            <label htmlFor="experienceLevel" className="w-1/4 text-lg font-medium text-gray-700">
              Experience Level
            </label>
            <select
              id="experienceLevel"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-3/4 border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Experience Level</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          {/* Add Candidate */}
          <div className="flex items-center mb-4">
            <label htmlFor="candidate" className="w-1/4 text-lg font-medium text-gray-700">
              Add Candidate
            </label>
            <input
              type="email"
              id="candidate"
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              placeholder="xyz@gmail.com"
              className="w-3/4 border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* End Date */}
          <div className="flex items-center mb-4">
            <label htmlFor="endDate" className="w-1/4 text-lg font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-3/4 border-2 border-gray-300 rounded-2xl px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none"
            >
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default JobForm;
