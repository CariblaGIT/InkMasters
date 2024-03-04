import { fakerES as faker } from '@faker-js/faker';
import { User } from "../../models/User";
import { Service } from "../../models/Service";
import { Appointment } from "../../models/Appointment";
import { Establishment } from "../../models/Establishment";

export const generateFakeAppointments = async () => {
    const appointment : Appointment = new Appointment();

    const listServices = await Service.find();
    const service = listServices[Math.floor(Math.random() * listServices.length)];
    appointment.service = service;

    const listEstablishments = await Establishment.find();
    const establishment = listEstablishments[Math.floor(Math.random() * listEstablishments.length)];
    appointment.establishment = establishment;

    const listUsers = await User.find();
    const user = listUsers[Math.floor(Math.random() * listUsers.length)];
    appointment.user = user;

    const listSTattooers = await User.find({
        where: {
            role: {
                name: "tattooer"
            }
        }
    });
    const tattooer = listSTattooers[Math.floor(Math.random() * listSTattooers.length)];
    appointment.tatooer = tattooer;

    appointment.appointmentDate = faker.date.anytime();

    return appointment;
}