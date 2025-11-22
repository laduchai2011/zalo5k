CREATE FUNCTION GetMyCustemerIdWithSenderId (@senderId INT) RETURNS TABLE AS RETURN (
    SELECT
        *
    FROM
        dbo.myCustomer
    WHERE
		status = 'normal' 
        AND senderId = @senderId     
);
GO