CREATE TABLE prescriber (
    id INT PRIMARY KEY,
    name NVARCHAR(50) NOT NULL,
    birthday DATETIMEOFFSET(7) NOT NULL,
    sex BIT NOT NULL,
    address NVARCHAR(255) NOT NULL,
    major NVARCHAR(255) NOT NULL,
    graduated NVARCHAR(255) NOT NULL,
    phone NVARCHAR(15) NOT NULL,
    avatar NVARCHAR(255) NOT NULL,
    image NVARCHAR(MAX) NOT NULL,
    type NVARCHAR(255) NOT NULL,
    information NVARCHAR(MAX) NOT NULL,
    averageRating FLOAT NOT NULL,
    rateCount INT NOT NULL,
    status NVARCHAR(255) NOT NULL,
    account_id INT NOT NULL UNIQUE, 
    updateTime DATETIMEOFFSET(7) NOT NULL,
    createTime DATETIMEOFFSET(7) NOT NULL,

    FOREIGN KEY (account_id) REFERENCES account(id)
);
GO
CREATE NONCLUSTERED INDEX idx_account_id ON prescriber(account_id);
GO