import { MIN_PASSWORD_LENGTH } from '../helpers/configOptions.js';

// Constantes para los mensajes de error
export const errorMessages = {
    invalidEmail: "Invalid email.",
    invalidPassword: "Invalid password.",
    passwordMismatch: "Password doesn't match.",
    passwordMinCharacters: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
    invalidLogin: "Invalid email or password. Please check your credentials and try again.",
    hashError: "Password hash failed."
};
