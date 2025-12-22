ALTER PROCEDURE Signup
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


ALTER PROCEDURE CreateMember
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