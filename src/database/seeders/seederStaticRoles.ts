import { Role } from "../../models/Role";
import { AppDataSource } from "../db";

export const staticRolesSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        // Role user
        const roleUser = new Role();
        roleUser.name = "user"
        await roleUser.save();

        // Role admin
        const roleAdmin = new Role();
        roleAdmin.name = "admin"
        await roleAdmin.save();

        // Role super_admin
        const roleSuperAdmin = new Role();
        roleSuperAdmin.name = "super_admin"
        await roleSuperAdmin.save();

        // Role tattooer
        const roleTattooer = new Role();
        roleTattooer.name = "tattooer"
        await roleTattooer.save();

    } catch (error) {
        console.log(error);
    } finally {
        await AppDataSource.destroy()
    }
  }