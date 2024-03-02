import bcrypt from "bcrypt";
import { AppDataSource } from "./db";
import { Role } from "../models/Role";
import { User } from "../models/User";
import { Service } from "../models/Service";
import { Establishment } from "../models/Establishment";
import { generateFakeUsers } from "./seeders/seederUsers";
import { generateFakeEstablishments } from "./seeders/seederEstablishments";

// Seeder function to create all data inside the AppdataSource database object
const seedDataBase = async () => {
    await AppDataSource.initialize()
    .then(async () => {
        // Insert roles :

        // Role user
        const role1 = new Role();
        role1.name = "user"
        await role1.save();

        // Role admin
        const role2 = new Role();
        role2.name = "admin"
        await role2.save();

        // Role super_admin
        const role3 = new Role();
        role3.name = "super_admin"
        await role3.save();

        // Role tattooer
        const role4 = new Role();
        role4.name = "tattooer"
        await role4.save();

        //Insert basic users:

        // User1 as super_admin user
        const user1 = new User();
        user1.firstName = "Dani"
        user1.lastName = "Tarazona"
        user1.email = "superadmin@superadmin.com"
        user1.passwordHash = bcrypt.hashSync("superAdmin", 8);
        const userRole1 = await Role.findOne({
            where : {
                name: "super_admin"
            }
        });
        if(userRole1){
            user1.role = userRole1;
            await user1.save();
        }

        // User2 as admin user
        const user2 = new User();
        user2.firstName = "David"
        user2.lastName = "Ochando Blasco"
        user2.email = "admin@admin.com"
        user2.passwordHash = bcrypt.hashSync("admin", 8);
        const userRole2 = await Role.findOne({
            where : {
                name: "admin"
            }
        });
        if(userRole2){
            user2.role = userRole2;
            await user2.save();
        }

        // User3 as normal user
        const user3 = new User();
        user3.firstName = "User"
        user3.lastName = "Normal"
        user3.email = "user@user.com"
        user3.passwordHash = bcrypt.hashSync("1234", 8);
        const userRole3 = await Role.findOne({
            where : {
                name: "user"
            }
        });
        if(userRole3){
            user3.role = userRole3;
            await user3.save();
        }

        // User4 as tatooer user
        const user4 = new User();
        user4.firstName = "Mark"
        user4.lastName = "Inker"
        user4.email = "mark@inkmasters.com"
        user4.passwordHash = bcrypt.hashSync("secretTattooer", 8);
        const userRole4 = await Role.findOne({
            where : {
                name: "tattooer"
            }
        });
        if(userRole4){
            user4.role = userRole4;
            await user4.save();
        }

        // Insert random users with the generateFakeUsers function:
        for(let i = 0; i < 19; i++){
            const fakeUser : User = await generateFakeUsers();
            await User.save(fakeUser);
        }

        // Insert random establishmments with the generateFakeEstablishments function:
        const fakeEstablishments = Array.from({ length: 30 }, generateFakeEstablishments);
        await Establishment.save(fakeEstablishments);

        // Insert services:

        //Service1 as custom tatoos
        const service1 = new Service();
        service1.serviceName = "Custom tattoos"
        service1.description = "The customers will have the freedom to select unique motifs and designs, completely customize your tattoo experience according to your preferences and tastes."
        await service1.save();

        //Service2 as catalogue tatoos
        const service2 = new Service();
        service2.serviceName = "Catalogue tattoos"
        service2.description = "We offer tattoos based on predefined designs in our catalogue. Customers can choose from a variety of stylish and proven options."
        await service2.save();

        //Service3 as restoration
        const service3 = new Service();
        service3.serviceName = "Restoration and rejuvenation"
        service3.description = "We specialize in the restoration and rejuvenation of existing tattoos. Our experts work to improve and renew old tattoos, restoring their vitality."
        await service3.save();

        //Service4 as piercings and dilators
        const service4 = new Service();
        service4.serviceName = "Piercings and dilators"
        service4.description = "We offer professional services for the placement of piercings and dilators. Our team ensures safe procedures and varied styles to satisfy individual preferences of our clients."
        await service4.save();

        //Service5 as sellings and others
        const service5 = new Service();
        service5.serviceName = "Piercings sellings and other articles"
        service5.description = "In addition to our application services, we offer a selection of piercings and other items related to body art. Customers can purchase quality products for complement your unique style."
        await service5.save();

        //Close connection
        await AppDataSource.destroy()
    })
    .catch(error => {
        console.log(error)
    });
}

// Executing the seeder function
seedDataBase();