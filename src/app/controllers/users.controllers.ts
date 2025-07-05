import express, { Request, Response } from "express";
import { User } from "../models/uses.models";
import z, { any } from "zod";

export const usersRoutes = express.Router();

const createUserZodShcema = z.object({
  fastName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role:z.string().optional()
})
 


// create
usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    const body = await createUserZodShcema.parseAsync(req.body);
    
    console.log(body, "zode body chiking")

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
      users:{},
    });
  
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "error got message",
      error,
    });
}
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
