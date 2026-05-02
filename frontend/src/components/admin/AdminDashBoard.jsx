import { useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import AdminNav from "./AdminNav";
import { useParams } from "react-router-dom";
import AdminSide from "./AdminSide";
import StudentList from "./StudentList";
import TeacherList from "./TeacherList";
import Groups from "./groups";

const AdminDashBoard = () => {
  const { id } = useParams();
  const { admin, tabClick} = useApp();

  useEffect(() => {
    console.log(admin);
    console.log(id);
    fetchAdmin();
  }, [admin]);
  console.log("Admin: ", admin);

  const fetchAdmin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/fetchAdmin",
        { _id: id },
      );
      if (!response.data.success) {
        console.log(response.data.message);
      }
      console.log(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="flex bg-gray-950 min-h-screen">
        <AdminSide />
        <div className="flex-1 p-6 overflow-auto">
          {tabClick === "Students" && <StudentList />}
          {tabClick === "Profile" && (
            <div className="text-white text-2xl">Profile Tab</div>
          )}
          {tabClick === "Classrooms" && (
            <div className="text-white text-2xl">Classrooms Tab</div>
          )}
          {tabClick === "Teachers" && <TeacherList />}
          {tabClick === "Groups" && <Groups/>}
          {tabClick === "announcement" && (
            <div className="text-white text-2xl">Announcement and Events Tab</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
