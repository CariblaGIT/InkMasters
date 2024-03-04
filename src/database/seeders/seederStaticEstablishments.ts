import { AppDataSource } from "../db";
import { Establishment } from "../../models/Establishment";

export const staticEstablishmentsSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        //Establishment1
        const establishment1 = new Establishment();
        establishment1.address = "Avenida del Cid, 12345";
        establishment1.city = "Valencia";
        establishment1.postalCode = 46018
        await establishment1.save();

        //Establishment2
        const establishment2 = new Establishment();
        establishment2.address = "Calle de las Alegrias y Amarguras, 123";
        establishment2.city = "Cadiz";
        establishment2.postalCode = 43128
        await establishment2.save();
    } catch (error) {
        console.log(error);
    } finally {
        await AppDataSource.destroy()
    }
  }