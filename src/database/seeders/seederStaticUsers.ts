import bcrypt from "bcrypt";
import { AppDataSource } from "../db";
import { Role } from "../../models/Role";
import { User } from "../../models/User";

export const staticUsersSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        // User1 as super_admin user
        const userSuperAdmin = new User();
        userSuperAdmin.fullname = "Dani Tarazona"
        userSuperAdmin.username = "danitarazona"
        userSuperAdmin.email = "superadmin@superadmin.com"
        userSuperAdmin.passwordHash = bcrypt.hashSync("superAdmin", 8);
        userSuperAdmin.role = new Role();
        userSuperAdmin.role.id = 3;
        await userSuperAdmin.save();

        // User2 as admin user
        const userAdmin = new User();
        userAdmin.fullname = "David Ochando Blasco"
        userAdmin.username = "davidochandoblasco"
        userAdmin.email = "admin@admin.com"
        userAdmin.passwordHash = bcrypt.hashSync("admin", 8);
        userAdmin.role = new Role();
        userAdmin.role.id = 2;
        await userAdmin.save();

        // User3 as normal user
        const user = new User();
        user.fullname = "User Normal"
        user.username = "usernormal"
        user.email = "user@user.com"
        user.passwordHash = bcrypt.hashSync("1234", 8);
        user.role = new Role();
        user.role.id = 1;
        await user.save();

        // User4 as tatooer user
        const tattooer = new User();
        tattooer.fullname = "Mark Inker"
        tattooer.username = "markinker"
        tattooer.email = "mark@inkmasters.com"
        tattooer.passwordHash = bcrypt.hashSync("secretTattooer", 8);
        tattooer.role = new Role();
        tattooer.role.id = 4;
        await tattooer.save();
    } catch (error) {
        console.log(error);
    } finally {
        await AppDataSource.destroy()
    }
  }