ALTER PROCEDURE UserTakeRoomToChat
	@userIdByApp NVARCHAR(255),
	@zaloOaId INT
AS
BEGIN
	
    SELECT * FROM dbo.chatRoom AS cr
		WHERE 
			status = 'normal' 
			AND (@userIdByApp IS NULL OR cr.userIdByApp = @userIdByApp)
			AND (@zaloOaId IS NULL OR cr.zaloOaId = @zaloOaId) 
END
GO

CREATE PROCEDURE GetChatRoomWithId
	@id INT
AS
BEGIN
    SELECT * FROM dbo.chatRoom AS cr
		WHERE 
			status = 'normal' 
			AND (@id IS NULL OR cr.id = @id)
END
GO