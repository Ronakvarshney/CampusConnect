import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/admin/get-teachers",
      );

      console.log("Full Response:", response.data);
      console.log("teacherData:", response.data.teacherData);

      if (response.data.success) {
        const teacherData = response.data.teacherData || [];
        console.log("Setting teachers to:", teacherData);
        setTeachers(teacherData);
        setError(null);
      } else {
        setError(response.data.message || "Failed to fetch teachers");
        toast.error(response.data.message);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error fetching teachers";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching teachers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.teacher_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="text-white mt-4">Loading teachers...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-gray-900 p-6 rounded-lg teacher-wrapper">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            Teacher Management
          </h2>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name, teacher ID, or email..."
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Stats */}
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <p className="text-gray-300">
              Total Teachers:{" "}
              <span className="text-blue-400 font-bold">{teachers.length}</span>{" "}
              | Filtered Results:{" "}
              <span className="text-green-400 font-bold">
                {filteredTeachers.length}
              </span>
            </p>
          </div>

          {/* Debug Info */}
          <div className="bg-yellow-900 border border-yellow-700 text-yellow-200 px-4 py-2 rounded mb-4 text-sm">
            <p>Teachers Array Length: {teachers.length}</p>
            <p>Teachers Type: {typeof teachers}</p>
            <p>Is Array: {Array.isArray(teachers) ? "Yes" : "No"}</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Teachers Table */}
        {filteredTeachers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800 border-b-2 border-gray-700">
                  <th className="px-4 py-3 text-left text-white font-semibold">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-white font-semibold">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-white font-semibold">
                    Teacher ID
                  </th>
                  <th className="px-4 py-3 text-left text-white font-semibold">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-white font-semibold">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-white font-semibold">
                    Designation
                  </th>
                  <th className="px-4 py-3 text-left text-white font-semibold">
                    Qualification
                  </th>
                  <th className="px-4 py-3 text-left text-white font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((teacher, index) => (
                  <tr
                    key={teacher._id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition duration-200"
                  >
                    <td className="px-4 py-3 text-gray-300">{index + 1}</td>
                    <td className="px-4 py-3 text-white font-medium">
                      {teacher.name || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {teacher.teacher_id || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {teacher.email || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {teacher.contactno || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {teacher.designation || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {teacher.qualification || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition duration-200">
                          View
                        </button>
                        <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition duration-200">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {searchTerm
                ? "No teachers found matching your search."
                : "No teachers available."}
            </p>
          </div>
        )}
      </div>
      <style>{`
        .teacher-wrapper {
          padding: 40px !important;
        }
      `}</style>
    </>
  );
}
