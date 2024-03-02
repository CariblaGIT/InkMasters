import { Request, Response } from "express";
import { Service } from "../models/Service";

// ========================================================================================================================================
//  FUNCTION      | ENDPOINT      | FUNCTIONALITY
//                | GET           | 
//  GetServices() | /api/services | This function gets all services offered by the company from the DB
// ========================================================================================================================================
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


// ========================================================================================================================================
//  FUNCTION      | ENDPOINT      | FUNCTIONALITY
//                | POST          | This function post a new service by giving a name and a description into the DB
//  PostService() | /api/services | To make this petition, the user has to be a super_admin user
// ========================================================================================================================================
export const PostService = async (req : Request, res : Response) => {
    try {

        const reqName : string = req.body.service_name;
        const reqDescription : string = req.body.description;

        if(!reqName || !reqDescription){
            return res.status(400).json({
                success: false,
                message: "You have to specify a name and a description for the service input to be able to create it"
            });
        }

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

// ========================================================================================================================================
//  FUNCTION        | ENDPOINT          | FUNCTIONALITY
//                  | PUT               | This function modifies the service name or description assigned to a service ID given as param on the URL
//  UpdateService() | /api/services/:id | To make this petition, the user has to be a super_admin user
// ========================================================================================================================================
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

        if(!req.body){
            return res.status(400).json({
                success: false,
                message: "You have to give data to be able to change the service"
            });
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

// ========================================================================================================================================
//  FUNCTION        | ENDPOINT          | FUNCTIONALITY
//                  | DELETE            | This function removes completely a service from the DB by an ID introduced as param on the URL
//  DeleteService() | /api/services/:id | To make this petition, the user has to be a super_admin user
// ========================================================================================================================================
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