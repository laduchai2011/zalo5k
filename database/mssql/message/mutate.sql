CREATE PROCEDURE CreateMessage
	@eventName NVARCHAR(255),
	@sender NVARCHAR(255),
	@receiveId NVARCHAR(255),
	@message NVARCHAR(MAX),
	@type NVARCHAR(255),
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
        INSERT INTO dbo.message (eventName, sender, receiveId, message, type, timestamp, messageStatus, status, accountId, updateTime, createTime)
        VALUES (@eventName, @sender, @receiveId, @message, @type, @timestamp, @messageStatus, 'normal', @accountId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

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

CREATE PROCEDURE UpdateEvent_MemberSend
	@eventName NVARCHAR(255),
	@receiveId NVARCHAR(255),
	@timestamp NVARCHAR(255),
	@messageStatus NVARCHAR(255),
	@accountId INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @messageId INT;

		UPDATE dbo.message
		SET eventName = @eventName,
			timestamp = @timestamp,
			messageStatus = @messageStatus
		WHERE receiveId = @receiveId 
			AND accountId = @accountId;

		SET @messageId = SCOPE_IDENTITY();

		SELECT * FROM dbo.message WHERE id = @messageId;

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO

delete dbo.message
go


