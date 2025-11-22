CREATE PROCEDURE CreateMyCustom
	@senderId NVARCHAR(255),
	@accountId INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @newMyCustomId INT;

		-- Th�m medication
        INSERT INTO medication (senderId, status, accountId, updateTime, createTime)
        VALUES (@senderId, 'normal', @accountId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

		SET @newMyCustomId = SCOPE_IDENTITY();

		SELECT * FROM dbo.myCustom WHERE id = @newMyCustomId;

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO