import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { TokenData } from "../types";

// Middleware to check if a user from the application has passed through the login API method and got a JWT Token valid
export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Structure of token => 'Bearer: token' // With split, returns ['Bearer:', 'token']
        const token = (req.headers.authorization)?.split(' ')[1];

        // No token = not passed through login API method
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        /* If the token pass the secret value, is added to the request as a TokenData object, with the userID annd his roleName
           (WARNING: The secret is a hidden key saved on a .env file that you have to create following the .env.sample file) */
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