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

export const UpdateRol = async (req : Request, res : Response) => {
    try {
        const roleId = req.params.id;

        const role = await Role.findOneBy({
            id: parseInt(roleId)
        })

        if(!role){
            return res.status(404).json({
                success: false,
                message: "Role not found to update on DB"
            })
        }

        const roleUpdate = await Role.update(
            {id: parseInt(roleId)}, req.body
        )

        return res.status(200).json({
            success: true,
            message: "Role updated into DB successfully",
            data: roleUpdate
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Update role into DB failure",
            error: error
        });
    }
}

export const DeleteRol = async (req : Request, res : Response) => {
    try {
        const roleId = req.params.id;

        const role = await Role.findOneBy({
            id: parseInt(roleId)
        })

        if(!role){
            return res.status(404).json({
                success: false,
                message: "Role not found to delete on DB"
            })
        }

        await Role.delete(
            {id: parseInt(roleId)}
        )

        return res.status(200).json({
            success: true,
            message: "Roles deleted from DB successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Delete roles from DB failure",
            error: error
        });
    }
}