import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/admin/get-groups",
      );

      console.log("Full Response:", response.data);
      console.log("groupsData:", response.data.groupsData);

      if (response.data.success) {
        const groupsData = response.data.groupsData || [];
        console.log("Setting groups to:", groupsData);
        setGroups(groupsData);
        setError(null);
      } else {
        setError(response.data.message || "Failed to fetch groups");
        toast.error(response.data.message);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error fetching groups";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching groups:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter groups based on search term
  const filteredGroups = groups.filter(
    (group) =>
      group.chatName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.createdBy?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="text-white mt-4">Loading groups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-4">
          Groups Management
        </h2>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by group name or creator..."
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Stats */}
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <p className="text-gray-300">
            Total Groups:{" "}
            <span className="text-blue-400 font-bold">{groups.length}</span> |
            Filtered Results:{" "}
            <span className="text-green-400 font-bold">
              {filteredGroups.length}
            </span>
          </p>
        </div>

        {/* Debug Info */}
        <div className="bg-yellow-900 border border-yellow-700 text-yellow-200 px-4 py-2 rounded mb-4 text-sm">
          <p>Groups Array Length: {groups.length}</p>
          <p>Groups Type: {typeof groups}</p>
          <p>Is Array: {Array.isArray(groups) ? "Yes" : "No"}</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Groups Table */}
      {filteredGroups.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 border-b-2 border-gray-700">
                <th className="px-4 py-3 text-left text-white font-semibold">
                  #
                </th>
                <th className="px-4 py-3 text-left text-white font-semibold">
                  Group Name
                </th>
                <th className="px-4 py-3 text-left text-white font-semibold">
                  Created By
                </th>
                <th className="px-4 py-3 text-left text-white font-semibold">
                  Members Count
                </th>
                <th className="px-4 py-3 text-left text-white font-semibold">
                  Admins Count
                </th>
                <th className="px-4 py-3 text-left text-white font-semibold">
                  Created At
                </th>
                <th className="px-4 py-3 text-left text-white font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredGroups.map((group, index) => (
                <tr
                  key={group._id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition duration-200"
                >
                  <td className="px-4 py-3 text-gray-300">{index + 1}</td>
                  <td className="px-4 py-3 text-white font-medium">
                    {group.chatName || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {group.createdBy?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {group.members?.length || 0}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {group.admins?.length || 0}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {group.createdAt
                      ? new Date(group.createdAt).toLocaleDateString()
                      : "N/A"}
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
              ? "No groups found matching your search."
              : "No groups available."}
          </p>
        </div>
      )}
    </div>
  );
}
