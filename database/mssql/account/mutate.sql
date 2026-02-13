CREATE PROCEDURE Signup
	  @userName NVARCHAR(100),
	  @password NVARCHAR(100),
	  @phone NVARCHAR(15),
	  @firstName NVARCHAR(20),
	  @lastName NVARCHAR(20)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO account (userName, password, phone, firstName, lastName, avatar, status, updateTime, createTime)
	OUTPUT INSERTED.*
	VALUES (@userName, @password, @phone, @firstName, @lastName, NULL, 'normal', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());
END;
GO

DELETE FROM account
GO

EXEC Signup N'laduchai1', N'passladuchai', N'0901234567', N'Hải', N'Lã';


CREATE PROCEDURE CreateMember
	@userName NVARCHAR(100),
	@password NVARCHAR(100),
	@phone NVARCHAR(15),
	@firstName NVARCHAR(20),
	@lastName NVARCHAR(20),
	@addedById INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @newMemberId INT;

		-- Th�m medication
        INSERT INTO dbo.account (userName, password, phone, firstName, lastName, avatar, status, updateTime, createTime)
        VALUES (@userName, @password, @phone, @firstName, @lastName, null, 'normal', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

		SET @newMemberId = SCOPE_IDENTITY();

		INSERT INTO dbo.accountInformation (addedById, accountType, accountId)
        VALUES (@addedById, 'member', @newMemberId);

		SELECT * FROM dbo.account WHERE id = @newMemberId;

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO


ALTER PROCEDURE CreateReplyAccount
	@authorizedAccountId NVARCHAR(255),
	@chatRoomId INT,
	@accountId INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
		BEGIN TRANSACTION;

		IF NOT EXISTS (
			SELECT 1
			FROM dbo.accountInformation ai1
			INNER JOIN dbo.accountInformation ai2 
				ON ai1.addedById = ai2.addedById
			WHERE ai1.accountId = @accountId
			  AND ai2.accountId = @authorizedAccountId
		)
		BEGIN
			THROW 50001, N'Không chung chung người quản lý.', 1;
		END

		-- 1) Check chatRoom có tồn tại không
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

		-- 2) Check đã tồn tại role chưa (tránh insert trùng)
		IF EXISTS (
			SELECT 1
			FROM dbo.chatRoomRole
			WHERE 
				chatRoomId = @chatRoomId
				AND authorizedAccountId = @authorizedAccountId
		)
		BEGIN
			THROW 50003, N'Role này đã tồn tại trong chatRoom.', 1;
		END

		-- 3) Nếu pass hết check thì mới INSERT
		INSERT INTO dbo.chatRoomRole
			(authorizedAccountId, isRead, isSend, status, chatRoomId, accountId, updateTime, createTime)
		VALUES
			(@authorizedAccountId, 1, 0, 'normal', @chatRoomId, @accountId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

		-- 4) Trả kết quả mới insert
		SELECT *
		FROM dbo.account
		WHERE status = 'normal' AND id = @authorizedAccountId

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO