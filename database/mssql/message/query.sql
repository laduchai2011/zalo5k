CREATE PROCEDURE GetMessages
	@page INT,
    @size INT,
    @accountId INT
AS
BEGIN
	-- Tập kết quả 1: dữ liệu phân trang
    WITH messages AS (
        SELECT m.*,
			ROW_NUMBER() OVER (ORDER BY m.id DESC) AS rn
        FROM dbo.message AS m
		WHERE 
			status = 'normal' 
			AND (@accountId IS NULL OR m.accountId = @accountId) 
    )
    SELECT *
    FROM messages
    WHERE rn BETWEEN ((@page - 1) * @size + 1) AND (@page * @size);

    -- Tập kết quả 2: tổng số dòng
    SELECT COUNT(*) AS totalCount
	FROM dbo.message AS m
		WHERE 
			status = 'normal' 
			AND (@accountId IS NULL OR m.accountId = @accountId) 
END
GO

CREATE PROCEDURE GetAMedication
    @id INT
AS
BEGIN
	SELECT * FROM medication WHERE status = 'normal' AND id = @id
END
GO

ALTER PROCEDURE GetAllMedicationImages
    @medicationId INT
AS
BEGIN
	-- SELECT * FROM medication_image WHERE medicationId = @medicationId
	SELECT 
    mi.*,
    ROW_NUMBER() OVER (ORDER BY mi.id DESC) AS rn
	FROM medication_image AS mi
	WHERE mi.medicationId = @medicationId
	ORDER BY mi.id DESC;
END
GO

ALTER PROCEDURE GetAllMedicationVideos
    @medicationId INT
AS
BEGIN
	-- SELECT * FROM medication_video WHERE medicationId = @medicationId
	SELECT 
    mv.*,
    ROW_NUMBER() OVER (ORDER BY mv.id DESC) AS rn
	FROM medication_video AS mv
	WHERE mv.medicationId = @medicationId
	ORDER BY mv.id DESC;
END
GO

CREATE PROCEDURE GetAMedicationImage
    @medicationId INT
AS
BEGIN
	SELECT TOP 1 *
	FROM medication_image AS mi
	WHERE mi.medicationId = @medicationId
	ORDER BY mi.id DESC;
END
GO

CREATE PROCEDURE GetAMedicationVideo
    @medicationId INT
AS
BEGIN
	SELECT TOP 1 *
	FROM medication_video AS mv
	WHERE mv.medicationId = @medicationId
	ORDER BY mv.id DESC;
END
GO

CREATE PROCEDURE GetMedicationComments
	@page INT,
    @size INT,
	@level INT,
    @medicationCommentId INT,
    @medicationId INT
AS
BEGIN
	-- Tập kết quả 1: dữ liệu phân trang
    WITH medicationComments AS (
        SELECT mc.*,
			ROW_NUMBER() OVER (ORDER BY mc.id DESC) AS rn
        FROM dbo.medication_comment AS mc
		WHERE 
			status = 'normal' 
			AND level = @level
			AND (@medicationCommentId IS NULL OR mc.medicationCommentId = @medicationCommentId) 
			AND medicationId = @medicationId
    )
    SELECT *
    FROM medicationComments
    WHERE rn BETWEEN ((@page - 1) * @size + 1) AND (@page * @size);

    -- Tập kết quả 2: tổng số dòng
    SELECT COUNT(*) AS totalCount
	FROM dbo.medication_comment AS mc
		WHERE 
			status = 'normal' 
			AND level = @level
			AND (@medicationCommentId IS NULL OR mc.medicationCommentId = @medicationCommentId) 
			AND medicationId = @medicationId
END
GO