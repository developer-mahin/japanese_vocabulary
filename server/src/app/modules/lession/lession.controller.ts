import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { LessonServices } from "./lession.service";
import catchAsync from "../../../shared/catchAsync";
import AppError from "../../../shared/AppError";

const createLesson = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, "Your are not authorized");
  }

  const result = await LessonServices.createLesson(token, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson created successfully!",
    data: result,
  });
});

const getAllLessons = catchAsync(async (req, res) => {
  const result = await LessonServices.getAllLessons();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lessons fetched successfully!",
    data: result,
  });
});

const getALlMyLessons = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, "Your are not authorized");
  }

  const result = await LessonServices.getALlMyLessons(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lessons fetched successfully!",
    data: result,
  });
});

const getSingleLesson = catchAsync(async (req, res) => {
  const result = await LessonServices.getSingleLesson(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson fetched successfully!",
    data: result,
  });
});

const updateLesson = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, "Your are not authorized");
  }
  const result = await LessonServices.updateLesson(
    token,
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson updated successfully!",
    data: result,
  });
});

const deleteLesson = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, "Your are not authorized");
  }
  const result = await LessonServices.deleteLesson(token, req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson deleted successfully!",
    data: result,
  });
});

export const LessonController = {
  createLesson,
  getAllLessons,
  getALlMyLessons,
  getSingleLesson,
  updateLesson,
  deleteLesson,
};
