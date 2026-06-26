import { model, Schema } from "mongoose";
import type { IUser } from "../interfaces/IUser.js";

const UserSchema = new Schema<IUser>(
  {
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);