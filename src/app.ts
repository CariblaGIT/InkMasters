import express, { Application } from "express";
import { auth } from "./middlewares/auth";
import { isSuperAdmin } from "./middlewares/isSuperAdmin";
import { RegisterUser, LoginUser } from "./controllers/authController";
import { DeleteRol, GetRoles, PostRol, UpdateRol } from "./controllers/rolsController";
import { GetUsers, ProfileUser, ModifyUser, DeleteUser, ChangeUserRole} from "./controllers/usersController";
import { GetServices, PostService, UpdateService, DeleteService } from "./controllers/servicesController";
import { PostAppointment, UpdateAppointment, GetAppointmentById, GetAppointments } from "./controllers/appointmentsController";
import { DeleteEstablishment, GetEstablishments, PostEstablishment, UpdateEstablishment } from "./controllers/establishmentsController";
import multer from "multer";
import path from "path";
import cors from "cors";

export const app : Application = express();

const filePath = path.join(__dirname, "./public/uploads")
//Create a storage strategy for multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/uploads");
//     },
//     filename: function (req, file, cb) {
//         // Define the file name format
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// Create a multer instance with the storage strategy
// const upload = multer({ storage: storage });
const upload = multer({ dest: "../public/uploads" });

app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, "../public/uploads")));

/* 
========================================
    METHODS : SERVER STATUS
========================================
*/

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
app.put('/api/users/profile', auth, upload.single('avatar'), ModifyUser);
app.delete('/api/users/:id', auth, isSuperAdmin, DeleteUser);
app.put('/api/users/:id/role', auth, isSuperAdmin, ChangeUserRole);


/* 
========================================
    METHODS : APPOINTMENTS
========================================
*/

app.post('/api/appointments', auth, PostAppointment);
app.put('/api/appointments/', auth, UpdateAppointment);
app.get('/api/appointments/:id', auth, GetAppointmentById);
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