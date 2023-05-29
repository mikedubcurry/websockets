import { NextFunction, Request, RequestHandler, Response } from "express";

export const authMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    console.log('auth middleware: ', req)
    next();
}

