import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { TokenData } from "../types";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = (req.headers.authorization)?.split(' ')[1];

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET as string
        );

        req.tokenData = decoded as TokenData;

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "JWT NOT VALID OR BAD GGENERATED",
            error: error
        });
    }

}