import { body, validationResult } from "express-validator";
import { errorMessages } from '../helpers/errorMessages.js';
import { MIN_PASSWORD_LENGTH } from '../helpers/configOptions.js';
import { User } from '../models/user.js'

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const bodyRegisterValidator = [
    body('email', errorMessages.invalidEmail)
        .trim()
        .isEmail()
        .normalizeEmail()
        .toLowerCase()
        .custom(async (value, { req }) => {
            // Realizar una consulta a la base de datos para verificar si el email ya está en uso
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                throw new Error(errorMessages.emailInUse);
            }
        }),
    body('password', errorMessages.passwordMinCharacters)
        .trim()
        .isLength({ min: MIN_PASSWORD_LENGTH }),
    body('password', errorMessages.invalidPassword)
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error(errorMessages.passwordMismatch)
            }
            return value
        }),
    validationResultExpress]


export const bodyLoginValidator = [
    body('email', errorMessages.invalidLogin)
        .trim()
        .isEmail()
        .normalizeEmail()
        .toLowerCase(),
    body('password', errorMessages.invalidLogin)
        .trim(),
    validationResultExpress]