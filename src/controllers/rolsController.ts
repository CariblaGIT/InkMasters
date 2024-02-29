import { Request, Response } from "express";
import { Role } from "../models/Role";

export const GetRoles = async (req : Request, res : Response) => {
    try {
        const allRoles = await Role.find();

        return res.status(200).json({
            success: true,
            message: "Roles retrieved from DB successfully",
            data: allRoles
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Get roles from DB failure",
            error: error
        });
    }
}

export const PostRol = (req : Request, res : Response) => {

}

export const UpdateRol = (req : Request, res : Response) => {

}

export const DeleteRol = (req : Request, res : Response) => {

}