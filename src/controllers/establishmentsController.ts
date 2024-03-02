import { Request, Response } from "express";
import { Establishment } from "../models/Establishment";

// ========================================================================================================================================
//  FUNCTION            | ENDPOINT            | FUNCTIONALITY
//                      | GET                 | 
//  GetEstablishments() | /api/establishments | This function gets all establishments from the company that are on the DB
// ========================================================================================================================================
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

// ========================================================================================================================================
//  FUNCTION            | ENDPOINT            | FUNCTIONALITY
//                      | POST                | This function post a new establishment by giving an address, city and zipcode into the DB
//  PostEstablishment() | /api/establishments | To make this petition, the user has to be a super_admin user
// ========================================================================================================================================
export const PostEstablishment = async (req : Request, res : Response) => {
    try {

        const reqAddress : string = req.body.establishment_address;
        const reqCity : string = req.body.establishment_city;
        const reqPostalCode : string = req.body.establishment_postal_code;

        if(!reqAddress || !reqCity || !reqPostalCode){
            return res.status(400).json({
                success: false,
                message: "No data provided correctly to create establishment"
            });
        }

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

// ========================================================================================================================================
//  FUNCTION              | ENDPOINT                | FUNCTIONALITY
//                        | PUT                     | This function modifies the establishment data assigned to a establishment ID given as param on the URL
//  UpdateEstablishment() | /api/establishments/:id | To make this petition, the user has to be a super_admin user
// ========================================================================================================================================
export const UpdateEstablishment = async (req : Request, res : Response) => {
    try {
        const establishmentId = req.params.id;

        const establishment = await Establishment.findOneBy({
            id: parseInt(establishmentId)
        })

        if(!establishment){
            return res.status(404).json({
                success: false,
                message: "Establishment not found to delete on DB"
            })
        }

        if(!req.body){
            return res.status(400).json({
                success: false,
                message: "You have to give data to be able to change the establishment"
            });
        }

        const establishmentUpdate = await Establishment.update(
            {id: parseInt(establishmentId)}, req.body
        )

        return res.status(200).json({
            success: true,
            message: "Establishment updated into DB successfully",
            data: establishmentUpdate
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Update establishment into DB failure",
            error: error
        });
    }
}

// ========================================================================================================================================
//  FUNCTION               | ENDPOINT                | FUNCTIONALITY
//                         | DELETE                  | This function removes completely an establishment from the DB by an ID introduced as param on the URL
//  DeleteeEstablishment() | /api/establishments/:id | To make this petition, the user has to be a super_admin user
// ========================================================================================================================================
export const DeleteEstablishment = async (req : Request, res : Response) => {
    try {
        const establishmentId = req.params.id;

        const establishment = await Establishment.findOneBy({
            id: parseInt(establishmentId)
        })

        if(!establishment){
            return res.status(404).json({
                success: false,
                message: "Establishment not found to delete on DB"
            })
        }

        await Establishment.delete(
            {id: parseInt(establishmentId)}
        )

        return res.status(200).json({
            success: true,
            message: "Establishment deleted from DB successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Delete establishments from DB failure",
            error: error
        });
    }
}