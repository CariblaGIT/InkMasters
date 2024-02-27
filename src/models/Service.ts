import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment";

@Entity()
export class Service {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: 'service_name'})
    serviceName!: string

    @Column({name: 'description'})
    description!: string

    @Column({name: 'created_at'})
    createdAt!: Date

    @Column({name: 'updated_at'})
    updatedAt!: Date

    @OneToMany(() => Appointment, (appointment) => appointment.service)
    appointments!: Appointment[];

}
