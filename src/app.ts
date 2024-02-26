import express, { Application } from "express";
import { RegisterUser, LoginUser, GetUsers, ProfileUser, ModifyUser, UserByMail, DeleteUser, ChangeUserRole} from "./controllers/usersController";
import { GetServices, PostService, UpdateService, DeleteService } from "./controllers/servicesController";
import { PostAppointment, UpdateAppointment, GetAppointmentById, GetAppointments } from "./controllers/appointmentsController";

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

app.post('/auth/register', RegisterUser);
app.post('/auth/login', LoginUser);


/* 
========================================
    METHODS : USERS
========================================
*/

app.get('/users', GetUsers);
app.get('/users/profile', ProfileUser);
app.put('/users/profile', ModifyUser);
app.get('/users?email', UserByMail);
app.delete('/users:id', DeleteUser);
app.put('/users:id/role', ChangeUserRole);


/* 
========================================
    METHODS : APPOINTMENTS
========================================
*/

app.post('/appointments', PostAppointment);
app.put('/appointments', UpdateAppointment);
app.get('/appointments:id', GetAppointmentById);
app.get('/appointments', GetAppointments);


/* 
========================================
    METHODS : SERVICES
========================================
*/

app.get('/services', GetServices);
app.post('/services', PostService);
app.put('/services:id', UpdateService);
app.delete('/services:id', DeleteService);