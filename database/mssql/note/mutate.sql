ALTER PROCEDURE CreateNote
	@note NVARCHAR(MAX),
	@chatRoomId INT,
	@zaloOaId INT,
	@accountId INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @newNoteId INT;

		-- Th�m medication
        INSERT INTO dbo.note (note, status, chatRoomId, zaloOaId, accountId, updateTime, createTime)
        VALUES (@note, 'normal', @chatRoomId, @zaloOaId, @accountId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

		SET @newNoteId = SCOPE_IDENTITY();

		SELECT * FROM dbo.note WHERE id = @newNoteId;

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO


delete dbo.isNewMessage
go
delete dbo.myCustomer
go