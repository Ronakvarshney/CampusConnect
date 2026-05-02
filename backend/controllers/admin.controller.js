import AdminModel from "../models/admin.models.js";
import StudentModel from "../models/student.models.js";
import TeacherModel from "../models/teacher.models.js";
import ChatModel from "../models/chat.model.js";

// for getting the whole data of the student
export const getAllStudentData = async (req, res) => {
  try {
    const studentList = await StudentModel.find().countDocuments();
    const studentListData = await StudentModel.find();
    if (!studentList)
      return res
        .status(404)
        .json({ success: false, message: "Error in getting the student list" });

    return res.status(201).json({
      success: true,
      message: "student is fethced",
      studentList: studentList,
      studentData: studentListData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error caught in the catch block" });
  }
};

// for getting all teachers data
export const getAllTeacherData = async (req, res) => {
  try {
    const teacherList = await TeacherModel.find().countDocuments();
    const teacherListData = await TeacherModel.find();
    if (!teacherList)
      return res
        .status(404)
        .json({ success: false, message: "Error in getting the teacher list" });

    return res.status(201).json({
      success: true,
      message: "teacher is fetched",
      teacherList: teacherList,
      teacherData: teacherListData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error caught in the catch block" });
  }
};

// for getting all groups data
export const getAllGroupsData = async (req, res) => {
  try {
    const groupsList = await ChatModel.find({ isGroupChat: true })
      .populate("createdBy", "name email")
      .populate("members", "name email")
      .populate("admins", "name email");

    const groupsCount = await ChatModel.countDocuments({ isGroupChat: true });

    if (!groupsList)
      return res
        .status(404)
        .json({ success: false, message: "Error in getting the groups list" });

    return res.status(201).json({
      success: true,
      message: "groups fetched",
      groupsCount: groupsCount,
      groupsData: groupsList,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error caught in the catch block" });
  }
};

export const fetchAdmin = async (req, res) => {
  try {
    const { _id } = req.body;

    console.log("Id is Here", _id);
    if (!_id) {
      res
        .status(400)
        .json({ success: false, message: "Missing Required field" });
    }

    const admin = await AdminModel.findById(_id);
    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Error i fetching the admin" });
    return res.status(201).json({ success: true, data: admin });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error caught in the catch block" });
  }
};
