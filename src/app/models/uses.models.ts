import { model, Schema } from "mongoose";
import IUser, { IAddress } from "../interfaces/intserface";
import validator from "validator";

const addressShcema = new Schema<IAddress>({
  city: { type: String },
  street: { type: String },
  zip: { type: Number },
}, {
    _id:false
});

const userSchema = new Schema<IUser>(
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

export const User = model("User", userSchema);
