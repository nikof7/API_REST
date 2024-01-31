import { MIN_PASSWORD_LENGTH } from '../helpers/configOptions.js';

// Constantes para los mensajes de error
export const errorMessages = {
    serverError: 'Server error.',
    invalidEmail: "Invalid email.",
    invalidPassword: "Invalid password.",
    passwordMismatch: "Password doesn't match.",
    passwordMinCharacters: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
    invalidLogin: "Invalid email or password. Please check your credentials and try again.",
    hashError: "Password hash failed.",
    emailInUse: "This email is already in use. Please use a different email",
    emailNotRegistered: "This email is not registered. Please sign up to create an account.",
    incorrectPassword: "Incorrect password. Please try again.",
    invalidToken: "Invalid token."
};
