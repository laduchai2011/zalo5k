ALTER PROCEDURE CreateMessage
	@eventName NVARCHAR(255),
	@senderId NVARCHAR(255),
	@message NVARCHAR(MAX),
	@timestamp NVARCHAR(255),
	@messageStatus NVARCHAR(255),
	@accountId INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @newMessageId INT;

		-- Thêm medication
        INSERT INTO dbo.message (eventName, senderId, message, timestamp, messageStatus, status, accountId, updateTime, createTime)
        VALUES (@eventName, @senderId, @message, @timestamp, @messageStatus, 'normal', @accountId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

		SET @newMessageId = SCOPE_IDENTITY();

		SELECT * FROM dbo.message WHERE id = @newMessageId;

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO

