import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { LessonRoutes } from "../modules/lession/lession.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/lesson",
    route: LessonRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
