import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/admin/get-students"
      );

      if (response.data.success) {
        setStudents(response.data.studentData || []);
        setError(null);
      } else {
        setError(response.data.message || "Failed to fetch students");
        toast.error(response.data.message);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error fetching students";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="text-white mt-4">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ✅ Wrapper added */}
      <div className="student-wrapper w-full bg-gray-900 rounded-lg">

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            Student Management
          </h2>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name, roll number, or email..."
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Stats */}
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <p className="text-gray-300">
              Total Students:{" "}
              <span className="text-blue-400 font-bold">{students.length}</span> |
              Filtered Results:{" "}
              <span className="text-green-400 font-bold">
                {filteredStudents.length}
              </span>
            </p>
          </div>

          {/* Debug */}
          <div className="bg-yellow-900 border border-yellow-700 text-yellow-200 px-4 py-2 rounded mb-4 text-sm">
            <p>Students Array Length: {students.length}</p>
            <p>Students Type: {typeof students}</p>
            <p>Is Array: {Array.isArray(students) ? "Yes" : "No"}</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Table */}
        {filteredStudents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800 border-b-2 border-gray-700">
                  <th className="px-4 py-3 text-left text-white font-semibold">#</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Roll</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Contact</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">College</th>
                  <th className="px-4 py-3 text-left text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student._id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition duration-200"
                  >
                    <td className="px-4 py-3 text-gray-300">{index + 1}</td>
                    <td className="px-4 py-3 text-white">{student.name || "N/A"}</td>
                    <td className="px-4 py-3 text-gray-300">{student.rollno || "N/A"}</td>
                    <td className="px-4 py-3 text-gray-300">{student.email || "N/A"}</td>
                    <td className="px-4 py-3 text-gray-300">{student.contactno || "N/A"}</td>
                    <td className="px-4 py-3 text-gray-300">{student.college || "N/A"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded">
                          View
                        </button>
                        <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded">
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
                ? "No students found matching your search."
                : "No students available."}
            </p>
          </div>
        )}
      </div>
      <style>{`
        .student-wrapper {
          padding: 40px !important;
        }
      `}</style>
    </>
  );
}