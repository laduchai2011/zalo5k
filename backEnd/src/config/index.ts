import dotenv from 'dotenv';
import my_interface from '@src/interface';

dotenv.config();

const mssql_config: my_interface['mssql']['config'] = {
    host: process.env.MSSQL_SERVER_HOST || '127.0.0.1',
    port: Number(process.env.MSSQL_SERVER_POST) || 1434,
    database: process.env.MSSQL_SERVER_DATABASE || 'zalo5k',
    username: process.env.MSSQL_SERVER_USERNAME || 'sa',
    password: process.env.MSSQL_SERVER_PASSWORD || '201195laducHai',
};

const mssql_change_history_config: my_interface['mssql']['config'] = {
    host: process.env.MSSQL_CHANGE_HISTORY_SERVER_HOST || '127.0.0.1',
    port: Number(process.env.MSSQL_CHANGE_HISTORY_SERVER_POST) || 1434,
    database: process.env.MSSQL_CHANGE_HISTORY_SERVER_DATABASE || 'zalo5k_change_history',
    username: process.env.MSSQL_CHANGE_HISTORY_SERVER_USERNAME || 'sa',
    password: process.env.MSSQL_CHANGE_HISTORY_SERVER_PASSWORD || '201195laducHai',
};

const redis_config: my_interface['redis']['config'] = {
    host: process.env.REDIS_SERVER_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_SERVER_POST) || 6379,
    username: process.env.REDIS_SERVER_USERNAME || '',
    password: process.env.REDIS_SERVER_PASSWORD || '',
};

export { mssql_config, mssql_change_history_config, redis_config };
