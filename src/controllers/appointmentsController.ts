import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";

export const PostAppointment = (req : Request, res : Response) => {

}

export const UpdateAppointment = (req : Request, res : Response) => {

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