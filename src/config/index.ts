import dotnet from 'dotenv';
import path from 'path';

// Get env path
const envPath = path.resolve(__dirname, `${process.env.ENV_FILE_PATH}`);

// Load the variables in .env file
dotnet.config({ path: envPath });

// Assign variables into an object
const config = {
  port: Number(process.env.PORT) || 4000,
  mongo: {
    url: process.env.MONGO_URL || ''    
  },
}

export default config;