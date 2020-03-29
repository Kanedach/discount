import logger from './logger';
import dotenv from 'dotenv';
import fs from 'fs';
import {Credentials} from '../models/Credentials';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cfenv = require('cfenv');

const appEnv = cfenv.getAppEnv();


if (fs.existsSync('.env')) {
    logger.debug('Using .env file to supply config environment variables');
    dotenv.config({path: '.env'});
}

/**
 export const ENVIRONMENT = process.env.NODE_ENV;
 const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

 export const MONGODB_URI = !appEnv.isLocal ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL'];
 export const SERVER_PORT = process.env['SERVER_PORT'];
 **/
export function getCredentials(): Credentials {
    if (appEnv.isLocal) {

        return {
            serviceMongoURI: process.env.MONGODB_URI!,
            serviceServerPort: process.env.SERVER_PORT!,
        };
    } else {
        return {
            serviceMongoURI: appEnv.getService('sftoolDb').credentials.uri!,
            serviceServerPort: ''!
        };
    }
};
