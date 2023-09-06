import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
export const authRequired = (req, res, next) => {

    const {token} = req.cookies;

    if (!token) return res.status(401).json({ message: "No estas logueado, por favor inicia sesión."});

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: "Autorización vencida, por favor inicia sesión."});

        req.user = user
    })

    next()
}