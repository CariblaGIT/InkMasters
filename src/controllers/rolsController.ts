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

export const PostRol = async (req : Request, res : Response) => {
    try{
        const reqName : string = req.body.role_name;

        await Role.create({
            name: reqName
        }).save()

        return res.status(201).json({
            success: true,
            message: "Role registered into DB successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Register role failure",
            error: error
        });
    }
}

export const UpdateRol = (req : Request, res : Response) => {

}

export const DeleteRol = (req : Request, res : Response) => {

}