import { AppDataSource } from "../db";
import { Appointment } from "../../models/Appointment";
import { generateFakeAppointments } from "./seederAppointments";

export const randomAppointmentsSeedDatabase = async() => {
    try {
        await AppDataSource.initialize();
        // Insert random appointments with the generateFakeEstablishments function:
        for(let i = 0; i < 19; i++){
            const fakeAppointment : Appointment = await generateFakeAppointments();
            await Appointment.save(fakeAppointment);
        }
    } catch (error) {
        console.log(error);
    } finally {
        await AppDataSource.destroy()
    }
}