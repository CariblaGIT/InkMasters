import { Establishment } from "../models/Establishment";
import { AppDataSource } from "./db";
import { generateFakeEstablishments } from "./seeders/seederEstablishments";

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

establishmentsSeedDatabase()