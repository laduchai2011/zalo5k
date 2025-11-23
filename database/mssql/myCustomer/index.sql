CREATE TABLE myCustomer (
    id INT PRIMARY KEY IDENTITY(1,1),
    senderId NVARCHAR(255) NOT NULL,
    status NVARCHAR(255) NOT NULL,
    accountId INT,
    updateTime DATETIMEOFFSET(7) NOT NULL,
    createTime DATETIMEOFFSET(7) NOT NULL,
    
    CONSTRAINT FK_myCustomer_Account FOREIGN KEY (accountId) REFERENCES account(id)
)
GO