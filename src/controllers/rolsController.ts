import { Request, Response } from "express";
import { Role } from "../models/Role";

// ========================================================================================================================================
//  FUNCTION      | ENDPOINT     | FUNCTIONALITY
//                | GET          | This function gets all users roles from the DB
//  GetRoles()    | /api/roles   | To make this petition, the user has to be a super_admin user
// ========================================================================================================================================
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

// ========================================================================================================================================
//  FUNCTION      | ENDPOINT     | FUNCTIONALITY
//                | POST         | This function post a new role by his name into the DB
//  PostRol()     | /api/roles   | To make this petition, the user has to be a super_admin user
// ========================================================================================================================================
export const PostRol = async (req : Request, res : Response) => {
    try{
        const reqName : string = req.body.role_name;

        if(!reqName){
            return res.status(400).json({
                success: false,
                message: "No data provided to post role"
            });
        }

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

// ========================================================================================================================================
//  FUNCTION      | ENDPOINT       | FUNCTIONALITY
//                | PUT            | This function modifies the role name assigned to a role ID given as param on the URL
//  UpdateRol()   | /api/roles/:id | To make this petition, the user has to be a super_admin user
// ========================================================================================================================================
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

        if(!req.body){
            return res.status(400).json({
                success: false,
                message: "You have to give data to be able to change the role"
            });
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

// ========================================================================================================================================
//  FUNCTION      | ENDPOINT       | FUNCTIONALITY
//                | DELETE         | This function removes completely a role from the DB by an ID introduced as param on the URL
//  DeleteRol()   | /api/roles/:id | To make this petition, the user has to be a super_admin user
// ========================================================================================================================================
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