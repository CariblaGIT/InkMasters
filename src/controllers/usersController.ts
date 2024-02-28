import { Request, Response } from "express";
import { User } from "../models/User";
import { IsNull } from "typeorm";

export const GetUsers = async (req : Request, res : Response) => {
    try {
        const allUsers = await User.find({
            select : {
                firstName : true,
                lastName : true,
                email : true,
                createdAt : true,
                updatedAt : true
            }
        })

        return res.status(200).json({
            success: true,
            message: "Users retrieved from DB successfully",
            data: allUsers
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Get users from DB failure",
            error: error
        });
    }
}

export const ProfileUser = (req : Request, res : Response) => {
    
}

export const ModifyUser = (req : Request, res : Response) => {
    
}

export const UserByMail = async (req : Request, res : Response) => {
    try {
        const userMail = req.params.email

        const user = await User.findOneBy({
            email: userMail
        })

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found on DB"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User retrieved from DB successfully",
            data: user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Get user from DB failure",
            error: error
        });
    }
}

export const DeleteUser = (req : Request, res : Response) => {
    
}

export const ChangeUserRole = (req : Request, res : Response) => {
    
}