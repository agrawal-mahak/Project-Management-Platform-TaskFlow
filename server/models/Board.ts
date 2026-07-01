import { model, Schema } from "mongoose";
import type { IBoard } from "../interfaces/IBoard.js";

const BoardSchema = new Schema<IBoard>({
    taskNo: { type: Number, 
        required: [true, "Task No. is required"],
        validate:{
            validator: Number.isInteger,
            message: "Task No. must be an integer"
        }
     },
    taskName: { 
        type: String, 
        required: [true, "Task name is required"],
        validate: {
            validator: (value: string) => {
                return value.trim().length > 0;
            },
            message: "Task name cannot be empty"
        }
     },
    status: { 
        type: String, 
        required: [true, 'Status is required']
     },
    priority: { 
        type: String, 
        required: [true,'Priority is required'] 
    },
    startDate: { 
        type: Date, 
        required: [true,'Start Date is required'] 
    },
    endDate: { 
        type: Date, 
        required: [true,'End Date is required'] 
    },
    assignedTo: { 
        type: String, 
        required: [true,'Assigned To is required'] 
    },
});

// CHANGE THIS LINE:
export default model<IBoard>("Board", BoardSchema);