import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router()

router.get('/home', authRequired, (req,res) => res.send('Bienvenido a la App'))

export default router