import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const {name, lastname, email, admin, password} = req.body

    try {

        const userFound = await User.findOne({email});
        if (userFound) return res.status(400).json(["El email ya esta registrado."])

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            lastname,
            email,
            admin,
            password: passwordHash})

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });        
        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            name: userSaved.name,
            lastname: userSaved.lastname,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};

export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado." });

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json({ message: "Credenciales Inválidas." });

        const token = await createAccessToken({ id: userFound._id });        
        res.cookie("token", token);
        res.json({
            id: userFound._id,
            name: userFound.name,
            lastname: userFound.lastname,
            email: userFound.email,
            admin: userFound.admin,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200).json({ message: "OK"});
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if(!userFound) return res.status(400).json({ message: "Usuario no encontrado."})

    return res.json({
        id: userFound._id,
        name: userFound.name,
        lastname: userFound.lastname,
        admin: userFound.admin,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if (!token) return res.status(401).json({message: 'No estas autorizado.'})

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'No estas autorizado.'})

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: 'No estas autorizado.'})

        return res.json({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            admin: userFound.admin
        });
    });
};