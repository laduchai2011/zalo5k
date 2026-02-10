CREATE FUNCTION Signin (@userName NVARCHAR(100), @password NVARCHAR(100)) RETURNS TABLE AS RETURN (
    SELECT
        *
    FROM
        dbo.account
    WHERE
        userName = @userName
        AND password = @password
);
GO


CREATE PROCEDURE GetAllMembers
    @addedById INT
AS
BEGIN
	SELECT a.*
	FROM account a
	JOIN accountInformation ai ON ai.accountId = a.id
	WHERE 
		a.status = 'normal' 
		AND (@addedById IS NULL OR ai.addedById = @addedById) 
END
GO

CREATE PROCEDURE GetAccountInformation
    @id INT
AS
BEGIN
	SELECT ai.*
	FROM accountInformation ai
	JOIN account a ON a.id = ai.accountId
	WHERE 
		a.status = 'normal' 
		AND (@id IS NULL OR ai.accountId = @id) 
END
GO

CREATE PROCEDURE GetMe
    @id INT
AS
BEGIN
	SELECT *
	FROM dbo.account
	WHERE 
		status = 'normal' 
		AND id = @id
END
GO

CREATE PROCEDURE GetAccountWithId
    @id INT
AS
BEGIN
	SELECT *
	FROM dbo.account
	WHERE 
		status = 'normal' 
		AND id = @id
END
GO


--  WITH chatRoomRole
ALTER PROCEDURE GetReplyAccounts
	@page INT,
	@size INT,
    @chatRoomId INT
AS
BEGIN
	SELECT a.*
	FROM dbo.account a
	INNER JOIN dbo.chatRoomRole crr ON crr.authorizedAccountId = a.id
	WHERE a.status = 'normal' AND crr.status = 'normal' AND crr.chatRoomId = @chatRoomId
	ORDER BY
	(
		SELECT STRING_AGG(s.value, ' ') WITHIN GROUP (ORDER BY s.ordinal DESC)
		FROM STRING_SPLIT(LTRIM(RTRIM(a.lastName)), ' ', 1) s
	) COLLATE Vietnamese_100_CI_AI,
	(
		SELECT STRING_AGG(s.value, ' ') WITHIN GROUP (ORDER BY s.ordinal DESC)
		FROM STRING_SPLIT(LTRIM(RTRIM(a.firstName)), ' ', 1) s
	) COLLATE Vietnamese_100_CI_AI,
	a.id ASC
	OFFSET (@page - 1) * @size ROWS
	FETCH NEXT @size ROWS ONLY;

	SELECT COUNT(*) AS totalCount
	FROM dbo.account a
	INNER JOIN dbo.chatRoomRole crr ON crr.authorizedAccountId = a.id
	WHERE a.status = 'normal' AND crr.status = 'normal' AND crr.chatRoomId = @chatRoomId
END
GO 