import { NextFunction, Request, Response } from "express";
import { HttpHandler } from "../../types";

export const authMiddleware: HttpHandler = async (req: Request, res: Response, next: NextFunction) => {
    console.log('auth middleware: ', req)
    next();
}

