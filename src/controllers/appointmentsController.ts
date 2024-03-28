import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { ValidateDate } from "../helpers/validateDate";
import { Service } from "../models/Service";
import { User } from "../models/User";
import { Establishment } from "../models/Establishment";

// ========================================================================================================================================
//  FUNCTION          | ENDPOINT          | FUNCTIONALITY
//                    | POST              | This function post a new appointment by giving all the data referenced to one of them (date, relation to the service,
//  PostAppointment() | /api/appointments | relation to the local, relation to the employee and the user given by the token (you have to be logged in))
// ========================================================================================================================================
export const PostAppointment = async (req : Request, res : Response) => {
    try {

        const reqDate : Date = req.body.appointment_date;
        const reqService : string = req.body.service_name;
        const reqEstablishment : string = req.body.establishment;
        const reqTattooer : string = req.body.tattooer;
        const reqUserId : number = req.tokenData.userId;

        const knowExistenceOfService = await Service.findOneBy({
            serviceName: reqService
        })

        if(!knowExistenceOfService){
            return res.status(400).json({
                success: false,
                message: "Service selected invalid"
            });
        }

        const knowExistenceOfTattooer = await User.findOneBy({
            fullname: reqTattooer
        })

        if(!knowExistenceOfTattooer){
            return res.status(400).json({
                success: false,
                message: "Tattooer selected invalid"
            });
        }

        const knowExistenceOfEstablishment = await Establishment.findOneBy({
            address: reqEstablishment
        })

        if(!knowExistenceOfEstablishment){
            return res.status(400).json({
                success: false,
                message: "Establishment selected invalid"
            });
        }

        if(!ValidateDate(reqDate)){
            return res.status(400).json({
                success: false,
                message: "Appointment date format invalid"
            });
        }

        const appointment = await Appointment.create({
            appointmentDate: reqDate,
            service: knowExistenceOfService,
            establishment: knowExistenceOfEstablishment,
            tattooer: knowExistenceOfTattooer,
            user: {id: reqUserId}
        }).save()

        return res.status(201).json({
            success: true,
            message: "Appointment registered into DB successfully",
            data: appointment
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Register appointment failure",
            error: error
        });
    }
}

// ========================================================================================================================================
//  FUNCTION            | ENDPOINT          | FUNCTIONALITY
//                      | PUT               | This function updates an appointment from a user logged in (is checked) and updates checking what data is given
//  UpdateAppointment() | /api/appointments | (date, relation to the service, relation to the local, relation to the employee) to update it
// ========================================================================================================================================
export const UpdateAppointment = async (req : Request, res : Response) => {
    try {
        const appointmentId = req.body.id;
        let checkBodyParams : any = [];

        if(!parseInt(appointmentId)){
            return res.status(400).json({
                success: false,
                message: "You dont entered a correct ID to update appointment"
            });
        }

        const appointment = await Appointment.findOne({
            where: {
                id: appointmentId
            },
            relations:{
                user: true
            },
            select:{
                user:{
                    id: true
                }
            }
        })

        if(!appointment){
            return res.status(404).json({
                success: false,
                message: "Appointment not found to update on DB"
            })
        }

        const isValidUser = appointment.user.id !== req.tokenData.userId

        if(!isValidUser){
            return res.status(401).json({
                success: false,
                message: "Unauthorized to update that appointment"
            })
        }

        if(req.body.appointmentDate){
            if(ValidateDate(req.body.appointmentDate)){
                checkBodyParams.push({appointmentDate: req.body.appointmentDate})
            } else {
                return res.status(400).json({
                    success: false,
                    message: "You dont entered a correct date to update appointment"
                });
            }
        }

        if(req.body.service){
            const knowExistenceOfService = await Service.findOne({
                where: {
                    serviceName: req.body.service
                }
            })
            if(knowExistenceOfService){
                checkBodyParams.push({service: knowExistenceOfService})
            } else {
                return res.status(400).json({
                    success: false,
                    message: "You dont entered a correct service to update appointment"
                });
            }
        }

        if(req.body.establishment){
            const knowExistenceOfEstablishment = await Establishment.findOne({
                where: {
                    address: req.body.establishment
                }
            })
            if(knowExistenceOfEstablishment){
                checkBodyParams.push({establishment: knowExistenceOfEstablishment})
            } else {
                return res.status(400).json({
                    success: false,
                    message: "You dont entered a correct establishment to update appointment"
                });
            }
        }

        if(req.body.tattooer){
            const knowExistenceOfTattooer = await User.findOne({
                where: {
                    fullname: req.body.tattooer
                }
            })
            if(knowExistenceOfTattooer){
                checkBodyParams.push({tattooer: knowExistenceOfTattooer})
            } else {
                return res.status(400).json({
                    success: false,
                    message: "You dont entered a correct tatooer to update appointment"
                });
            }
        }

        for(let i = 0; i < checkBodyParams.length; i++){
            await Appointment.update(
                {id: appointmentId}, checkBodyParams[i]
            )
        }

        return res.status(200).json({
            success: true,
            message: "Appointment updated into DB successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Update appointment into DB failure",
            error: error
        });
    }
}

// ========================================================================================================================================
//  FUNCTION             | ENDPOINT              | FUNCTIONALITY
//                       | GET                   | This function gets a specific appointment by an ID introduced as param on the URL
//  GetAppointmentById() | /api/appointments/:id | But, if the user logged is not assigned to that appointment, is returned an error
// ========================================================================================================================================
export const GetAppointmentById = async (req : Request, res : Response) => {
    try {
        const appointmentId = parseInt(req.params.id)

        const appointment = await Appointment.findOne({
            where: {
                id: appointmentId
            },
            relations:{
                user: true,
                establishment: true,
                tattooer: true,
                service: true
            },
            select:{
                user:{
                    id: true
                },
                establishment:{
                    address: true
                },
                tattooer:{
                    fullname: true,
                    avatar: true
                },
                service:{
                    serviceName: true
                }
            }
        })

        if(!appointment){
            return res.status(404).json({
                success: false,
                message: "Appointment not found on DB"
            })
        }

        if(appointment.user.id !== req.tokenData.userId){
            return res.status(401).json({
                success: false,
                message: "Unauthorized to see that appointment"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Appointment retrieved from DB successfully",
            data: appointment
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Get appointment from DB failure",
            error: error
        });
    }
}

// ========================================================================================================================================
//  FUNCTION           | ENDPOINT           | FUNCTIONALITY
//                     | GET                | This function gets all appointments by ID given from the token inside the petition
//  GetAppointments()  | /api/appointments/ | For doing this petition, you have to be logged in as an user from the app
// ========================================================================================================================================
export const GetAppointments = async (req : Request, res : Response) => {
    try {
        const userId = req.tokenData.userId;

        const appointments = await Appointment.find({
            where: {
                user: {id: userId}
            },
            relations:{
                establishment: true,
                tattooer: true,
                service: true
            },
            select:{
                establishment:{
                    address: true
                },
                service:{
                    serviceName: true
                },
                tattooer:{
                    fullname: true,
                    avatar: true
                },
                appointmentDate: true
            },
            order:{
                appointmentDate : "ASC"
            }
        })

        if(!appointments){
            return res.status(404).json({
                success: false,
                message: "Appointments from user not found on DB"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Appointments from user retrieved from DB successfully",
            data: appointments
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Get user appointments from DB failure",
            error: error
        });
    }
}