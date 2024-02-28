CREATE DATABASE IF NOT EXISTS inkMasters;
USE inkMasters;

CREATE TABLE roles(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE services(
	id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT UC_Person UNIQUE (first_name, last_name)
);

CREATE TABLE establishments(
	id INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255) NOT NULL UNIQUE,
    city VARCHAR(255) NOT NULL,
    postal_code INT
);

CREATE TABLE appointments(
	id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_date DATE NOT NULL,
    user_id INT,
    tattooer_id INT,
    service_id INT,
    establishment_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (establishment_id) REFERENCES establishments(id),
    FOREIGN KEY (tattooer_id) REFERENCES users(id)
);

DELIMITER $$

CREATE TRIGGER before_appointment_insert
BEFORE INSERT ON appointments
FOR EACH ROW
BEGIN
    DECLARE user_role VARCHAR(255);
    -- Get the role of the user associated with tattooer_id
    SELECT roles.name INTO user_role
    FROM users
    JOIN roles ON users.role_id = roles.id
    WHERE users.id = NEW.tattooer_id;

    -- Check if the user has the role 'tattooer'
    IF user_role != 'tattooer' THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'The tattooer_id must refer to a user with the role ''tattooer''';
    END IF;
END$$

DELIMITER ;