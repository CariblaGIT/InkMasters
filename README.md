<h1 align="center">
  <br>
  <a href="http://www.amitmerchant.com/electron-markdownify"><img src="./img/logo.png" alt="Markdownify" width="200"></a>
</h1>

<h4 align="center">API for tattoo shop bussiness</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#project-objective">Project objective</a> •
  <a href="#stack">Stack</a> •
  <a href="#api">API</a> •
  <a href="#future-improvements">Future improvements</a>
  <a href="#support">Support</a> •
  <a href="#you-may-also-like">You may also like...</a>
</p>

## Key Features

* Implementation of API REST backend using Express, TypeORM & MySQL
* Identification of users by role to access to the different API consults achieved by tokens using JWT (JSON Web Token)
* Server created with Docker and working with MySQL Workbench
* Encryptation of the user password using bcrypt
* Data simulated with seeders

## Project objective

This API is a project focused on the correct implementation of the methods, structure and parts related to the backend of an application that uses a personalized API REST. Focusing on the bussiness model, this project tries to represent how will be the back-end logic for a tattoo shop bussiness, with the users related to the activity, the services the shop offers to customers, the different establishments the company could have and the main feature: the appointments list creation that the shop offers to the customers. 

## Stack
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
</div>

## API

The API makes a relation between the user and the database that is created for the tattoo company InkMasters. The database that is used to achieve this is represented as the following tables:

<div align="center">
    <img src="./img/databaseDiagram.png">
</div>

As the diagram shows, there are 5 tables: roles, users, services, establishments and appointments. For consulting or modifying the content of each one, are used the following endpoints:

### Endpoints and what does each one

On this section, are shown all the endpoints from my API and what does each one, splitted by the differents methods and tables that are related with the consult. <b>IMPORTANT</b>: The super_admin restricted methods are only usable if a user from the DB has logged in using the /auth/login method and has assigned that role, generating a JWT token saved on the request at the tokenData object inside it. If you are using some applications like Postman to check that security, you have to copy paste it inside the Bearer Token Authorization tab.

#### Auth table

| METHOD     | URL                      | Description                                                             |
| ---------- | ------------------------ | ----------------------------------------------------------------------- |
| `POST`     |`/api/auth/register`      | Register method to create an user (by default, will have the user role) |                    
| `POST`     |`/api/auth/login`         | Login a user into the service                                           |

#### Roles table

| METHOD     | URL                       | Description                                                            |
| ---------- | ------------------------- | ---------------------------------------------------------------------- |
| `GET`      |`/api/roles`               | Get all roles from DB (only for super_admin users)                     |
| `POST`     |`/api/roles`               | Post a role into DB (only for super_admin users)                       |
| `UPDATE`   |`/api/roles/{id}`          | Update a role by ID into DB (only for super_admin users)               |
| `DELETE`   |`/api/roles/{id}`          | Delete a role by ID from the DB (only for super_admin users)           |

#### Users table

| METHOD     | URL                       | Description                                                            |
| ---------- | ------------------------- | ---------------------------------------------------------------------- |
| `GET`      |`/api/users`               | Get all users from DB (only for super_admin users)                     |
| `GET`      |`/api/users/profile`       | Get profile from user logged into the API                              |
| `UPDATE`   |`/api/users/profile`       | Update profile from user logged into the API                           |
| `UPDATE`   |`/api/users/{id}/role`     | Update a role from user by ID into DB (only for super_admin users)     |
| `DELETE`   |`/api/users/{id}`          | Delete a user by ID from the DB (only for super_admin users)           |

#### Services table

| METHOD     | URL                       | Description                                                            |
| ---------- | ------------------------- | ---------------------------------------------------------------------- |
| `GET`      |`/api/services`            | Get all services from DB                                               |
| `POST`     |`/api/services`            | Post a service into DB (only for super_admin users)                    |
| `UPDATE`   |`/api/services/{id}`       | Update a service by ID into DB (only for super_admin users)            |
| `DELETE`   |`/api/services/{id}`       | Delete a service by ID from the DB (only for super_admin users)        |

#### Establishments table

| METHOD     | URL                       | Description                                                            |
| ---------- | ------------------------- | ---------------------------------------------------------------------- |
| `GET`      |`/api/establishments`      | Get all establishments from DB                                         |
| `POST`     |`/api/establishments`      | Post an establishment into DB (only for super_admin users)             |
| `UPDATE`   |`/api/establishments/{id}` | Update an establishment by ID into DB (only for super_admin users)     |
| `DELETE`   |`/api/establishments/{id}` | Delete an establishment by ID from the DB (only for super_admin users) |

#### Appointments table

| METHOD     | URL                      | Description                                                            |
| ---------- | ------------------------ | ---------------------------------------------------------------------- |
| `GET`      |`/api/appointments`       | Get all appointments from user logged from DB                          |
| `GET`      |`/api/appointments/{id}`  | Get an appointments from DB                                            |
| `POST`     |`/api/appointments`       | Post an appointment into DB                                            |
| `UPDATE`   |`/api/appointments`       | Update an appointment into DB                                          |

## Future improvements

⬜ Implementing front-end to use the API
<br>
⬜ Implementing Tattoes / Piercings / Dilators entities and his reference into DB
<br>
⬜ Making some restrictions for each role (concretely, the tattoer to get his appointments)
<br>
⬜ Splitting the different validations inside functions

## Support

<div align="center">
<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/purple_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important; box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
</div>

## You may also like...

- [Between Sins](https://gitlab.com/daghdha1/betweensins) - RPG videogame 
- [Mars Alienated](https://gitlab.com/AdrianGarciaAndreu/mars-alienated-rv-htc) - VR escape room experience in a space station

<div align="center">
<a href="https://www.linkedin.com/in/carlos-ibañez-lamas-74487b228/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
<a href="https://gitlab.com/CariblaGTI" target="_blank"><img src="https://img.shields.io/badge/GitLab-330F63?style=for-the-badge&logo=gitlab&logoColor=white" target="_blank"></a>
</div>