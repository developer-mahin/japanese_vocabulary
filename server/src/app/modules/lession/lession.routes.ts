import { Router } from "express";
import { LessonController } from "./lession.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/create-lesson",
  auth(UserRole.ADMIN),
  LessonController.createLesson
);

router.get("/all-lessons", LessonController.getAllLessons);
router.get(
  "/my-lessons",
  auth(UserRole.ADMIN),
  LessonController.getALlMyLessons
);

router.get("/single-lesson/:id", LessonController.getSingleLesson);
router.patch(
  "/update-lesson/:id",
  auth(UserRole.ADMIN),
  LessonController.updateLesson
);
router.delete(
  "/delete-lesson/:id",
  auth(UserRole.ADMIN),
  LessonController.deleteLesson
);

export const LessonRoutes = router;
