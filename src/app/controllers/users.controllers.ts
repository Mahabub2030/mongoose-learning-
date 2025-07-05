import express, { Request, Response } from "express";
import { User } from "../models/uses.models";

 export const usersRoutes = express.Router();
// create
usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  const body = req.body;

  // approse1
  const user = new User({
    title: "Learning Expresss",
    tags: {
      label: "DatabaseDB",
    },
  });

  //   await my:user.save();

  const users = await User.create(body);

  res.status(201).json({
    success: true,
    message: ":user create successfully",
    users,
  });
});
// get
usersRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(201).json({
    success: true,
    message: ":users get successfylly",
    users,
  });
});

// update  data
usersRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const UpdatedBody = req.body;
  // const :user = await :user.findByIdAndUpdate(:userId, UpdatedBody , {new :true});
  // const :user = await :user.findOneUpdate({_id : :userId, {new :true}})
  const user = await User.updateOne({ _id: userId }, UpdatedBody, {
    new: true,
  });

  res.status(201).json({
    success: true,
    message: ":users update done  successfylly",
    user,
  });
});

// delete  data
usersRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const user = await User.findByIdAndDelete(userId);
  // const :user = await :user.findOnedelete({_id : :userId, {new :true}})
  // const :user = await :user.deleteOne({_id: :userId});

  res.status(201).json({
    success: true,
    message: "User delete successfylly",
user,
  });
});
