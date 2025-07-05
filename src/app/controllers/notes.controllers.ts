import express, { Request, Response } from "express";
import { Note } from "../models/notes_models";

 export const notesRoutes = express.Router();

// create
notesRoutes.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;

  // approse1
  const myNote = new Note({
    title: "Learning Expresss",
    tags: {
      label: "DatabaseDB",
    },
  });

  //   await myNote.save();

  const notes = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "note create successfully",
    notes,
  });
});
// get
notesRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find().populate('user');

  res.status(201).json({
    success: true,
    message: "notes get successfylly",
    notes,
  });
});

// update  data
notesRoutes.patch("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const UpdatedBody = req.body;
  // const note = await Note.findByIdAndUpdate(noteId, UpdatedBody , {new :true});
  // const note = await Note.findOneUpdate({_id : noteId, {new :true}})
  const note = await Note.updateOne({ _id: noteId }, UpdatedBody, {
    new: true,
  });

  res.status(201).json({
    success: true,
    message: "Notes update done  successfylly",
    note,
  });
});

// delete  data
notesRoutes.delete("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  const note = await Note.findByIdAndDelete(noteId);
  // const note = await Note.findOnedelete({_id : noteId, {new :true}})
  // const note = await Note.deleteOne({_id: noteId});

  res.status(201).json({
    success: true,
    message: "notes delete successfylly",
    note,
  });
});
