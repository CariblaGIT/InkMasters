<h1 align="center">
  <br>
  <a href="http://www.amitmerchant.com/electron-markdownify"><img src="./img/logo.png" alt="Markdownify" width="200"></a>
</h1>

<h4 align="center">API for tattoo shop bussiness</h4>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-project-objective">Project objective</a> •
  <a href="#️-stack">Stack</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-api">API</a> •
  <a href="#️-future-improvements">Future improvements</a> •
  <a href="#-support">Support</a> •
  <a href="#-you-may-also-like">You may also like...</a>
</p>

## 🔑 Key Features

* Implementation of API REST backend using Express, TypeORM & MySQL
* Identification of users by role to access to the different API consults achieved by tokens using JWT (JSON Web Token)
* Server created with Docker and checked with MySQL Workbench
* Encryptation of the user password using bcrypt
* Data simulated with seeders and generated using faker

## 🎯 Project objective

This API is a project focused on the correct implementation of the methods, structure and parts related to the backend of an application that uses a personalized API REST. Focusing on the bussiness model, this project tries to represent how will be the back-end logic for a tattoo shop bussiness, with the users related to the activity, the services the shop offers to customers, the different establishments the company could have and the main feature: the appointments list creation that the shop offers to the customers. 

## ⌨️ Stack
<div align="center">
<a href="https://www.typescriptlang.org/docs/">
    <img src= "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
</a>
<a href="https://www.postman.com/">
    <img src= "https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/>
</a>
<a href="https://www.npmjs.com/">
    <img src= "https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
</a>
<a href="https://jwt.io/">
    <img src= "https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"/>
</a>
<a href="https://www.docker.com/">
    <img src= "https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
</a>
<a href="https://www.mysql.com/">
    <img src= "https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/>
</a>
<a href="https://expressjs.com/en/">
    <img src= "https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"/>
</a>
<a href="https://nodejs.org/en">
    <img src= "https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
</a>
</div>

## 👨‍💻 Installation

