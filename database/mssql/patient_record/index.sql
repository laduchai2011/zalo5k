CREATE TABLE patient_record (
    id INT PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    priceTotal FLOAT NOT NULL,
    pageTotal INT NOT NULL,
    currentPage INT NOT NULL,
    status NVARCHAR(255) NOT NULL,
    prescriber_id INT NOT NULL UNIQUE,
    account_id INT NOT NULL,
    updateTime DATETIMEOFFSET(7) NOT NULL,
    createTime DATETIMEOFFSET(7) NOT NULL,
    FOREIGN KEY (prescriber_id) REFERENCES prescriber(id),
    FOREIGN KEY (account_id) REFERENCES account(id)
);

GO
    CREATE NONCLUSTERED INDEX idx_account_id ON patient_record(account_id);

GO
    CREATE TABLE patient_record_description (
        id INT PRIMARY KEY,
        pageNumber INT NOT NULL,
        description NVARCHAR(MAX) NOT NULL,
        status NVARCHAR(255) NOT NULL,
        patient_record_id INT NOT NULL,
        updateTime DATETIMEOFFSET(7) NOT NULL,
        createTime DATETIMEOFFSET(7) NOT NULL,
        FOREIGN KEY (patient_record_id) REFERENCES patient_record(id),
        UNIQUE (pageNumber, patient_record_id)
    )
GO
    CREATE NONCLUSTERED INDEX idx_patient_record_id ON patient_record_description(patient_record_id);

GO
    CREATE TABLE patient_record_image (
        id INT PRIMARY KEY,
        pageNumber INT NOT NULL,
        title NVARCHAR(255) NOT NULL,
        url NVARCHAR(255),
        status NVARCHAR(255) NOT NULL,
        patient_record_id INT NOT NULL,
        updateTime DATETIMEOFFSET(7) NOT NULL,
        createTime DATETIMEOFFSET(7) NOT NULL,
        FOREIGN KEY (patient_record_id) REFERENCES patient_record(id)
    )
GO
    CREATE NONCLUSTERED INDEX idx_patient_record_id ON patient_record_image(patient_record_id);

GO
    CREATE TABLE patient_record_video (
        id INT PRIMARY KEY,
        pageNumber INT NOT NULL,
        title NVARCHAR(255) NOT NULL,
        url NVARCHAR(255),
        status NVARCHAR(255) NOT NULL,
        patient_record_id INT NOT NULL,
        updateTime DATETIMEOFFSET(7) NOT NULL,
        createTime DATETIMEOFFSET(7) NOT NULL,
        FOREIGN KEY (patient_record_id) REFERENCES patient_record(id)
    )
GO
    CREATE NONCLUSTERED INDEX idx_patient_record_id ON patient_record_video(patient_record_id);

GO
    CREATE TABLE patient_record_prescription (
        id INT PRIMARY KEY,
        pageNumber INT NOT NULL,
        prescription NVARCHAR(MAX) NOT NULL,
        status NVARCHAR(255) NOT NULL,
        patient_record_id INT NOT NULL,
        updateTime DATETIMEOFFSET(7) NOT NULL,
        createTime DATETIMEOFFSET(7) NOT NULL,
        FOREIGN KEY (patient_record_id) REFERENCES patient_record(id),
        UNIQUE (pageNumber, patient_record_id)
    )
GO
    CREATE NONCLUSTERED INDEX idx_patient_record_id ON patient_record_prescription(patient_record_id);

GO
    CREATE TABLE patient_record_order (
        id INT PRIMARY KEY,
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
        updateTime DATETIMEOFFSET(7) NOT NULL,
        createTime DATETIMEOFFSET(7) NOT NULL,
        FOREIGN KEY (medical_post_id) REFERENCES medical_post(id),
        FOREIGN KEY (patient_record_id) REFERENCES patient_record(id)
    )
GO
    CREATE NONCLUSTERED INDEX idx_medical_post_id ON patient_record_order(medical_post_id);

GO
    CREATE NONCLUSTERED INDEX idx_patient_record_id ON patient_record_order(patient_record_id);

GO