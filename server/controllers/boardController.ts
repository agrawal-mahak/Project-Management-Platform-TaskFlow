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