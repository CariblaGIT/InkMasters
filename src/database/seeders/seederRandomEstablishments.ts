import { AppDataSource } from "../db";
import { Establishment } from "../../models/Establishment";
import { generateFakeEstablishments } from "./seederEstablishments";

export const randomEstablishmentsSeedDatabase = async() => {
    try {
        await AppDataSource.initialize();
        // Insert random establishmments with the generateFakeEstablishments function:
        const fakeEstablishments = Array.from({ length: 30 }, generateFakeEstablishments);
        await Establishment.save(fakeEstablishments);
    } catch (error) {
        console.log(error);
    } finally {
        await AppDataSource.destroy();
    }
}
