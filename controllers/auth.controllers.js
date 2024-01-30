import { User } from '../models/user.js'
import { errorMessages } from '../helpers/errorMessages.js';
import jwt from 'jsonwebtoken'

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
        if (!passwordResponse){ 
            return res.status(403).json({ error: errorMessages.incorrectPassword})
        }
        // Generar el token con JWT
        const token = jwt.sign({uid: user._id}, process.env.JWT_SECRET)

        return res.json({ token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: errorMessages.serverError })
    }
};
