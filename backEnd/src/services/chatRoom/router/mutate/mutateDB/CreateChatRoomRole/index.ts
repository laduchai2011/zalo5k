import sql from 'mssql';
import { ChatRoomRoleField } from '@src/dataStruct/chatRoom';
import { CreateChatRoomRoleBodyField } from '@src/dataStruct/chatRoom/body';

class MutateDB_CreateChatRoomRole {
    private _connectionPool: sql.ConnectionPool | undefined;
    private _createChatRoomRoleBody: CreateChatRoomRoleBodyField | undefined;

    constructor() {}

    set_connection_pool(connectionPool: sql.ConnectionPool): void {
        this._connectionPool = connectionPool;
    }

    setCreateChatRoomRoleBody(createChatRoomRoleBody: CreateChatRoomRoleBodyField): void {
        this._createChatRoomRoleBody = createChatRoomRoleBody;
    }

    async run(): Promise<sql.IProcedureResult<ChatRoomRoleField> | undefined> {
        if (this._connectionPool !== undefined && this._createChatRoomRoleBody !== undefined) {
            try {
                const result = await this._connectionPool
                    .request()
                    .input('authorizedAccountId', sql.NVarChar(255), this._createChatRoomRoleBody.authorizedAccountId)
                    .input('chatRoomId', sql.Int, this._createChatRoomRoleBody.chatRoomId)
                    .input('accountId', sql.Int, this._createChatRoomRoleBody.accountId)
                    .execute('CreateChatRoomRole');

                return result;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default MutateDB_CreateChatRoomRole;
