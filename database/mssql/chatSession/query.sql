ALTER PROCEDURE GetChatSessionsWithAccountId
	@page INT,
    @size INT,
	@zaloOaId INT,
    @accountId INT
AS
BEGIN
	-- Tập kết quả 1: dữ liệu phân trang
    WITH chatSessions AS (
        SELECT cs.*,
			ROW_NUMBER() OVER (ORDER BY cs.id DESC) AS rn
        FROM dbo.chatSession AS cs
		WHERE 
			status = 'normal' 
			AND (@zaloOaId IS NULL OR cs.zaloOaId = @zaloOaId) 
			AND (@accountId IS NULL OR cs.accountId = @accountId) 
    )
    SELECT *
    FROM chatSessions
    WHERE rn BETWEEN ((@page - 1) * @size + 1) AND (@page * @size);

    -- Tập kết quả 2: tổng số dòng
    SELECT COUNT(*) AS totalCount
	FROM dbo.chatSession AS cs
		WHERE 
			status = 'normal' 
			AND (@zaloOaId IS NULL OR cs.zaloOaId = @zaloOaId) 
			AND (@accountId IS NULL OR cs.accountId = @accountId) 
END
GO