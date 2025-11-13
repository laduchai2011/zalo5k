CREATE TABLE medication (
    id INT NOT NULL,
    name NVARCHAR(255) NOT NULL,
    title NVARCHAR(255) NOT NULL,
    avatar NVARCHAR(255) NOT NULL,
    type NVARCHAR(255) NOT NULL,
    catalog NVARCHAR(MAX) NOT NULL,
    information NVARCHAR(MAX) NOT NULL,
    note NVARCHAR(255) NOT NULL,
    averageRating FLOAT,
    rateCount INT,
    status NVARCHAR(255) NOT NULL,
    provider_id INT NOT NULL,
    updateTime DATETIMEOFFSET(7) NOT NULL
)
GO
CREATE NONCLUSTERED INDEX idx_id ON medication(id);
GO

CREATE TABLE medication_image (
    id INT NOT NULL,
    url NVARCHAR(255) NOT NULL,
    status NVARCHAR(255) NOT NULL,
    medication_id INT NOT NULL,
    updateTime DATETIMEOFFSET(7) NOT NULL
)
GO
CREATE NONCLUSTERED INDEX idx_id ON medication_image(id);
GO

CREATE TABLE medication_video (
    id INT NOT NULL,
    url NVARCHAR(255) NOT NULL,
    status NVARCHAR(255) NOT NULL,
    medication_id INT NOT NULL,
    updateTime DATETIMEOFFSET(7) NOT NULL
)
GO
CREATE NONCLUSTERED INDEX idx_id ON medication_video(id);
GO