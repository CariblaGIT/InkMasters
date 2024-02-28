import { Request, Response } from "express";
import { User } from "../models/User";

export const RegisterUser = async (req : Request, res : Response) => {
    try {
        return res.status(201).json({
            success: true,
            message: "User registered into DB successfully",
            // data: newUser
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Register User failure",
            error: error
        });
    }
}

export const LoginUser = (req : Request, res : Response) => {
    
}