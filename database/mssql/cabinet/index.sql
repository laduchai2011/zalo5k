CREATE TABLE cabinet (
    id INT PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    title NVARCHAR(255) NOT NULL,
    type NVARCHAR(255) NOT NULL,
    size NVARCHAR(255) NOT NULL,
    note NVARCHAR(255) NOT NULL,
    status NVARCHAR(255) NOT NULL,
    store_id INT NOT NULL,
    updateTime DATETIMEOFFSET(7) NOT NULL,
    createTime DATETIMEOFFSET(7) NOT NULL,
    FOREIGN KEY (store_id) REFERENCES store(id)
)
GO
    CREATE NONCLUSTERED INDEX idx_store_id ON cabinet(store_id);

GO