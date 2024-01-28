import { Router } from 'express';
import { errorMessages } from '../helpers/errorMessages.js';
import { login, register } from '../controllers/auth.controllers.js';
import { body } from 'express-validator';
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
import { MIN_PASSWORD_LENGTH } from '../helpers/configOptions.js';

const router = Router();

// Longitud mínima para la contraseña

router.post('/register', [
    body('email', errorMessages.invalidEmail)
        .trim()
        .isEmail()
        .normalizeEmail()
        .toLowerCase(),
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
        })],
    validationResultExpress,
    register);

router.post('/login', [
    body('email', errorMessages.invalidLogin)
        .trim()
        .isEmail()
        .normalizeEmail()
        .toLowerCase(),
    body('password', errorMessages.invalidLogin)
        .trim()
],
    validationResultExpress,
    login);

export default router;