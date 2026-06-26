import type { Document, Types } from "mongoose";

export interface IList extends Document {
  title: string;
  boardId: Types.ObjectId;
  position: number;
}