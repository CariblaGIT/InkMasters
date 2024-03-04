import { AppDataSource } from "../db";
import { User } from "../../models/User";
import { Service } from "../../models/Service";
import { Appointment } from "../../models/Appointment";
import { Establishment } from "../../models/Establishment";

export const staticAppointmentsSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        //Establishment1
        const appointment1 = new Appointment();
        appointment1.appointmentDate = new Date("2023-03-19");
        appointment1.tatooer = new User();
        appointment1.tatooer.id = 4;
        appointment1.user = new User();
        appointment1.user.id = 3;
        appointment1.establishment = new Establishment();
        appointment1.establishment.id = 2;
        appointment1.service = new Service();
        appointment1.service.id = 2;
        await appointment1.save();

        //Establishment2
        const appointment2 = new Appointment();
        appointment2.appointmentDate = new Date("2023-03-24");
        appointment2.tatooer = new User();
        appointment2.tatooer.id = 4;
        appointment2.user = new User();
        appointment2.user.id = 1;
        appointment2.establishment = new Establishment();
        appointment2.establishment.id = 1;
        appointment2.service = new Service();
        appointment2.service.id = 1;
        await appointment2.save();
    } catch (error) {
        console.log(error);
    } finally {
        await AppDataSource.destroy()
    }
  }