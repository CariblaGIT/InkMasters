import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment"

@Entity()
export class Establishment {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: 'address'})
    address!: string

    @Column({name: 'city'})
    city!: string

    @Column({name: 'postal_code'})
    postalCode!: number

    @OneToMany(() => Appointment, (appointment) => appointment.estableshiment)
    appointments!: Appointment[];

}
