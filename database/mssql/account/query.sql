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