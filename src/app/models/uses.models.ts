import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInsanceMethods } from "../interfaces/intserface";
import validator from "validator";
import bcrypt from "bcryptjs";
const addressShcema = new Schema<IAddress>({
  city: { type: String },
  street: { type: String },
  zip: { type: Number },
}, {
    _id:false
});

const userSchema = new Schema<IUser , Model<IUser>, UserInsanceMethods>(
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
  }
);

userSchema.method("hasPassword", async  function (planpassword: string) {
  const password = await bcrypt.hash(planpassword, 10)
  console.log(password)
  this.password =password
 
  
});



export const User = model("User", userSchema);
