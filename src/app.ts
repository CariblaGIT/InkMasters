import express, { Application } from "express";
import { GetUsers, ProfileUser, ModifyUser, DeleteUser, ChangeUserRole} from "./controllers/usersController";
import { GetServices, PostService, UpdateService, DeleteService } from "./controllers/servicesController";
import { PostAppointment, UpdateAppointment, GetAppointmentById, GetAppointments } from "./controllers/appointmentsController";
import { RegisterUser, LoginUser } from "./controllers/authController";
import { DeleteEstablishment, GetEstablishments, PostEstablishment, UpdateEstablishment } from "./controllers/establishmentsController";
import { auth } from "./middlewares/auth";
import { isSuperAdmin } from "./middlewares/isSuperAdmin";
import { DeleteRol, GetRoles, PostRol, UpdateRol } from "./controllers/rolsController";

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
    METHODS : ROLES
========================================
*/

app.get('/api/roles', auth, isSuperAdmin, GetRoles);
app.post('/api/roles', auth, isSuperAdmin, PostRol);
app.put('/api/roles/:id', auth, isSuperAdmin, UpdateRol);
app.delete('/api/roles/:id', auth, isSuperAdmin, DeleteRol);


/* 
========================================
    METHODS : USERS
========================================
*/

app.get('/api/users', auth, isSuperAdmin, GetUsers);
app.get('/api/users/profile', auth, ProfileUser);
app.put('/api/users/profile', auth, ModifyUser);
app.delete('/api/users/:id', auth, isSuperAdmin, DeleteUser);
app.put('/api/users/:id/role', auth, isSuperAdmin, ChangeUserRole);


/* 
========================================
    METHODS : APPOINTMENTS
========================================
*/

app.post('/api/appointments', auth, PostAppointment);
app.put('/api/appointments/', auth, UpdateAppointment);
app.get('/api/appointments/:id', GetAppointmentById);
app.get('/api/appointments', auth, GetAppointments);


/* 
========================================
    METHODS : SERVICES
========================================
*/

app.get('/api/services', GetServices);
app.post('/api/services', auth, isSuperAdmin, PostService);
app.put('/api/services/:id', auth, isSuperAdmin, UpdateService);
app.delete('/api/services/:id', auth, isSuperAdmin, DeleteService);


/* 
========================================
    METHODS : ESTABLISHMENTS
========================================
*/

app.get('/api/establishments', GetEstablishments);
app.post('/api/establishments', auth, isSuperAdmin, PostEstablishment);
app.put('/api/establishments/:id', auth, isSuperAdmin, UpdateEstablishment);
app.delete('/api/establishments/:id', auth, isSuperAdmin, DeleteEstablishment);