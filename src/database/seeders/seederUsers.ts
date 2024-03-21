import { fakerES as faker } from '@faker-js/faker';
import { User } from '../../models/User';
import { Role } from '../../models/Role';
import bcrypt from "bcrypt";

// Seeder function using faker to simulate random spanish user data
export const generateFakeUsers = async () => {
    const user : User = new User();
    const listRoles = await Role.find();
    const role = listRoles[Math.floor(Math.random() * listRoles.length)]
    const name = faker.person.fullName();
    const searchRegExp = /\s/g;
    const usernameAccents = (name.replace(searchRegExp, "")).toLowerCase();
    const username = usernameAccents.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    user.fullname = name
    user.username = username;
    user.email = username+"@gmail.com";
    user.passwordHash = bcrypt.hashSync((username+"123#A"), 8);
    user.role = role;
    return user;
};