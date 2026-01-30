ALTER PROCEDURE CreateChatSession
	@label NVARCHAR(255),
	@code NVARCHAR(255),
	@isReady BIT,
	@selectedAccountId INT,
	@zaloOaId INT,
	@accountId INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @newChatSessionId INT;

		-- Thêm medication
        INSERT INTO dbo.chatSession (label, code, isReady, status, selectedAccountId, zaloOaId, accountId, updateTime, createTime)
        VALUES (@label, @code, @isReady, 'normal', @selectedAccountId, @zaloOaId, @accountId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

		SET @newChatSessionId = SCOPE_IDENTITY();

		SELECT * FROM dbo.chatSession WHERE id = @newChatSessionId;

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO