ALTER PROCEDURE GetMyNotes
	@page INT,
    @size INT,
	@customerId NVARCHAR(255),
    @accountId INT
AS
BEGIN
	-- Tập kết quả 1: dữ liệu phân trang
    WITH notes AS (
        SELECT n.*,
			ROW_NUMBER() OVER (ORDER BY n.id DESC) AS rn
        FROM dbo.note AS n
		WHERE 
			status = 'normal' 
			AND (@customerId IS NULL OR n.customerId = @customerId) 
			AND (@accountId IS NULL OR n.accountId = @accountId) 
    )
    SELECT *
    FROM notes
    WHERE rn BETWEEN ((@page - 1) * @size + 1) AND (@page * @size);

    -- Tập kết quả 2: tổng số dòng
    SELECT COUNT(*) AS totalCount
	FROM dbo.note AS n
		WHERE 
			status = 'normal' 
			AND (@customerId IS NULL OR n.customerId = @customerId) 
			AND (@accountId IS NULL OR n.accountId = @accountId) 
END
GO