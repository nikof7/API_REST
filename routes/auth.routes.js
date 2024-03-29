import { Router } from 'express';
import { infoUser, login, register, refreshToken, logOut } from '../controllers/auth.controllers.js';
import { requireToken } from '../middlewares/requireToken.js';
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';
import { bodyLoginValidator, bodyRegisterValidator } from '../middlewares/validatorManager.js';

const router = Router();

router.post('/register', bodyRegisterValidator, register);
router.post('/login', bodyLoginValidator, login);
router.get("/protected", requireToken, infoUser)
router.get("/refresh", requireRefreshToken, refreshToken)
router.get("/logout", logOut)
export default router;