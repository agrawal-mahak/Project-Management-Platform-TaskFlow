import { type Request, type Response } from "express";
import Board from '../models/Board.js'; // Clean ES Module import

export const getBoards = async (req: Request, res: Response) => {
    try {
        const boards = await Board.find();
        res.status(200).json(boards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


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