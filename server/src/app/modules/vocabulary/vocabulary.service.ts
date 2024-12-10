import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../Helpers/jwtHealpers";
import prisma from "../../../shared/prisma";
import { TVocabulary } from "./vocabulary.interface";

const createVocabulary = async (payload: TVocabulary, token: string) => {
  const user = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret);

  const result = await prisma.vocabulary.create({
    data: {
      word: payload.word,
      pronunciation: payload.pronunciation,
      meaning: payload.meaning,
      whenToSay: payload.whenToSay,
      lessonId: payload.lessonId,
      userId: user.id,
    },
  });
  return result;
};

const getAllVocabularies = async () => {
  const result = await prisma.vocabulary.findMany({});
  return result;
};

const getMyVocabularies = async (token: string) => {
  const user = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret);
  const result = await prisma.vocabulary.findMany({
    where: {
      userId: user.id,
    },
  });
  return result;
};

const getSingleVocabulary = async (id: string) => {
  const result = await prisma.vocabulary.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};

const updateVocabulary = async (
  id: string,
  token: string,
  payload: Partial<TVocabulary>
) => {
  const user = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret);
  const vocabulary = await prisma.vocabulary.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (user.id !== vocabulary.userId) {
    throw new Error("You are not authorized");
  }

  const result = await prisma.vocabulary.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteVocabulary = async (id: string, token: string) => {
  const user = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret);
  const vocabulary = await prisma.vocabulary.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (user.id !== vocabulary.userId) {
    throw new Error("You are not authorized");
  }

  const result = await prisma.vocabulary.delete({
    where: {
      id,
    },
  });
  return result;
};

export const VocabularyServices = {
  createVocabulary,
  getAllVocabularies,
  getMyVocabularies,
  getSingleVocabulary,
  updateVocabulary,
  deleteVocabulary,
};
