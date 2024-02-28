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

export const UpdateService = async (req : Request, res : Response) => {
    try {
        const serviceId = req.params.id;

        const service = await Service.findOneBy({
            id: parseInt(serviceId)
        })

        if(!service){
            return res.status(404).json({
                success: false,
                message: "User not found to update on DB"
            })
        }

        const serviceUpdate = await Service.update(
            {id: parseInt(serviceId)}, req.body
        )

        return res.status(200).json({
            success: true,
            message: "Service updated into DB successfully",
            data: serviceUpdate
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Update service into DB failure",
            error: error
        });
    }
}

export const DeleteService = async (req : Request, res : Response) => {
    try {
        const serviceId = req.params.id;

        const service = await Service.findOneBy({
            id: parseInt(serviceId)
        })

        if(!service){
            return res.status(404).json({
                success: false,
                message: "Service not found to delete on DB"
            })
        }

        await Service.delete(
            {id: parseInt(serviceId)}
        )

        return res.status(200).json({
            success: true,
            message: "Services deleted from DB successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Delete services from DB failure",
            error: error
        });
    }
}