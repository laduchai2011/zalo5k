ALTER PROCEDURE CreateOrder
	@uuid NVARCHAR(255),
	@label NVARCHAR(255),
	@content NVARCHAR(255),
	@money BIGINT,
	@phone NVARCHAR(255),
	@chatRoomId INT,
	@accountId INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;
		
		IF NOT EXISTS (
			SELECT 1
			FROM dbo.chatRoom
			WHERE 
				id = @chatRoomId
				AND accountId = @accountId
		)
		BEGIN
			THROW 50002, N'ChatRoom không tồn tại hoặc đã bị khóa.', 1;
		END

		DECLARE @newOrderId INT;

        INSERT INTO dbo.[order] (uuid, label, content, money, isPay, phone, status, chatRoomId, accountId, updateTime, createTime)
        VALUES (@uuid, @label, @content, @money, 0, @phone, 'normal', @chatRoomId, @accountId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

		SET @newOrderId = SCOPE_IDENTITY();

		SELECT * FROM dbo.[order] WHERE id = @newOrderId;

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO

CREATE PROCEDURE UpdateOrder
	@id INT,
	@label NVARCHAR(255),
	@content NVARCHAR(255),
	@money BIGINT,
	@phone NVARCHAR(255),
	@accountId INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;

		IF NOT EXISTS (
			SELECT 1
			FROM dbo.[order]
			WHERE 
				id = @id
				AND accountId = @accountId
		)
		BEGIN
			THROW 50002, N'Đơn hàng không hợp lệ .', 1;
		END

        UPDATE dbo.[order]
		SET 
			label = @label, 
			content = @content,
			money = @money,
			phone = @phone
		WHERE 
			status = 'normal'
			AND id = @id
			AND isPay = 0

		SELECT * FROM dbo.[order] WHERE id = @id;

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO