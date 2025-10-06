import dotenv from 'dotenv';
// Load server .env before anything else so database URL and other envs are available
dotenv.config({ path: new URL('./.env', import.meta.url).pathname });

// Now start the main server
import './index';
