import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';

export const RegisterUser = async (req : Request, res : Response) => {
    try {

        const reqMail : string = req.body.email;
        const reqFirstName : string = req.body.first_name;
        const reqLastName : string = req.body.last_name;
        const reqPass : string = req.body.password_hash;
        const reqRole : number = req.body.role_id;

        const regexpPass : RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;

        if(reqPass.length < 10 || !regexpPass.test(reqPass) || reqPass.includes(' ')){
            return res.status(400).json({
                success: false,
                message: "Password not inside the standards (shorter than 10 and without special characters, mayus, minus and/or numbers and with spaces)"
            });
        }

        const validEmail : RegExp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(reqMail) ){
          return res.status(400).json(
            {
              success: false,
              message: "Email inserted not valid - Bad structure"
            }
          )
        }

        const cryptedPass = bcrypt.hashSync(reqPass, 8);

        await User.create({
            firstName: reqFirstName,
            lastName: reqLastName,
            email: reqMail,
            passwordHash: cryptedPass,
            role: {id: reqRole}
        }).save()

        return res.status(201).json({
            success: true,
            message: "User registered into DB successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Register user failure",
            error: error
        });
    }
}

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

        const user = await User.findOne({
            select : {
                id: true,
                passwordHash: true,
                email: true,
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
            return res.status(400).json({
                success: false,
                message: "Email or password invalid"
            })
        }

        if(!bcrypt.compareSync(password, user.passwordHash)){
            return res.status(400).json({
                success: false,
                message: "Email or password invalid"
            })
        }

        const token = jwt.sign(
            {
                userId: user.id,
                roleName: user.role.name
            },
            process.env.JWT_SECRET as string
        );

        return res.status(200).json({
            success: true,
            message: "User logged successfully",
            token: token
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login user failure",
            error: error
        });
    }
}