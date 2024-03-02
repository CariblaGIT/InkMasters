import 'dotenv/config';
import { app } from './app';
import { AppDataSource } from './database/db';

// Launching server to listen API petitions script

// Server port assignation (WARNING : The port is saved on a .env file that you have to create following the .env.sample file)
const PORT = process.env.PORT || 4001;
const startServer = () => { 
    // Initialize AppDataSource method, connected to the database in ./database/db
    AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch(error => {
        console.log(error)
    });
}

// Calling function to launch server
startServer();