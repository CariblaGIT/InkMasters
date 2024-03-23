import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { ValidateEmail } from "../helpers/validateEmail";
import { ValidatePassword } from "../helpers/validatePassword";
import { Role } from "../models/Role";

// ========================================================================================================================================
//  FUNCTION       | ENDPOINT           | FUNCTIONALITY
//                 | POST               | This function post a new user into the DB by giving all the params related to an user and created
//  RegisterUser() | /api/auth/register | as a normal user (by default role = 'user'), with a good email and encrypted and hard to crack password
// ========================================================================================================================================
export const RegisterUser = async (req : Request, res : Response) => {
    try {

        const reqMail : string = req.body.email;
        let reqFullName : string = req.body.fullname;
        const reqUserName : string = req.body.username;
        const reqPass : string = req.body.password;
        const reqRole : string = req.body.role;

        if(!ValidatePassword(reqPass)){
            return res.status(400).json({
                success: false,
                message: "Password not inside the standards (shorter than 10 and without special characters, mayus, minus and/or numbers and with spaces)"
            });
        }

        if (!ValidateEmail(reqMail)){
          return res.status(400).json(
            {
              success: false,
              message: "Email inserted not valid - Bad structure"
            }
          )
        }

        if(!reqUserName){
            return res.status(400).json({
                success: false,
                message: "No data provided correctly to create user"
            });
        }

        if(!reqFullName){
            reqFullName = reqUserName
        }

        let newRole;
        if(reqRole){
            newRole = await Role.findOneBy({name: reqRole})
            if(!newRole){
                return res.status(400).json({
                    success: false,
                    message: "Wrong role give to create user"
                });
            }
        }

        const cryptedPass = bcrypt.hashSync(reqPass, 8);

        await User.create({
            fullname: reqFullName,
            username: reqUserName,
            email: reqMail,
            passwordHash: cryptedPass,
        }).save()

        if(reqRole){
            await User.update(
                {email: reqMail}, {role: newRole}
            )
        }

        return res.status(201).json({
            success: true,
            message: "User registered into DB successfully"
        })
        
    } catch (error : any) {
        return res.status(500).json({
            success: false,
            message: "Register user failure",
            error: error.message
        });
    }
}

// ========================================================================================================================================
//  FUNCTION      | ENDPOINT         | FUNCTIONALITY
//                | POST             | This function allows a user with a credentials inside the DB as email and password to enter inside
//  LoginUser()   | /api/auth/login  | the application, returning a JWT token to allow the user to do the actions assigned to that role
// ========================================================================================================================================
export const LoginUser = async (req : Request, res : Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password){
            return res.status(400).json(
                {
                  success: false,
                  message: "Needed to have an email and a password"
                }
        )}

        if (!ValidateEmail(email)){
            return res.status(400).json(
              {
                success: false,
                message: "Email inserted not valid - Bad structure"
              }
            )
        }

        const user = await User.findOne({
            select : {
                id: true,
                passwordHash: true,
                email: true,
                avatar: true,
                role: {
                    name: true
                }
            },
            where: {
                email: email
            },
            relations: {
                role: true
            }
        })

        if(!user){
            throw new Error ("Email or password invalid")
        }

        if(!bcrypt.compareSync(password, user.passwordHash)){
            throw new Error ("Email or password invalid")
        }

        const token = jwt.sign(
            {
                userId: user.id,
                roleName: user.role.name,
                userName: user.username,
                avatar: user.avatar
            },
            process.env.JWT_SECRET as string
        );

        return res.status(200).json({
            success: true,
            message: "User logged successfully",
            token: token
        })
        
    } catch (error : any) {
        if(error.message === "Email or password invalid"){
            return res.status(401).json({
                success: false,
                message: "Login user failure",
                error: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: "Login user failure",
            error: error
        });
    }
}