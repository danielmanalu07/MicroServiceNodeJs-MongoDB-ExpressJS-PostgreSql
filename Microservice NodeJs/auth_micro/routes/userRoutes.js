import { Router } from "express";
import UserController from "../controller/UserController.js";
const router = Router();

router.get("/getUSer/:id", UserController.getUser);
router.post("/getUsers", UserController.geUsers);

export default router