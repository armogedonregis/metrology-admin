import { Router } from "express";
import noteControllers from "@/resources/note/note.controllers";
import { authenticate } from "@/middleware/authenticator";


const router = Router();

router.get('/', noteControllers.getNote);

router.delete('/:id', authenticate, noteControllers.deleteNote);

router.put('/:id', authenticate, noteControllers.updateNote);

router.post('/', authenticate, noteControllers.createNote);

export default router;