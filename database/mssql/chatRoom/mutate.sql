ALTER PROCEDURE CreateChatRoom
	@userIdByApp NVARCHAR(255),
	@zaloOaId INT,
	@accountId INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @newChatRoomId INT;

        INSERT INTO dbo.chatRoom (userIdByApp, status, zaloOaId, accountId, updateTime, createTime)
        VALUES (@userIdByApp, 'normal', @zaloOaId, @accountId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

		SET @newChatRoomId = SCOPE_IDENTITY();

		INSERT INTO dbo.chatRoomRole (authorizedAccountId, isRead, isSend, status, chatRoomId, accountId, updateTime, createTime)
        VALUES (@accountId, 1, 1, 'normal', @newChatRoomId, @accountId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

		SELECT * FROM dbo.chatRoom WHERE id = @newChatRoomId;

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO

DELETE FROM dbo.chatRoom
GO