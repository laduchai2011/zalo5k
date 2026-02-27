CREATE TABLE [order] (
    id INT PRIMARY KEY,
    uuid NVARCHAR(255) NOT NULL UNIQUE,
	label NVARCHAR(255) NOT NULL,
	content NVARCHAR(255) NOT NULL,
	money NVARCHAR(255) NOT NULL,
	isPay BIT NOT NULL,
	phone NVARCHAR(255) UNIQUE,
    status NVARCHAR(255) NOT NULL,
	chatRoomId INT NOT NULL, 
    accountId INT NOT NULL, 
    updateTime DATETIMEOFFSET(7) NOT NULL,
    createTime DATETIMEOFFSET(7) NOT NULL,

	CONSTRAINT FK_order_ChatRoom FOREIGN KEY (chatRoomId) REFERENCES chatRoom(id),
    CONSTRAINT FK_order_Account FOREIGN KEY (accountId) REFERENCES account(id)
);
GO
CREATE NONCLUSTERED INDEX idx_chatRoom_id ON [order](chatRoomId);
GO
CREATE NONCLUSTERED INDEX idx_account_id ON [order](accountId);
GO