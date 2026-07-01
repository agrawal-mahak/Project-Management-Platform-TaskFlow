import { type Request, type Response } from "express";
import Board from '../models/Board.js'; // Clean ES Module import

export const getBoards = async (req: Request, res: Response) => {
    try {
        // 1. Extract search, page, and limit from query parameters
        const { search, page, limit } = req.query;
        console.log(`[GET /api/boards] Query params → search: "${search || ''}", page: ${page || 1}, limit: ${limit || 10}`);

        // 2. Build the search query
        let query = {};
        if (search) {
            query = {
                taskName: { $regex: search, $options: "i" }
            };
            console.log(`[GET /api/boards] Applying search filter: "${search}"`);
        }

        // 3. Define pagination defaults (fallback to page 1, 10 items per page if not provided)
        const pageNumber = parseInt(page as string) || 1;
        const limitNumber = parseInt(limit as string) || 10;
        
        // Calculate how many documents to skip
        const skip = (pageNumber - 1) * limitNumber;

        // 4. Get the total count of matching documents (crucial for frontend pagination UI)
        const totalBoards = await Board.countDocuments(query);
        console.log(`[GET /api/boards] Total matching boards: ${totalBoards}`);

        // 5. Fetch the paginated data
        const boards = await Board.find(query)
            .skip(skip)
            .limit(limitNumber);

        // 6. Check if data exists
        if (boards.length === 0) {
            console.log(`[GET /api/boards] No boards found for the given query`);
            return res.status(400).json({ message: "No data found" });
        }

        console.log(`[GET /api/boards] Returning ${boards.length} boards (page ${pageNumber})`);

        // 7. Return data along with pagination metadata
        return res.status(200).json({
            meta: {
                totalItems: totalBoards,
                totalPages: Math.ceil(totalBoards / limitNumber),
                currentPage: pageNumber,
                limit: limitNumber
            },
            data: boards
        });
        
    } catch (error) {
        console.error(`[GET /api/boards] Error:`, error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const createBoard = async (req: Request, res: Response) => {
    try {
        console.log(`[POST /api/boards] Creating board with data:`, req.body);
        const newBoard = new Board(req.body);
        await newBoard.save();
        console.log(`[POST /api/boards] Board created successfully → ID: ${newBoard._id}`);
        res.status(201).json(newBoard);
    } catch (error) {
        console.error(`[POST /api/boards] Error:`, error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getBoardById = async (req: Request, res: Response) => {
    try {
        const { boardId } = req.params;
        console.log(`[GET /api/boards/${boardId}] Fetching board by ID`);
        const board = await Board.findById(boardId);
        if (!board) {
            console.log(`[GET /api/boards/${boardId}] Board not found`);
            return res.status(404).json({ message: "Board not found" });
        }
        console.log(`[GET /api/boards/${boardId}] Board found → "${board.taskName ?? boardId}"`);
        res.status(200).json(board);
    } catch (error) {
        console.error(`[GET /api/boards/:boardId] Error:`, error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteBoard = async (req: Request, res: Response) => {
    try {
        const { boardId } = req.params;
        console.log(`[DELETE /api/boards/${boardId}] Attempting to delete board`);
        const board = await Board.findByIdAndDelete(boardId);
        if (!board) {
            console.log(`[DELETE /api/boards/${boardId}] Board not found`);
            return res.status(400).json({ message: "Board not found" });
        }
        console.log(`[DELETE /api/boards/${boardId}] Board deleted successfully`);
        res.status(200).json({ message: "Board deleted successfully" });
    } catch (error) {
        console.error(`[DELETE /api/boards/:boardId] Error:`, error);
        res.status(500).json({ message: "Internal server error" });
    }
}