Follow the steps to emulate the project in your local device. But is not necessary because the project has been uploaded to Railway (previously on FL0), so you can skip the installation and use the following URL to make all the consults in front of your localhost one: [🚀 Deploy 🚀](https://inkmasters-production-9f96.up.railway.app/healthy)

1. Clone repo
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a Docker container using a MySQL image with the credentials you want to use
4. Create a .env file with your data from the docker you are using on the project, following the .env.sample file variables and at that level of the director files
5. Initialize database with the migrations (if you dont do the previous .env creation, will be used not real data):
    ```bash
    npm run run-migrations
    ```
6. Insert data into database using the seeder command:
    ```bash
    npm run seeder
    ```
7. Initialize API:
    ```bash
    npm run dev
    ```
8. Use the endpoints on Postman or other applications with the respective elements to get all data

## 🔗 API

The API makes a relation between the user and the database that is created for the tattoo company InkMasters. The database that is used to achieve this is represented as the following tables:

<div align="center">
    <img src="./img/databaseDiagram.png">
</div>

As the diagram shows, there are 5 tables: roles, users, services, establishments and appointments. For consulting or modifying the content of each one, are used the following endpoints:

### Endpoints and what does each one

On this section, are shown all the endpoints from my API and what does each one, splitted by the differents methods and tables that are related with the consult. <b>IMPORTANT</b>: The super_admin restricted methods are only usable if a user from the DB has logged in using the /auth/login method and has assigned that role, generating a JWT token saved on the request at the tokenData object inside it. If you are using some applications like Postman to check that security, you have to copy paste it inside the Bearer Token Authorization tab. Moreover, there are some other methods that has to be logged as /profile or GET /appointments.

Also, here you will get the data from 4 users, all roles, 2 establishments and all services that are created by the seeder, to have data to make the petitions you desire (if you dont execute the seeder, you will not have created this data, and you will not create the random data for all the tables):

* ROLES

```JSON
{
    {
        "id": 1,
        "name": "user"
    },
    {
        "id": 2,
        "name": "admin"
    },
    {
        "id": 3,
        "name": "super_admin"
    },
    {
        "id": 4,
        "name": "tattooer"
    }
}
```

* USERS

```JSON
{
    {
        "first_name": "Dani",
        "last_name": "Tarrazona",
        "email": "superadmin@superadmin.com",
        "password": "superAdmin",
        "role": "super_admin"
    },
    {
        "first_name": "David",
        "last_name": "Ochando Blasco",
        "email": "admin@admin.com",
        "password": "admin",
        "role": "admin"
    },
    {
        "first_name": "User",
        "last_name": "Normal",
        "email": "user@user.com",
        "password": "1234",
        "role": "user"
    },
    {
        "first_name": "Mark",
        "last_name": "Inker",
        "email": "mark@inkmasters.com",
        "password": "secretTattooer",
        "role": "tattooer"
    }
}
```

* SERVICES

```JSON
{
    {
        "service_name": "Custom tattoos",
        "description": "The customers will have the freedom to select unique motifs and designs, completely customize your tattoo experience according to your preferences and tastes."
    },
    {
        "service_name": "Catalogue tattoos",
        "description": "We offer tattoos based on predefined designs in our catalogue. Customers can choose from a variety of stylish and proven options."
    },
    {
        "service_name": "Restoration and rejuvenation",
        "description": "We specialize in the restoration and rejuvenation of existing tattoos. Our experts work to improve and renew old tattoos, restoring their vitality."
    },
    {
        "service_name": "Piercings and dilators",
        "description": "We offer professional services for the placement of piercings and dilators. Our team ensures safe procedures and varied styles to satisfy individual preferences of our clients."
    },
    {
        "service_name": "Piercings sellings and other articles",
        "description": "In addition to our application services, we offer a selection of piercings and other items related to body art. Customers can purchase quality products for complement your unique style."
    }
}
```

* ESTABLISHMENTS

```JSON
{
    {
        "address": "Avenida del Cid, 12345",
        "city": "Valencia",
        "postal_code": 46018
    },
    {
        "address": "Calle de las Alegrias y Amarguras, 123",
        "city": "Cadiz",
        "postal_code": 43128
    }
}
```

#### Avatars

| METHOD     | URL                      | Description                                                                 |
| ---------- | ------------------------ | --------------------------------------------------------------------------- |
| `URL`      |`/public/{img-name}`      | Method to get the images uploaded from users to update their avatars        |

#### Auth table

| METHOD     | URL                      | Description                                                                 |
| ---------- | ------------------------ | --------------------------------------------------------------------------- |
| `POST`     |`/api/auth/register`      | Register method to create an user (by default, will have the user role)     |                    
| `POST`     |`/api/auth/login`         | Login a user into the service                                               |

#### Roles table

| METHOD     | URL                       | Description                                                                |
| ---------- | ------------------------- | -------------------------------------------------------------------------- |
| `GET`      |`/api/roles`               | Get all roles from DB (only for super_admin users)                         |
| `POST`     |`/api/roles`               | Post a role into DB (only for super_admin users)                           |
| `UPDATE`   |`/api/roles/{id}`          | Update a role by ID into DB (only for super_admin users)                   |
| `DELETE`   |`/api/roles/{id}`          | Delete a role by ID from the DB (only for super_admin users)               |

#### Users table

| METHOD     | URL                       | Description                                                                |
| ---------- | ------------------------- | -------------------------------------------------------------------------- |
| `GET`      |`/api/users`               | Get all users from DB (only for super_admin users) or get a user by email  |
| `GET`      |`/api/users/profile`       | Get profile from user logged into the API                                  |
| `UPDATE`   |`/api/users/profile`       | Update profile from user logged into the API                               |
| `UPDATE`   |`/api/users/{id}/role`     | Update a role from user by ID into DB (only for super_admin users)         |
| `DELETE`   |`/api/users/{id}`          | Delete a user by ID from the DB (only for super_admin users)               |

#### Services table

| METHOD     | URL                       | Description                                                                |
| ---------- | ------------------------- | -------------------------------------------------------------------------- |
| `GET`      |`/api/services`            | Get all services from DB                                                   |
| `POST`     |`/api/services`            | Post a service into DB (only for super_admin users)                        |
| `UPDATE`   |`/api/services/{id}`       | Update a service by ID into DB (only for super_admin users)                |
| `DELETE`   |`/api/services/{id}`       | Delete a service by ID from the DB (only for super_admin users)            |

#### Establishments table

| METHOD     | URL                       | Description                                                                |
| ---------- | ------------------------- | -------------------------------------------------------------------------- |
| `GET`      |`/api/establishments`      | Get all establishments from DB                                             |
| `POST`     |`/api/establishments`      | Post an establishment into DB (only for super_admin users)                 |
| `UPDATE`   |`/api/establishments/{id}` | Update an establishment by ID into DB (only for super_admin users)         |
| `DELETE`   |`/api/establishments/{id}` | Delete an establishment by ID from the DB (only for super_admin users)     |

#### Appointments table

| METHOD     | URL                      | Description                                                                 |
| ---------- | ------------------------ | --------------------------------------------------------------------------- |
| `GET`      |`/api/appointments`       | Get all appointments from user logged from DB                               |
| `GET`      |`/api/appointments/{id}`  | Get an appointments from DB                                                 |
| `POST`     |`/api/appointments`       | Post an appointment into DB                                                 |
| `UPDATE`   |`/api/appointments`       | Update an appointment into DB                                               |
| `DELETE`   |`/api/appointments/{id}`  | Delete an appointment by ID from the DB (only owner)                        |

### Body to give and in which method is required to use it

* POST in /api/auth/register
```js
{
    "first_name" : "Mariano",
    "last_name": "LaJoiosa",
    "email": "abecedeefegehache@inkmaster.com",
    "password_hash": "1Az*F3x$KEq2ZX",
    "role": "tattooer"
}
```

* POST in /api/auth/login
```js
{
    "email" : "superadmin@superadmin.com",
    "password": "superAdmin"
}
```

* GET in api/users (could be without body if you want to get all users)
```js
{
    "email": "user@user.com"
}
```

* POST in /api/roles
```js
{
    "role_name" : "cleaner"
}
```

* PUT in /api/roles
```js
{
    "name" : "tatooer"
}
```

* PUT in api/users/profile (you can select some or all this params inside the body)
```js
{
    "firstName": "Carlos",
    "lastName": "Ibañez Lamas",
    "email": "example@gmail.com",
    "passwordHash": 'Um2$Zsv_P7#xs%'
}
```

* PUT in api/users/:id/role
```js
{
    "role": "super_admin"
}
```

* POST in api/services
```js
{
    "service_name" : "Washing tattoo",
    "description": "For offering a nice result to the tattoos, you can ask for a cleaning session to remove the exceeded ink and to keep the result good"
}
```

* PUT in api/services/:id (you can select some or all this params inside the body)
```js
{
    "serviceName": "New hyper realistic tattoos",
    "description": "Extra realistic tattoo result from a session"
}
```

* POST in api/establishments
```js
{
    "establishment_address" : "Av del Cid, 112",
    "establishment_city": "Valencia",
    "establishment_postal_code": 46017
}
```

* PUT in api/establishments/:id (you can select some or all this params inside the body)
```js
{
    "address": "Calle Estados Unidos del Norte, 123",
    "city": "La Marimorena",
    "postalCode": 46018
}
```

* POST in api/appointments
```js
{
    "appointment_date": "2030-10-30 14:23",
    "service_name": "Catalogue tattoos",
    "establishment": "Extramuros Marta, 46 Esc. 986",
    "tattooer": "mark@inkmasters.com"
}
```

* PUT in api/appointments/:id (you can select some or all this params inside the body, but IS NECESSARY THE ID)
```js
{
    "establishment": "Plaza Teresa Rodarte, 72 Puerta 109",
    "tatooer": "mark@inkmasters.com",
    "service": "Restoration and rejuvenation",
    "appointmentDate": "3333-04-05 13:54",
    "id": 1
}
```

## 🛠️ Future improvements

✅ Implementing front-end to use the API
<br>
✅ Implementing avatars for each user using Multer library
<br>
⬜ Making some restrictions for each role (concretely, the tattoer to get his appointments)
<br>
⬜ Splitting the different validations inside functions

## 👀 You may also like...

- [Between Sins](https://gitlab.com/daghdha1/betweensins) - RPG videogame 
- [Mars Alienated](https://gitlab.com/AdrianGarciaAndreu/mars-alienated-rv-htc) - VR escape room experience in a space station

<div align="center">
<a href="https://www.linkedin.com/in/carlos-ibañez-lamas-74487b228/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
<a href="https://gitlab.com/CariblaGTI" target="_blank"><img src="https://img.shields.io/badge/GitLab-330F63?style=for-the-badge&logo=gitlab&logoColor=white" target="_blank"></a>
</div>