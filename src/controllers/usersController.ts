import { Request, Response } from "express";
import { User } from "../models/User";
import { Role } from "../models/Role";

// ========================================================================================================================================
//  FUNCTION      | ENDPOINT     | FUNCTIONALITY
//                | GET          | This function gets all the users from the database or a user by email given on the body of the petition
//  GetUsers()    | /api/users   | To make this petition, the user has to be a super_admin user
// ========================================================================================================================================
export const GetUsers = async (req : Request, res : Response) => {
    try {
        const body = req.body

        if(body.email){
            UserByMail(body.email, res);
        } else {
            const allUsers = await User.find({
                select : {
                    fullname : true,
                    username : true,
                    avatar: true,
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
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Get users from DB failure",
            error: error
        });
    }
}

// ========================================================================================================================================
//  FUNCTION      | ENDPOINT           | FUNCTIONALITY
//                | GET                | This function gets the user profile by ID given from the token inside the petition
//  ProfileUser() | /api/users/profile | To make this petition, the user has to been logged in previously
// ========================================================================================================================================
export const ProfileUser = async (req : Request, res : Response) => {
    try {

        const userId = req.tokenData.userId;

        const user = await User.findOne({
            select : {
                fullname : true,
                username : true,
                avatar: true,
                email : true
            },
            where : {
                id: userId
            }
        })

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found to update on DB"
            })
        }

        return res.status(201).json({
            success: true,
            message: "Get profile from user successfully",
            data: user
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Getting user profiles failure",
            error: error
        });
    }
}


// ========================================================================================================================================
//  FUNCTION      | ENDPOINT     | FUNCTIONALITY
//                | PUT          | This function modifies the user profile by ID given from the token inside the petition
//  ModifyUser()  | /api/users   | To make this petition, the user has to been logged in previously
// ========================================================================================================================================
export const ModifyUser = async (req : Request, res : Response) => {
    try {
        const userId = req.tokenData.userId;
        const avatar = req.file?.filename;

        const user = await User.findOneBy({
            id: userId
        })

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found to update on DB"
            })
        }

        let userUpdate = await User.update(
            {id: userId}, req.body
        )

        if(avatar){
            userUpdate = await User.update(
                {id: userId}, {avatar: avatar}
            )
        }

        return res.status(200).json({
            success: true,
            message: "Users updated into DB successfully",
            data: userUpdate
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Update users into DB failure",
            error: error
        });
    }
}

// ========================================================================================================================================
//  FUNCTION      | ENDPOINT     | FUNCTIONALITY
//                | GET          | This function is called from the previously method if has a email body param (GetUsers())
//  userByMail()  | /api/users   | To make this petition, the user has to be a super_admin user
// ========================================================================================================================================
const UserByMail = async (email : string, res : Response) => {
    try {
        const user = await User.findOneBy({
            email: email
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


// ========================================================================================================================================
//  FUNCTION      | ENDPOINT       | FUNCTIONALITY
//                | DELETE         | This function removes completely a user from the DB by an ID introduced as param on the URL
//  DeleteUser()  | /api/users/:id | To make this petition, the user has to be a super_admin user
// ========================================================================================================================================
export const DeleteUser = async (req : Request, res : Response) => {
    try {
        const userId = req.params.id;

        const user = await User.findOneBy({
            id: parseInt(userId)
        })

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found to delete on DB"
            })
        }

        await User.delete(
            {id: parseInt(userId)}
        )

        return res.status(200).json({
            success: true,
            message: "Users deleted from DB successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Delete users from DB failure",
            error: error
        });
    }
}


// ========================================================================================================================================
//  FUNCTION         | ENDPOINT            | FUNCTIONALITY
//                   | PUT                 | This function modifies the user role assigned to a user ID given as param on the URL
//  ChangeUserRole() | /api/users/:id/role | To make this petition, the user has to be a super_admin user
// ========================================================================================================================================
export const ChangeUserRole = async (req : Request, res : Response) => {
    try {
        const userId = req.params.id;
        const newRole = req.body.role;

        const user = await User.findOneBy({
            id: parseInt(userId)
        })

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found to update on DB"
            })
        }

        const role = await Role.findOneBy({
            name: newRole
        })

        if(!role){
            return res.status(404).json({
                success: false,
                message: "Role to not found to update on DB"
            })
        }

        const userUpdate = await User.update(
            {id: parseInt(userId)}, {role: {id: role.id}}
        )

        return res.status(200).json({
            success: true,
            message: "User role updated into DB successfully",
            data: userUpdate
        })

    } catch (error : any) {
        return res.status(500).json({
            success: false,
            message: "Update role from users into DB failure",
            error: error.message
        });
    }
}