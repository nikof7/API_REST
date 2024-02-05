import { nanoid } from "nanoid";
import { errorMessages } from "../helpers/errorMessages.js";
import { Link } from "../models/link.js";

export const getLinks = async (req, res) => {
    try {
        const links = await Link.find({ uid: req.uid })
        return res.json({ ok: links })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: errorMessages.serverError })
    }
};

export const getLink = async (req, res) =>{
    try {
        const {id} = req.params
        const link = await Link.findById(id)
        if(!link) {return res.status(404).json({error: errorMessages.linkNoExist})}

        if(!link.uid.equals(req.uid)){return res.status(401).json({error: errorMessages.incorrectIdFormat})}


        return res.json({ ok: link })
    } catch (error) {
        console.log(error)
        if(error.kind === "ObjectId") {return res.status(403).json({error: errorMessages.incorrectIdFormat})}
        res.status(500).json({ error: errorMessages.serverError })
    }
};

export const createLink = async (req, res, value) => {
    try {
        const longLink = req.longLink;
        const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid})
        const newLink = await link.save()
        return res.status(201).json({ newLink })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: errorMessages.serverError });
    }
}

export const removeLink = async (req, res) =>{
    try {
        const {id} = req.params
        const link = await Link.findById(id)
        if(!link) {return res.status(404).json({error: errorMessages.linkNoExist})}
        if(!link.uid.equals(req.uid)) {return res.status(401).json({error: errorMessages.incorrectIdFormat})}
        await link.deleteOne();
        return res.json({ ok: link })
    } catch (error) {
        console.log(error)
        if(error.kind === "ObjectId") {return res.status(403).json({error: errorMessages.incorrectIdFormat})}
        res.status(500).json({ error: errorMessages.serverError })
    }
};