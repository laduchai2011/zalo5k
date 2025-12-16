CREATE TABLE note (
    id INT PRIMARY KEY,
    note NVARCHAR(MAX) NOT NULL,
    status NVARCHAR(255) NOT NULL,
	customerId NVARCHAR(255) NOT NULL,
    accountId INT NOT NULL, 
    updateTime DATETIMEOFFSET(7) NOT NULL,
    createTime DATETIMEOFFSET(7) NOT NULL,

    FOREIGN KEY (accountId) REFERENCES account(id)
);
GO
CREATE NONCLUSTERED INDEX idx_account_id ON note(accountId);
GO