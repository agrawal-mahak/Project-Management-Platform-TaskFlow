import { type Request, type Response } from "express";
import Board from '../models/Board.js'; // Clean ES Module import

export const getBoards = async (req: Request, res: Response) => {
    try {
        // 1. Extract search, page, and limit from query parameters
        const { search, page, limit } = req.query;

        // 2. Build the search query
        let query = {};
        if (search) {
            query = {
                taskName: { $regex: search, $options: "i" }
            };
        }

        // 3. Define pagination defaults (fallback to page 1, 10 items per page if not provided)
        const pageNumber = parseInt(page as string) || 1;
        const limitNumber = parseInt(limit as string) || 10;
        
        // Calculate how many documents to skip
        const skip = (pageNumber - 1) * limitNumber;

        // 4. Get the total count of matching documents (crucial for frontend pagination UI)
        const totalBoards = await Board.countDocuments(query);

        // 5. Fetch the paginated data
        const boards = await Board.find(query)
            .skip(skip)
            .limit(limitNumber);

        // 6. Check if data exists
        if (boards.length === 0) {
            return res.status(400).json({ message: "No data found" });
        }

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
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const createBoard = async (req: Request, res: Response) => {
    try {
        const newBoard = new Board(req.body);
        await newBoard.save();
        res.status(201).json(newBoard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const getBoardById = async (req: Request, res:Response) =>{
    try{
        const {boardId} = req.params;
        const board = await Board.findById(boardId);
        if(!board){
            return res.status(404).json({message:"Board not found"})
        }
        res.status(200).json(board)
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal server error"})

    }
}

export const deleteBoard = async (req: Request, res: Response)=> {
    try{
        const {boardId} = req.params;
        const board = await Board.findByIdAndDelete(boardId);
        if(!board){
            return res.status(400).json({message: "Board not found"});
        }
        res.status(200).json({message: "Board deleted successfully"})
    } catch (error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}