import express, { Application, NextFunction, Request, Response } from "express";

const app: Application = express();
import { model, Schema } from "mongoose";

const noteSchema = new Schema({
  title: { type: String, require: true, trim: true },
    content: { type: String, default: "" },
    category: {
        type: String,
        enum: ["personal", "Work", "stduy"],
        default:"personal"
    },
    pinned: {
        type: Boolean,
        default:false
    },
    tags: {
        label: { type: String, require: true },
        color:{type: String, default:"gray"}
    }
});

const Note = model("Note", noteSchema);
app.post("/create-note", async (req: Request, res: Response) => {
  const myNote = new Note({
      title: "Learning Expresss",
      tags: {
          label: "DatabaseDB"
      }
  });

  await myNote.save();

  res.status(201).json({
    success: true,
    message: "Note create successfully",
    note: myNote,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome! to not app");
});

export default app;
