import { User } from '../models/user.js'
import { errorMessages } from '../helpers/errorMessages.js';
import jwt from 'jsonwebtoken'
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js';

export const register = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })

        if (user) throw { code: 11000 };
        user = new User({ email, password })
        await user.save()

        // Generar el token con JWT

        return res.status(201).json({ ok: true })
    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            return res.status(400).json({ error: errorMessages.emailInUse })
        }

    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) return res.status(403).json({ error: errorMessages.emailNotRegistered })

        const passwordResponse = await user.comparePassword(password)
        if (!passwordResponse) {
            return res.status(400).json({ error: errorMessages.incorrectPassword })
        }
        // Generar el token con JWT
        const { token, expiresIn } = generateToken(user.id)
        generateRefreshToken(user.id, res)

        return res.json({ token, expiresIn })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: errorMessages.serverError })
    }
};

export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        return res.json({ email: user.email, uid: user._id })
    } catch (error) {
        return res.status(500).json({ error: errorMessages.serverError })
    }
}

export const refreshToken = (req, res) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken
        if (!refreshTokenCookie) throw new Error(errorMessages.errorToken)
        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH)
        const { token, expiresIn } = generateToken(uid)
        return res.json({token, expiresIn});
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: error.message })
    }
}

export const logOut = (req, res) => {
    try {
        res.clearCookie('refreshToken')
        return res.json({ok : true})

    } catch (error) {
        console.log(error)
    }}