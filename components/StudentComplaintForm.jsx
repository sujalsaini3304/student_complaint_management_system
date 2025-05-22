import React, { useState } from "react";
import axios from "axios";
import SuccessMessage from "./SuccessMessage";

const StudentComplaintForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    title: "",
    description: "",
    file: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    setUploadProgress(0);

    const data = new FormData();
    data.append("fullname", formData.fullName);
    data.append("email", formData.email);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("file", formData.file);

    try {
      const response = await axios.post(
        "https://python-server-pearl.vercel.app/api/register/complaint/student",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );

      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        title: "",
        description: "",
        file: null,
      });
    } catch (err) {
      const message = err.response?.data?.Message || "Something went wrong.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      {submitted ? (
        <SuccessMessage />
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Student Complaint Dashboard
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isSubmitting}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={isSubmitting}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                disabled={isSubmitting}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload File
              </label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                disabled={isSubmitting}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
                required
              />
            </div>

            {isSubmitting && (
              <div className="mb-4">
                <div className="h-3 bg-blue-100 rounded">
                  <div
                    className="h-full bg-blue-600 rounded transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-blue-700 mt-1 text-center">
                  {uploadProgress}%
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white py-2 px-4 rounded-lg transition-colors ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default StudentComplaintForm;
