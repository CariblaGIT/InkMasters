import express, { Application } from "express";
import { GetUsers, ProfileUser, ModifyUser, UserByMail, DeleteUser, ChangeUserRole} from "./controllers/usersController";
import { GetServices, PostService, UpdateService, DeleteService } from "./controllers/servicesController";
import { PostAppointment, UpdateAppointment, GetAppointmentById, GetAppointments } from "./controllers/appointmentsController";
import { RegisterUser, LoginUser } from "./controllers/authController";
import { DeleteEstablishment, GetEstablishments, PostEstablishment, UpdateEstablishment } from "./controllers/establishmentsController";

export const app : Application = express();
app.use(express.json());

// Get Healthy Method => Know server is correctly working
app.get('/healthy', (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy :D"
    })
});


/* 
========================================
    METHODS : AUTHENTICATION USERS
========================================
*/

app.post('/api/auth/register', RegisterUser);
app.post('/api/auth/login', LoginUser);


/* 
========================================
    METHODS : USERS
========================================
*/

app.get('/api/users', GetUsers);
app.get('/api/users/profile', ProfileUser);
app.put('/api/users/profile/:id', ModifyUser);
app.get('/api/users/:email', UserByMail);
app.delete('/api/users/:id', DeleteUser);
app.put('/api/users:id/role', ChangeUserRole);


/* 
========================================
    METHODS : APPOINTMENTS
========================================
*/

app.post('/api/appointments', PostAppointment);
app.put('/api/appointments/:id', UpdateAppointment);
app.get('/api/appointments/:id', GetAppointmentById);
app.get('/api/appointments', GetAppointments);


/* 
========================================
    METHODS : SERVICES
========================================
*/

app.get('/api/services', GetServices);
app.post('/api/services', PostService);
app.put('/api/services/:id', UpdateService);
app.delete('/api/services/:id', DeleteService);

/* 
========================================
    METHODS : SERVICES
========================================
*/

app.get('/api/establishments', GetEstablishments);
app.post('/api/establishments', PostEstablishment);
app.put('/api/establishments/:id', UpdateEstablishment);
app.delete('/api/establishments/:id', DeleteEstablishment);