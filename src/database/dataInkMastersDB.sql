INSERT INTO rols (name) VALUES ('admin'), ('super_admin'), ('user');

INSERT INTO services (service_name, description) VALUES 
	('Custom tattoos', 'The customers will have the freedom to select unique motifs and designs, completely customize your tattoo experience according to your preferences and tastes.'),
    ('Catalogue tattoo', 'We offer tattoos based on predefined designs in our catalogue. Customers can choose from a variety of stylish and proven options.'),
    ('Restoration and rejuvenation', 'We specialize in the restoration and rejuvenation of existing tattoos. Our experts work to improve and renew old tattoos, restoring their vitality.'),
    ('Piercings and dilators', 'We offer professional services for the placement of piercings and dilators. Our team ensures safe procedures and varied styles to satisfy individual preferences of our clients.'),
    ('Piercings sellings and other articles', 'In addition to our application services, we offer a selection of piercings and other items related to body art. Customers can purchase quality products for complement your unique style.');
    
INSERT INTO users (first_name, last_name, email, password_hash, role_id) VALUES
	('Carlos', 'Ibañez Lamas', 'caribla4@gmail.com', 'SuperAdminAllPowerfull2024', 2),
    ('Daniel', 'Tarazona', 'danitarazona@geekshubs.com', '1234567890', 1),
    ('David', 'Ochando Blasco', 'davidochando@geekshubs.com', '0987654321', 3);
    
INSERT INTO establishments (address, city, postal_code) VALUES ('C/ Tinta Tintero 3', 'Valencia', 46016);