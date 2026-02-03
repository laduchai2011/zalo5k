CREATE PROCEDURE UserTakeRoomToChat
	@userIdByApp NVARCHAR(255),
	@zaloOaId INT
AS
BEGIN
	
    SELECT * FROM dbo.chatRoom AS cs
		WHERE 
			status = 'normal' 
			AND (@userIdByApp IS NULL OR cs.userIdByApp = @userIdByApp)
			AND (@zaloOaId IS NULL OR cs.zaloOaId = @zaloOaId) 
END
GO