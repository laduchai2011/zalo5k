ALTER PROCEDURE GetMessages
	@page INT,
    @size INT,
    @accountId INT
AS
BEGIN
	-- Tập kết quả 1: dữ liệu phân trang
    WITH messages AS (
        SELECT m.*,
			ROW_NUMBER() OVER (ORDER BY m.id DESC) AS rn
        FROM dbo.message AS m
		WHERE 
			status = 'normal' 
			AND (@accountId IS NULL OR m.accountId = @accountId) 
    )
    SELECT *
    FROM messages
    WHERE rn BETWEEN ((@page - 1) * @size + 1) AND (@page * @size);

    -- Tập kết quả 2: tổng số dòng
    SELECT COUNT(*) AS totalCount
	FROM dbo.message AS m
		WHERE 
			status = 'normal' 
			AND (@accountId IS NULL OR m.accountId = @accountId) 
END
GO

