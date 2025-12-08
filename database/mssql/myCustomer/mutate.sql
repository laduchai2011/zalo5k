CREATE PROCEDURE CreateMyCustomer
	@senderId NVARCHAR(255),
	@accountId INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @newMyCustomerId INT;

		-- Th�m medication
        INSERT INTO dbo.myCustomer (senderId, status, accountId, updateTime, createTime)
        VALUES (@senderId, 'normal', @accountId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

		SET @newMyCustomerId = SCOPE_IDENTITY();

		SELECT * FROM dbo.myCustomer WHERE id = @newMyCustomerId;

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO

ALTER PROCEDURE DeleteIsNewMessage
	@id NVARCHAR(255)
AS
BEGIN
	SET NOCOUNT ON;
    DELETE dbo.isNewMessage WHERE id = @id;
END;
GO

delete dbo.isNewMessage
go
delete dbo.myCustomer
go