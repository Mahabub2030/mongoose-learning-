import express, { Application, NextFunction, Request, Response } from "express";

import { model, Schema } from "mongoose";
import { Note } from "./app/models/notes_models";
import { notesRoutes } from "./app/controllers/notes.controllers";
import { usersRoutes } from "./app/controllers/users.controllers";
const app: Application = express();

app.use(express.json())
app.use("/notes", notesRoutes)
app.use("/users", usersRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome! to not app");
});

export default app;
