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