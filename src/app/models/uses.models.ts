import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  UserInsanceMethods,
  UserStaicMethod,
} from "../interfaces/intserface";
import validator from "validator";
import bcrypt from "bcryptjs";
import { Note } from "./notes_models";
const addressShcema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<IUser, UserStaicMethod, UserInsanceMethods>(
  {
    fastName: {
      type: String,
      required: [true, "fast name n/a"],
      trim: true,
      minlength: [3, "fast Name Must be at least 3 latter, got {VALUE}"],
      maxlength: 10,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "min lage  Must be at least 3, got {VALUE}"],
      maxlength: 10,
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Age Must be at least 18, got {VALUE}"],
      max: 60,
    },
    email: {
      type: String,
      unique: [true, "email dupLicade"],
      required: true,
      lowercase: true,
      trim: true,
      // validate: {
      //   validator: function (value) {
      //     return /^\S+@\S+\.\S+$/.test(value);
      //   },
      //     message: function (props) {
      //       return `Email ${props.value} is not vaild`
      //   },
      // },
      validate: [validator.isEmail, "invalid Email SET {VALUE}"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      uppercase: true,
      enum: {
        values: ["USER", "ADMIN", "SUPERADMIN"],
        message: "Role is not valid . got{VALUE} role",
      },
      default: "USER",
    },
    address: {
      type: addressShcema,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject:{virtuals:true}
  }
);

userSchema.method("hasPassword", async function (planpassword: string) {
  const password = await bcrypt.hash(planpassword, 10);
  console.log(password);
  // this.password = password
  return password;
});


userSchema.static("hasPassword", async function (planpassword: string) {
  const password = await bcrypt.hash(planpassword, 10);
  console.log(password, "with haspwrod");
  return password;
});

userSchema.pre("save", async function (next) {
  // console.log("inside pre save code")
  this.password = await bcrypt.hash(this.password, 10); 
  console.log(this)
  next()
})

// Qury middleware
userSchema.pre("find", function (next) {
  // console.log(doc)
  console.log('inside pre fild book')
  next()
})

// post Hook
userSchema.post("findOneAndDelete", async function (doc,next) {
  if (doc) {
    console.log(doc);
    await Note.deleteMany({ user: doc._id });
  }
  next()
})


// Docments middlare
userSchema.post("save", function (doc,next) {
  console.log('inside post hook', doc._id)
  next()
})
userSchema.virtual("fullName").get(function () {
  return `${this.fastName} ${this.lastName}`
})

export const User = model<IUser, UserStaicMethod>("User", userSchema);
