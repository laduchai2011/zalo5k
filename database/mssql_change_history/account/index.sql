CREATE TABLE account (
    id INT NOT NULL,
    userName NVARCHAR(100) NOT NULL,
    password NVARCHAR(100) NOT NULL,
    phone NVARCHAR(15) NOT NULL,
    firstName NVARCHAR(20) NOT NULL,
    lastName NVARCHAR(20) NOT NULL,
    avatar NVARCHAR(255),
    status NVARCHAR(255) NOT NULL,
    updateTime DATETIMEOFFSET(7) NOT NULL
);
GO
CREATE NONCLUSTERED INDEX idx_id ON account(id);
GO
CREATE NONCLUSTERED INDEX idx_userName ON account(userName);
GO
CREATE NONCLUSTERED INDEX idx_phone ON account(phone);
GO