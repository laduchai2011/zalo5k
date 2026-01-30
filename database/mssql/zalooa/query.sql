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

ALTER PROCEDURE GetZaloOaListWith2Fk
	@page INT,
    @size INT,
	@zaloAppId INT,
    @accountId INT
AS
BEGIN
	-- Tập kết quả 1: dữ liệu phân trang
    WITH zaloOas AS (
        SELECT zo.*,
			ROW_NUMBER() OVER (ORDER BY zo.id DESC) AS rn
        FROM dbo.zaloOa AS zo
		WHERE 
			status = 'normal'  
			AND (@zaloAppId IS NULL OR zo.zaloAppId = @zaloAppId) 
			AND (@accountId IS NULL OR zo.accountId = @accountId) 
    )
    SELECT *
    FROM zaloOas
    WHERE rn BETWEEN ((@page - 1) * @size + 1) AND (@page * @size);

    -- Tập kết quả 2: tổng số dòng
    SELECT COUNT(*) AS totalCount
	FROM dbo.zaloOa AS zo
		WHERE 
			status = 'normal' 
			AND (@zaloAppId IS NULL OR zo.zaloAppId = @zaloAppId) 
			AND (@accountId IS NULL OR zo.accountId = @accountId) 
END
GO