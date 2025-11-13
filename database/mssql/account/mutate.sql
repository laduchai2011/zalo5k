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