import { Request, Response } from "express";
import { Establishment } from "../models/Establishment";

export const GetEstablishments = async (req : Request, res : Response) => {
    try {
        const allEstablishments = await Establishment.find({
            select : {
                address : true,
                city : true,
                postalCode : true
            }
        })

        return res.status(200).json({
            success: true,
            message: "Establishments retrieved from DB successfully",
            data: allEstablishments
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Get establishments from DB failure",
            error: error
        });
    }
}

export const PostEstablishment = async (req : Request, res : Response) => {
    try {

        const reqAddress : string = req.body.establishment_address;
        const reqCity : string = req.body.establishment_city;
        const reqPostalCode : string = req.body.establishment_postal_code;

        await Establishment.create({
            address: reqAddress,
            city: reqCity,
            postalCode: parseInt(reqPostalCode)
        }).save()

        return res.status(201).json({
            success: true,
            message: "Establishment registered into DB successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Register establishment failure",
            error: error
        });
    }
}

export const UpdateEstablishment = async (req : Request, res : Response) => {

}

export const DeleteEstablishment = async (req : Request, res : Response) => {

}