import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../config";
import prisma from "../shared/prisma";

export const seedAdmin = async () => {
  try {
    const isExistAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.ADMIN,
      },
    });

    if (isExistAdmin) {
      console.log("Admin is already exist!!");
      return;
    }

    const hashPassword = await bcrypt.hash(config.admin.adminPassword!, 10);

    const newUser = await prisma.user.create({
      data: {
        email: config.admin.adminEmail!,
        password: hashPassword,
        role: UserRole.ADMIN,
        name: "Mahin Khan",
        photo: "",
      },
    });

    console.log("Admin created successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};
