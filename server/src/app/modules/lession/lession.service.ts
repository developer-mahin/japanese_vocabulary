import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../Helpers/jwtHealpers";
import prisma from "../../../shared/prisma";
import config from "../../../config";

const createLesson = async (token: string, payload: { lessonName: string }) => {
  const user = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret);

  const generateLessonNumber = async () => {
    const lesson = await prisma.lesson.findMany({
      where: {
        userId: user.id,
      },
    });
    const lessonNumber = lesson.length + 1;
    return lessonNumber;
  };

  const result = await prisma.lesson.create({
    data: {
      lessonName: payload.lessonName,
      lessonNumber: await generateLessonNumber(),
      userId: user.id,
    },
  });
  return result;
};

const getAllLessons = async () => {
  return await prisma.lesson.findMany();
};

const getALlMyLessons = async (token: string) => {
  const user = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret);
  return await prisma.lesson.findMany({
    where: {
      userId: user.id,
    },
  });
};

const getSingleLesson = async (id: string) => {
  const result = await prisma.lesson.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (!result) {
    throw new Error("Lesson not found!");
  }

  return result;
};

const updateLesson = async (
  token: string,
  id: string,
  payload: { lessonName: string }
) => {
  const lesson = await prisma.lesson.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (!lesson) {
    throw new Error("Lesson not found!");
  }

  const user = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret);

  if (user.id !== lesson.userId) {
    throw new Error("You are not authorized!");
  }

  return await prisma.lesson.update({
    where: {
      id,
    },
    data: {
      lessonName: payload.lessonName,
    },
  });
};

const deleteLesson = async (token: string, id: string) => {
  const lesson = await prisma.lesson.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (!lesson) {
    throw new Error("Lesson not found!");
  }

  const user = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret);

  if (user.id !== lesson.userId) {
    throw new Error("You are not authorized!");
  }

  return await prisma.lesson.delete({
    where: {
      id,
    },
  });
};

export const LessonServices = {
  createLesson,
  getAllLessons,
  getALlMyLessons,
  getSingleLesson,
  updateLesson,
  deleteLesson,
};
