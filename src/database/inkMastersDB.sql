CREATE DATABASE IF NOT EXISTS inkMasters;
USE inkMasters;

CREATE TABLE rols(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE services(
	id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES rols(id),
    CONSTRAINT UC_Person UNIQUE (first_name, last_name)
);

CREATE TABLE appointments(
	id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_date DATE NOT NULL,
    user_id INT,
    service_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);