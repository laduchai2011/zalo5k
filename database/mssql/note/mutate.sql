CREATE PROCEDURE CreateNote
	@note NVARCHAR(MAX),
	@customerId NVARCHAR(255),
	@accountId INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @newNoteId INT;

		-- Th�m medication
        INSERT INTO dbo.note (note, status, customerId, accountId, updateTime, createTime)
        VALUES (@note, 'normal', @customerId, @accountId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

		SET @newNoteId = SCOPE_IDENTITY();

		SELECT * FROM dbo.myCustomer WHERE id = @newNoteId;

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