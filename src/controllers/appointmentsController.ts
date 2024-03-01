import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { ValidateDate } from "../helpers/validateDate";
import { Service } from "../models/Service";
import { User } from "../models/User";
import { Establishment } from "../models/Establishment";

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
            firstName: reqTattooer
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

        const newAppointment = await Appointment.create({
            appointmentDate: reqDate,
            service: knowExistenceOfService,
            establishment: knowExistenceOfEstablishment,
            tatooer: knowExistenceOfTattooer,
            user: {id: reqUserId}
        }).save()

        return res.status(201).json({
            success: true,
            message: "Appointment registered into DB successfully",
            data: newAppointment
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Register appointment failure",
            error: error
        });
    }
}

export const UpdateAppointment = async (req : Request, res : Response) => {
    try {
        const appointmentId = req.body.id;

        if(!parseInt(appointmentId)){
            return res.status(400).json({
                success: false,
                message: "You dont entered a correct ID to update appointment"
            });
        }

        const appointment = await Appointment.findOneBy({
            id: parseInt(appointmentId)
        })

        if(!appointment){
            return res.status(404).json({
                success: false,
                message: "Appointment not found to update on DB"
            })
        }

        if(appointment.user.id !== req.tokenData.userId){
            return res.status(401).json({
                success: false,
                message: "Unauthorized to update that appointment"
            })
        }

        const appointmentUpdate = await Appointment.update(
            {id: parseInt(appointmentId)}, req.body
        )

        return res.status(200).json({
            success: true,
            message: "Appointment updated into DB successfully",
            data: appointmentUpdate
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Update appointment into DB failure",
            error: error
        });
    }
}

export const GetAppointmentById = async (req : Request, res : Response) => {
    try {
        const appointmentId = req.params.id

        const appointment = await Appointment.findOneBy({
            id: parseInt(appointmentId)
        })

        if(!appointment){
            return res.status(404).json({
                success: false,
                message: "Appointment not found on DB"
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

export const GetAppointments = async (req : Request, res : Response) => {
    try {
        const userId = req.tokenData.userId;

        const appointments = await Appointment.find({
            where: {
                user: {id: userId}
            },
            relations:{
                establishment: true,
                tatooer: true,
                service: true
            },
            select:{
                establishment:{
                    address: true,
                    city: false,
                    postalCode: false
                },
                service:{
                    serviceName: true
                },
                tatooer:{
                    firstName: true
                },
                appointmentDate: true
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