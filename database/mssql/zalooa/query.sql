CREATE PROCEDURE GetZaloAppWithAccountId
    @accountId INT
AS
BEGIN
	SELECT *
	FROM dbo.zaloApp
	WHERE 
		status = 'normal' 
		AND accountId = @accountId
END
GO