import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment"

@Entity("establishments")
export class Establishment extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: 'address'})
    address!: string

    @Column({name: 'city'})
    city!: string

    @Column({name: 'postal_code'})
    postalCode!: number

    @OneToMany(() => Appointment, (appointment) => appointment.establishment)
    appointments!: Appointment[];

}
