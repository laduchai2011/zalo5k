DELETE FROM medication_image
GO

DELETE FROM medication_video
GO

DELETE FROM medication_comment
GO

DELETE FROM medication
WHERE status = 'normal';
GO


CREATE TYPE MedicationImageType AS TABLE (
    url NVARCHAR(255)
);
GO
CREATE TYPE MedicationVideoType AS TABLE (
    url NVARCHAR(255)
);
GO

ALTER PROCEDURE CreateMedication
	@title NVARCHAR(255),
	@type NVARCHAR(255),
	@typeGroup NVARCHAR(255),
	@information NVARCHAR(MAX),
	@averageRating FLOAT,
	@rateCount INT,
	@amount INT,
	@discount FLOAT,
	@price FLOAT,
	@userId INT,
	@medicationImage MedicationImageType READONLY,
	@medicationVideo MedicationVideoType READONLY
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @newMedicationId INT;

		-- Thêm medication
        INSERT INTO medication (title, type, typeGroup, information, averageRating, rateCount, amount, discount, price, status, userId, updateTime, createTime)
        VALUES (@title, @type, @typeGroup, @information, @averageRating, @rateCount, @amount, @discount, @price, 'normal', @userId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

		SET @newMedicationId = SCOPE_IDENTITY();

		-- Thêm medicationImage
		INSERT INTO medication_image (url, medicationId, updateTime, createTime)
        SELECT 
            url, @newMedicationId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()
        FROM @medicationImage;

		-- Thêm medicationVideo
		INSERT INTO medication_video (url, medicationId, updateTime, createTime)
        SELECT 
            url, @newMedicationId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET()
        FROM @medicationVideo;

		SELECT * FROM dbo.medication WHERE id = @newMedicationId;

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO

ALTER PROCEDURE CreateMedicationComment
	@content NVARCHAR(255),
	@level INT,
	@medicationCommentId INT,
	@medicationId INT,
	@accountId INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @newMedicationCommentId INT;

		-- Thêm medication
        INSERT INTO medication_comment (content, likeAmount, dislikeAmount, level, status, medicationCommentId, medicationId, accountId, updateTime, createTime)
        VALUES (@content, 0, 0, @level, 'normal', @medicationCommentId, @medicationId, @accountId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

		SET @newMedicationCommentId = SCOPE_IDENTITY();

		SELECT * FROM dbo.medication_comment WHERE id = @newMedicationCommentId;

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO