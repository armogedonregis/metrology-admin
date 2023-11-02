import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import noteServices from "./note.services";
import noteModel from "./note.model";


// Создание заметки

async function createNote(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id = req.auth?.user?.id;
    const { top, bottom } = req.body;
  
    try {
  
      const note = await noteServices.noteCreatePrisma({top, bottom});

      const noteView = noteModel(note);
      return res.status(201).json(noteView);
    } catch (error) {
      return next(error);
    }
  }

  // удаление заметки

  async function deleteNote(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
  
    try {
  
      const note = await noteServices.noteDeletePrisma(id);
      if (!note) return res.sendStatus(500);
  
      return res.json({ message: `${note.id} удален`});
    } catch (error) {
      return next(error);
    }
  }

  
  // получение всех заметок

  async function getNote(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id = req.auth?.user?.id;
  
    try {

      const notes = await noteServices.noteGetAllPrisma();
  
      if(!notes) return res.sendStatus(404)
  
      const noteView = noteModel(notes)
      
      return res.status(201).json(noteView);
    } catch (error) {
      return next(error);
    }
  }
  
  // обновление заметок

  async function updateNote(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    const { top, bottom } = req.body;
  
    try {
      const note = await noteServices.noteUpdatePrisma(id, top, bottom);
      if (!note) return res.sendStatus(404);
  
      const noteView = noteModel(note);
      return res.status(201).json(noteView);
    } catch (error) {
      return next(error);
    }
  }
  

export default { createNote, deleteNote, getNote, updateNote };