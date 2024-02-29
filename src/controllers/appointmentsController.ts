import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { ValidateDate } from "../helpers/validateDate";

export const PostAppointment = async (req : Request, res : Response) => {
    try {

        const reqDate : Date = req.body.appointment_date;
        const reqServiceId : number = parseInt(req.body.service_id);
        const reqEstablishmentId : number = parseInt(req.body.establishment_id);
        const reqTattooerId : number = parseInt(req.body.tattooer_id);
        const reqUserId : number = parseInt(req.body.user_id);

        if(isNaN(reqServiceId) || isNaN(reqEstablishmentId) || isNaN(reqTattooerId) || isNaN(reqUserId)){
            return res.status(400).json({
                success: false,
                message: "1 or more IDs are bad written (not numbers)"
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
            service: {id: reqServiceId},
            establishment: {id: reqEstablishmentId},
            tatooer: {id: reqTattooerId},
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
        const appointmentId = req.params.id;

        const appointment = await Appointment.findOneBy({
            id: parseInt(appointmentId)
        })

        if(!appointment){
            return res.status(404).json({
                success: false,
                message: "Appointment not found to update on DB"
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
        const userId = parseInt(req.query.userId as string, 10)

        const appointments = await Appointment.find({
            where: {
                user: {id: userId}
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