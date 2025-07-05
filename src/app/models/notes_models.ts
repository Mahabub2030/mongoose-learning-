import { model, Schema } from "mongoose";
import { ref } from "process";

const noteSchema = new Schema(
    {
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
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require:true,
        }
    }, {
        versionKey: false,
        timestamps:true
    }

);
 export const Note = model("Note", noteSchema);
