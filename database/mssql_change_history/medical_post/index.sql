CREATE TABLE medical_post (
    id INT NOT NULL,
    name NVARCHAR(255) NOT NULL,
    title NVARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    sold INT NOT NULL,
    returned INT NOT NULL,
    recalled INT NOT NULL,
    turnover FLOAT NOT NULL,
    prescribed_fee FLOAT NOT NULL,
    price FLOAT NOT NULL,
    sale FLOAT NOT NULL,
    prescriber_cost FLOAT NOT NULL,
    note NVARCHAR(255) NOT NULL,
    status NVARCHAR(255) NOT NULL,
    medication_id INT NOT NULL,
    cabinet_id INT,
    updateTime DATETIMEOFFSET(7) NOT NULL
)
GO
CREATE NONCLUSTERED INDEX idx_id ON medical_post(id);
GO