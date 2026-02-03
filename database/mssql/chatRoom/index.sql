CREATE TABLE chatRoom (
    id INT PRIMARY KEY IDENTITY(1,1),
	userIdByApp NVARCHAR(255) NOT NULL,
    status NVARCHAR(255) NOT NULL,
	zaloOaId INT NOT NULL,
	accountId INT NOT NULL,
    updateTime DATETIMEOFFSET(7) NOT NULL,
    createTime DATETIMEOFFSET(7) NOT NULL,
    
	CONSTRAINT UQ_chatRoom_zaloOaId_zaloUserId UNIQUE (zaloOaId, userIdByApp),
    CONSTRAINT FK_chatRoom_Account FOREIGN KEY (accountId) REFERENCES account(id)
)
GO
CREATE NONCLUSTERED INDEX idx_account_id ON chatRoom(accountId);
GO