import { Router } from "express";
import { register, login, logout, profile, verifyToken } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/",validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/verifyToken", verifyToken);

router.get("/profile", authRequired, profile);

export default router;