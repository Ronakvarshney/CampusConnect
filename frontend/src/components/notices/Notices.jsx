import React, { useEffect, useState } from "react";
import "./Notices.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Notices = () => {
  const [Notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storeduser = localStorage.getItem("user");
  const userrole = storeduser ? JSON.parse(storeduser).role : undefined;

  useEffect(() => {
    const FetchNotices = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching notices...");
        const res = await axios.get("http://localhost:5000/api/notices/all", {
          withCredentials: true,
        });
        console.log("API Response:", res.data);

        if (res.data.success) {
          setNotices(res.data.notices || []);
          console.log("Notices fetched successfully:", res.data.notices);
          if (!res.data.notices || res.data.notices.length === 0) {
            toast.info("No notices available");
          }
        } else {
          setError(res.data.message || "Failed to fetch notices");
          toast.error(res.data.message || "Failed to fetch notices");
        }
      } catch (error) {
        console.error("API Error:", error);
        const errorMsg =
          error.response?.data?.message ||
          error.message ||
          "Error fetching notices";
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    FetchNotices();
  }, []);

  const DeleteHandler = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/deletenotice",
        { _id: id },
        { withCredentials: true },
      );
      console.log(res.data);
      if (res.data.success) {
        toast.success("Notice Deleted Successfully");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("notices", Notices);
  return (
    <div className="notices-container">
      <h2 className="notices-heading">📢 Latest Notices</h2>

      {loading ? (
        <p className="loading-message">Loading notices...</p>
      ) : error ? (
        <p className="error-message">⚠️ {error}</p>
      ) : Notices.length === 0 ? (
        <p className="no-notices-message">No notices available yet.</p>
      ) : (
        <div className="notices-list">
          {Notices?.map((notice, index) => (
            <div key={notice._id || index} className="notice-card">
              <h3 className="notice-title">{notice.title}</h3>
              <p className="notice-description">{notice.description}</p>
              <div className="notice-footer">
                <span>👨‍💼Author -:  {notice.author}</span>
                <span>🎯Students -:  {notice.targetAudience}</span>
                <span>🗓️ {new Date(notice.createdAt).toDateString()}</span>
              </div>
              {userrole == "admin" && (
                <div>
                  <button
                    className="delete-button"
                    onClick={() => DeleteHandler(notice._id)}
                  >
                    Delete Notice
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Notices;
