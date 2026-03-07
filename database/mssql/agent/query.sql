ALTER PROCEDURE GetAgents
	@page INT,
	@size INT,
	@offset INT,
    @accountId INT
AS
BEGIN
    -- Tập kết quả 1: dữ liệu phân trang
    WITH agents AS (
        SELECT a.*,
			ROW_NUMBER() OVER (ORDER BY a.id DESC) AS rn
        FROM dbo.agent AS a
		WHERE 
			status = 'normal' 
			AND accountId = @accountId
    )
    SELECT *
    FROM agents
    WHERE rn BETWEEN (((@page - 1) * @size + 1) + @offset) AND ((@page * @size) + @offset);

    -- Tập kết quả 2: tổng số dòng
    SELECT COUNT(*) AS totalCount
	FROM dbo.agent AS a
		WHERE 
			status = 'normal' 
			AND accountId = @accountId
END
GO