import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role"
import { Appointment } from "./Appointment"

@Entity('users')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({name: 'fullname'})
    fullname!: string

    @Column({name: 'username'})
    username!: string

    @Column({name: 'avatar'})
    avatar!: string

    @Column({name: 'email'})
    email!: string

    @Column({name: 'password_hash', select: false})
    passwordHash!: string

    @Column({name: 'created_at'})
    createdAt!: Date

    @Column({name: 'updated_at'})
    updatedAt!: Date

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn ({ name: "role_id" })
    role!: Role;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    userAppointments!: Appointment[];

    @OneToMany(() => Appointment, (appointment) => appointment.tattooer)
    tattooerAppointments!: Appointment[];

}
