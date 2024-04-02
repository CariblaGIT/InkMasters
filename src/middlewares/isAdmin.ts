import { NextFunction, Request, Response } from "express";
import 'dotenv/config';

// Middleware to check if in the JWT the user has the role super_admin to do certain operations
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!(req.tokenData.roleName).includes("admin")){
            return res.status(401).json({
                success: false,
                message: "UNAUTHORIZED"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Dont have permissions",
            error: error
        });
    }

}