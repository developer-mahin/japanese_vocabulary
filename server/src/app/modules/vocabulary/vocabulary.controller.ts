import httpStatus from "http-status";
import AppError from "../../../shared/AppError";
import catchAsync from "../../../shared/catchAsync";
import { VocabularyServices } from "./vocabulary.service";
import sendResponse from "../../../shared/sendResponse";

const createVocabulary = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, "Your are not authorized");
  }

  const result = await VocabularyServices.createVocabulary(req.body, token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vocabulary created successfully!",
    data: result,
  });
});

const getAllVocabularies = catchAsync(async (req, res) => {
  const result = await VocabularyServices.getAllVocabularies();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vocabularies fetched successfully!",
    data: result,
  });
});

const getSingleVocabulary = catchAsync(async (req, res) => {
  const result = await VocabularyServices.getSingleVocabulary(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vocabulary fetched successfully!",
    data: result,
  });
});

const getMyVocabularies = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, "Your are not authorized");
  }
  const result = await VocabularyServices.getMyVocabularies(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vocabularies fetched successfully!",
    data: result,
  });
});

const updateVocabulary = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, "Your are not authorized");
  }
  const result = await VocabularyServices.updateVocabulary(
    token,
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vocabulary updated successfully!",
    data: result,
  });
});

const deleteVocabulary = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, "Your are not authorized");
  }
  const result = await VocabularyServices.deleteVocabulary(
    token,
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vocabulary deleted successfully!",
    data: result,
  });
});

export const VocabularyController = {
  createVocabulary,
  getAllVocabularies,
  getSingleVocabulary,
  getMyVocabularies,
  updateVocabulary,
  deleteVocabulary,
};
