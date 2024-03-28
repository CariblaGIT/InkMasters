import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Service } from "./Service";
import { Establishment } from "./Establishment";
import { User } from "./User";

@Entity("appointments")
export class Appointment extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: 'appointment_date'})
    appointmentDate!: Date

    @ManyToOne(() => Service, (service) => service.appointments)
    @JoinColumn ({ name: "service_id" })
    service!: Service;

    @ManyToOne(() => Establishment, (establishment) => establishment.appointments)
    @JoinColumn ({ name: "establishment_id" })
    establishment!: Establishment;

    @ManyToOne(() => User, (user) => user.userAppointments)
    @JoinColumn ({ name: "user_id" })
    user!: User;

    @ManyToOne(() => User, (user) => user.tattooerAppointments)
    @JoinColumn ({ name: "tattooer_id" })
    tattooer!: User;

}
