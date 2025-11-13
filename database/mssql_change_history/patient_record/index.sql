CREATE TABLE patient_record (
    id INT NOT NULL,
    title NVARCHAR(255) NOT NULL,
    priceTotal FLOAT NOT NULL,
    pageTotal INT NOT NULL,
    currentPage INT NOT NULL,
    status NVARCHAR(255) NOT NULL,
    prescriber_id INT NOT NULL,
    account_id INT NOT NULL,
    updateTime DATETIMEOFFSET(7) NOT NULL
);

GO
    CREATE NONCLUSTERED INDEX idx_id ON patient_record(id);

GO
    CREATE TABLE patient_record_description (
        id INT NOT NULL,
        pageNumber INT NOT NULL,
        description NVARCHAR(MAX) NOT NULL,
        status NVARCHAR(255) NOT NULL,
        patient_record_id INT NOT NULL,
        updateTime DATETIMEOFFSET(7) NOT NULL
    )
GO
    CREATE NONCLUSTERED INDEX idx_id ON patient_record_description(id);

GO
    CREATE TABLE patient_record_image (
        id INT NOT NULL,
        pageNumber INT NOT NULL,
        title NVARCHAR(255) NOT NULL,
        url NVARCHAR(255),
        status NVARCHAR(255) NOT NULL,
        patient_record_id INT NOT NULL,
        updateTime DATETIMEOFFSET(7) NOT NULL
    )
GO
    CREATE NONCLUSTERED INDEX idx_id ON patient_record_image(id);

GO
    CREATE TABLE patient_record_video (
        id INT NOT NULL,
        pageNumber INT NOT NULL,
        title NVARCHAR(255) NOT NULL,
        url NVARCHAR(255),
        status NVARCHAR(255) NOT NULL,
        patient_record_id INT NOT NULL,
        updateTime DATETIMEOFFSET(7) NOT NULL
    )
GO
    CREATE NONCLUSTERED INDEX idx_id ON patient_record_video(id);

GO
    CREATE TABLE patient_record_prescription (
        id INT NOT NULL,
        pageNumber INT NOT NULL,
        prescription NVARCHAR(MAX) NOT NULL,
        status NVARCHAR(255) NOT NULL,
        patient_record_id INT NOT NULL,
        updateTime DATETIMEOFFSET(7) NOT NULL
    )
GO
    CREATE NONCLUSTERED INDEX idx_id ON patient_record_prescription(id);

GO
    CREATE TABLE patient_record_order (
        id INT NOT NULL,
        pageNumber INT NOT NULL,
        name NVARCHAR(255) NOT NULL,
        title NVARCHAR(255) NOT NULL,
        amount INT NOT NULL,
        price FLOAT NOT NULL,
        sale FLOAT NOT NULL,
        prescriber_cost FLOAT NOT NULL,
        note NVARCHAR(255) NOT NULL,
        status NVARCHAR(255) NOT NULL,
        medical_post_id INT NOT NULL,
        patient_record_id INT NOT NULL,
        updateTime DATETIMEOFFSET(7) NOT NULL
    )
GO
    CREATE NONCLUSTERED INDEX idx_id ON patient_record_order(id);

GO