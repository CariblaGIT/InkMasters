import { Establishment } from "../models/Establishment";
import { Role } from "../models/Role";
import { User } from "../models/User";
import { AppDataSource } from "./db";
import { generateFakeEstablishments } from "./seeders/seederEstablishments";
import { generateFakeUsers } from "./seeders/seederUsers";
import bcrypt from "bcrypt";

const establishmentsSeedDatabase = async() => {
    AppDataSource.initialize()
    .then(async () => {
        const fakeEstablishments = Array.from({ length: 200 }, generateFakeEstablishments);
        await Establishment.save(fakeEstablishments);
        await AppDataSource.destroy()
    })
    .catch(error => {
        console.log(error)
    });
}

const roleSeedDatabase = async() => {
    AppDataSource.initialize()
    .then(async () => {
        const role1 = new Role();
        role1.name = "user"
        await role1.save();
        const role2 = new Role();
        role2.name = "admin"
        await role2.save();
        const role3 = new Role();
        role3.name = "super_admin"
        await role3.save();
        const role4 = new Role();
        role4.name = "tattooer"
        await role4.save();
        await AppDataSource.destroy();
    })
    .catch(error => {
        console.log(error)
    });
}

const userSeedDatabase = async() => {
    AppDataSource.initialize()
    .then(async () => {
        for(let i = 0; i < 19; i++){
            const fakeUser : User = await generateFakeUsers();
            await User.save(fakeUser);
        }
        await AppDataSource.destroy()
    })
    .catch(error => {
        console.log(error)
    });
}

const defaultUsersSeedDatabase = async() => {
    AppDataSource.initialize()
    .then(async () => {
        const user1 = new User();
        user1.firstName = "Dani"
        user1.lastName = "Tarazona"
        user1.email = "superadmin@superadmin.com"
        user1.passwordHash = bcrypt.hashSync("superAdmin", 8);
        const role1 = await Role.findOne({
            where : {
                name: "super_admin"
            }
        });
        if(role1){
            user1.role = role1;
        }
        await user1.save();
        const user2 = new User();
        user2.firstName = "David"
        user2.lastName = "Ochando Blasco"
        user2.email = "admin@admin.com"
        user2.passwordHash = bcrypt.hashSync("admin", 8);
        const role2 = await Role.findOne({
            where : {
                name: "admin"
            }
        });
        if(role2){
            user2.role = role2;
        }
        await user2.save();
        const user3 = new User();
        user3.firstName = "User"
        user3.lastName = "Normal"
        user3.email = "user@user.com"
        user3.passwordHash = bcrypt.hashSync("1234", 8);
        const role3 = await Role.findOne({
            where : {
                name: "user"
            }
        });
        if(role3){
            user3.role = role3;
        }
        await user3.save();
        const user4 = new User();
        user4.firstName = "Mark"
        user4.lastName = "Inker"
        user4.email = "mark@inkmasters.com"
        user4.passwordHash = bcrypt.hashSync("secretTattooer", 8);
        const role4 = await Role.findOne({
            where : {
                name: "tattooer"
            }
        });
        if(role4){
            user4.role = role4;
        }
        await user4.save();
        await AppDataSource.destroy();
    })
    .catch(error => {
        console.log(error)
    });
}

roleSeedDatabase();
userSeedDatabase();
defaultUsersSeedDatabase();
establishmentsSeedDatabase();
