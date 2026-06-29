import { Router } from "express";
import { getBoards, createBoard, getBoardById, deleteBoard} from "../controllers/boardController.js";

const router = Router();

// GET /api/boards  → fetch all boards
router.get("/", getBoards);
router.get("/:boardId", getBoardById);
router.delete("/:boardId", deleteBoard);


router.post("/", createBoard);

export default router;
