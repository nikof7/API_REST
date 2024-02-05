import { Router } from "express";
import { createLink, getLink, getLinks, removeLink } from "../controllers/link.controllers.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator } from "../middlewares/validatorManager.js";

const router = Router()

// GET          /api/v1/links        para traernos todas las URL 
// GET          /api/v1/links/:id    para traernos a un único URL 
// POST         /api/v1/links        crear un link
// PATCH/PUT    /api/v1/links/:id    actualizar el long link de un nano link
// DELETE       /api/v1/links/:id    eliminar un link

router.get('/', requireToken, getLinks)
router.get('/:id', requireToken, getLink)
router.post('/', requireToken, bodyLinkValidator, createLink)
router.delete('/:id', requireToken, removeLink)

export default router