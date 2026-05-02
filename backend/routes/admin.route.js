import express from "express";
import {
  getAllStudentData,
  getAllTeacherData,
  getAllGroupsData,
  fetchAdmin,
} from "../controllers/admin.controller.js";
const adminRoute = express.Router();

adminRoute.get("/get-students", getAllStudentData);
adminRoute.get("/get-teachers", getAllTeacherData);
adminRoute.get("/get-groups", getAllGroupsData);
adminRoute.post("/fetchAdmin", fetchAdmin);

export default adminRoute;
