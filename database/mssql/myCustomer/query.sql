ALTER FUNCTION GetMyCustemerIdWithSenderId (@senderId NVARCHAR(255)) RETURNS TABLE AS RETURN (
    SELECT
        *
    FROM
        dbo.myCustomer
    WHERE
		status = 'normal' 
        AND senderId = @senderId     
);
GO

CREATE PROCEDURE GetMyCustomers
	@page INT,
    @size INT,
    @accountId INT
AS
BEGIN
	-- Tập kết quả 1: dữ liệu phân trang
    WITH myCustoms AS (
        SELECT mc.*,
			ROW_NUMBER() OVER (ORDER BY mc.id DESC) AS rn
        FROM dbo.myCustomer AS mc
		WHERE 
			status = 'normal' 
			AND (@accountId IS NULL OR mc.accountId = @accountId) 
    )
    SELECT *
    FROM myCustoms
    WHERE rn BETWEEN ((@page - 1) * @size + 1) AND (@page * @size);

    -- Tập kết quả 2: tổng số dòng
    SELECT COUNT(*) AS totalCount
	FROM dbo.myCustomer AS mc
		WHERE 
			status = 'normal' 
			AND (@accountId IS NULL OR mc.accountId = @accountId) 
END
GO


CREATE PROCEDURE GetAllMyCustomers
    @accountId INT
AS
BEGIN
	SELECT 
    mc.*,
    ROW_NUMBER() OVER (ORDER BY mc.id DESC) AS rn
	FROM myCustomer AS mc
	WHERE mc.accountId = @accountId
	ORDER BY mc.id DESC;
END
GO

CREATE PROCEDURE GetAMyCustomer
	@senderId NVARCHAR(255)
AS
BEGIN
	SELECT * FROM dbo.myCustomer AS mc
	WHERE 
		status = 'normal' 
		AND (@senderId IS NULL OR mc.senderId = @senderId) 
END
GO