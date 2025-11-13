CREATE TABLE provider (
    id INT NOT NULL,
    name NVARCHAR(255) NOT NULL,
    avatar NVARCHAR(255),
    banner NVARCHAR(255),
    follow INT,
    averageRating FLOAT,
    rateCount INT,
    status NVARCHAR(255) NOT NULL,
    account_id INT NOT NULL,
    updateTime DATETIMEOFFSET(7) NOT NULL,
)
GO
CREATE NONCLUSTERED INDEX idx_id ON provider(id);
GO