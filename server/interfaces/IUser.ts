import type { Document } from "mongoose";

export interface IUser extends Document {
  name:      string;
  email:     string;
  password:  string;
  role:      'employee' | 'manager' | 'admin';
  createdAt: Date;   // added by Mongoose { timestamps: true }
  updatedAt: Date;   // added by Mongoose { timestamps: true }
}