import { staticRolesSeedDatabase } from "./seeders/seederStaticRoles"
import { staticUsersSeedDatabase } from "./seeders/seederStaticUsers";
import { randomUsersSeedDatabase } from "./seeders/seederRandomUsers";
import { staticServicesSeedDatabase } from "./seeders/seederStaticServices";
import { staticAppointmentsSeedDatabase } from "./seeders/seederStaticAppointments";
import { randomAppointmentsSeedDatabase } from "./seeders/seederRandomAppointments";
import { staticEstablishmentsSeedDatabase } from "./seeders/seederStaticEstablishments";
import { randomEstablishmentsSeedDatabase} from "./seeders/seederRandomEstablishments";

// Seeder function to create all data inside the AppdataSource database object
const launchSeeder = async () => {
    await staticRolesSeedDatabase();
    await staticUsersSeedDatabase();
    await randomUsersSeedDatabase();
    await staticServicesSeedDatabase();
    await staticEstablishmentsSeedDatabase();
    await randomEstablishmentsSeedDatabase();
    await staticAppointmentsSeedDatabase();
    await randomAppointmentsSeedDatabase();
}

launchSeeder();