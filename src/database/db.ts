import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { Role1709046301199 } from "./migrations/1709046301199-role";
import { User1709046422962 } from "./migrations/1709046422962-user";
import { Service1709046816685 } from "./migrations/1709046816685-service";
import { Establishment1709048119354 } from "./migrations/1709048119354-establishment";
import { Appointment1709048828757 } from "./migrations/1709048828757-appointment";
import { TattooerCheckConstrait1709049515463 } from "./migrations/1709049515463-tattooerCheckConstrait";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "test",
    entities: [],
    migrations:[Role1709046301199, User1709046422962, Service1709046816685, Establishment1709048119354, Appointment1709048828757, TattooerCheckConstrait1709049515463],
    synchronize: false,
    logging: false,
})