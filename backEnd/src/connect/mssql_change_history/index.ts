import dotenv from 'dotenv';
import sql, { config } from 'mssql';
import { mssql_change_history_config } from '@src/config';
import my_interface from '@src/interface';
import { my_log } from '@src/log';

dotenv.config();

class MSSQL_Change_History_Server {
    private static instance: MSSQL_Change_History_Server;
    private _connectionPool: sql.ConnectionPool | undefined;

    constructor() {
        if (!MSSQL_Change_History_Server.instance) {
            const sqlConfig: config = {
                user: mssql_change_history_config?.username,
                password: mssql_change_history_config?.password,
                database: mssql_change_history_config?.database,
                server: mssql_change_history_config?.host
                    ? mssql_change_history_config?.host
                    : '',
                port: mssql_change_history_config?.port,
                pool: {
                    max: 10,
                    min: 0,
                    idleTimeoutMillis: 30000,
                },
                options: {
                    // encrypt: true, // for azure
                    // trustServerCertificate: false // change to true for local dev / self-signed certs
                    encrypt: false, // Tắt mã hóa
                    trustServerCertificate: true, // Bỏ qua kiểm tra chứng chỉ
                },
            };

            sql.connect(sqlConfig)
                .then((ConnectionPool: sql.ConnectionPool) => {
                    my_log.withGreen(
                        'MSSQL_Change_History_Server connected successly !'
                    );
                    this._connectionPool = ConnectionPool;
                })
                .catch((err) => {
                    console.error(err);
                });

            MSSQL_Change_History_Server.instance = this;
        }

        return MSSQL_Change_History_Server.instance;
    }

    get_myConfig(): my_interface['mssql']['config'] {
        return mssql_change_history_config;
    }

    get_connectionPool(): sql.ConnectionPool | undefined {
        return this._connectionPool;
    }
}

export default MSSQL_Change_History_Server;
