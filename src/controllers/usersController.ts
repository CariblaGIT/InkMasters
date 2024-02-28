import { Request, Response } from "express";
import { User } from "../models/User";

export const GetUsers = async (req : Request, res : Response) => {
    try {
        const allUsers = await User.find()

        return res.status(200).json({
            success: true,
            message: "Users retrieved from DB successfully",
            data: allUsers
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Get users failure",
            error: error
        });
    }
}

export const ProfileUser = (req : Request, res : Response) => {
    
}

export const ModifyUser = (req : Request, res : Response) => {
    
}

export const UserByMail = (req : Request, res : Response) => {
    
}

export const DeleteUser = (req : Request, res : Response) => {
    
}

export const ChangeUserRole = (req : Request, res : Response) => {
    
}