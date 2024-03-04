import { AppDataSource } from "../db";
import { User } from "../../models/User";
import { generateFakeUsers } from "./seederUsers";

export const randomUsersSeedDatabase = async() => {
    try {
        await AppDataSource.initialize();
        // Insert random users with the generateFakeUsers function:
        for(let i = 0; i < 19; i++){
            const fakeUser : User = await generateFakeUsers();
            await User.save(fakeUser);
        }
    } catch (error) {
        console.log(error);
    } finally {
        await AppDataSource.destroy()
    }
}