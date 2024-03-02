import { fakerES as faker } from '@faker-js/faker';
import { User } from '../../models/User';
import { Role } from '../../models/Role';
import bcrypt from "bcrypt";

// Seeder function using faker to simulate random spanish user data
export const generateFakeUsers = async () => {
    const user : User = new User();
    const listRoles = await Role.find();
    const role = listRoles[Math.floor(Math.random() * listRoles.length)]
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.passwordHash = bcrypt.hashSync(faker.internet.password(), 8);
    user.role = role;
    return user;
};