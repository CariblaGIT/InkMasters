import { Request, Response } from "express";
import { Service } from "../models/Service";

export const GetServices = async (req : Request, res : Response) => {
    try {
        const allServices = await Service.find({
            select : {
                serviceName : true,
                description : true,
                id : false
            }
        })

        return res.status(200).json({
            success: true,
            message: "Services retrieved from DB successfully",
            data: allServices
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Get services from DB failure",
            error: error
        });
    }
}

export const PostService = async (req : Request, res : Response) => {
    try {

        const reqName : string = req.body.service_name;
        const reqDescription : string = req.body.description;

        await Service.create({
            serviceName: reqName,
            description: reqDescription
        }).save()

        return res.status(201).json({
            success: true,
            message: "Service registered into DB successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Register service failure",
            error: error
        });
    }
}

export const UpdateService = (req : Request, res : Response) => {

}

export const DeleteService = (req : Request, res : Response) => {

}