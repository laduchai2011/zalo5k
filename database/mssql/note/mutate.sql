ALTER PROCEDURE CreateNote
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

ALTER PROCEDURE DeleteIsNewMessage
	@id NVARCHAR(255)
AS
BEGIN
	SET NOCOUNT ON;

    DECLARE @myCustomerId INT;

    -- Lấy myCustomerId từ bảng isNewMessage
    SELECT @myCustomerId = myCustomerId
    FROM dbo.isNewMessage
    WHERE id = @id;

    -- Nếu không tìm thấy id thì exit
    IF @myCustomerId IS NULL
        RETURN;

    -- Xóa tất cả bản ghi có cùng myCustomerId
    DELETE dbo.isNewMessage
    WHERE myCustomerId = @myCustomerId;
END;
GO

delete dbo.isNewMessage
go
delete dbo.myCustomer
go