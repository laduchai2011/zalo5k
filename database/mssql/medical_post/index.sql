CREATE TABLE medical_post (
    id INT PRIMARY KEY,
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
    cabinet_id INT UNIQUE,
    updateTime DATETIMEOFFSET(7) NOT NULL,
    createTime DATETIMEOFFSET(7) NOT NULL,
    FOREIGN KEY (medication_id) REFERENCES medication(id),
    FOREIGN KEY (cabinet_id) REFERENCES cabinet(id)
)
GO
    CREATE NONCLUSTERED INDEX idx_medication_id ON medical_post(medication_id);

GO
    CREATE NONCLUSTERED INDEX idx_cabinet_id ON medical_post(cabinet_id);

GO