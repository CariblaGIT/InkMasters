import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Service } from "./Service";
import { Establishment } from "./Establishment";
import { User } from "./User";

@Entity()
export class Appointment extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: 'appointment_date'})
    appointmentDate!: Date

    @ManyToOne(() => Service, (service) => service.appointments)
    @JoinColumn ({ name: "service_id" })
    service!: Service;

    @ManyToOne(() => Establishment, (estableshiment) => estableshiment.appointments)
    @JoinColumn ({ name: "estableshiment_id" })
    estableshiment!: Establishment;

    @ManyToOne(() => User, (user) => user.userAppointments)
    @JoinColumn ({ name: "user_id" })
    user!: User;

    @ManyToOne(() => User, (user) => user.tattooerAppointments)
    @JoinColumn ({ name: "tattoer_id" })
    tatooer!: User;

}
