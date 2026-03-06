ALTER PROCEDURE CreateAgent
	@type NVARCHAR(255),
	@isActivity BIT,
	@expiry DATETIMEOFFSET(7),
	@agentAccountId INT,
	@accountId INT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @newAgentId INT;

		-- Thêm medication
        INSERT INTO dbo.agent (type, isActivity, expiry, status, agentAccountId, accountId, updateTime, createTime)
        VALUES (@type, @isActivity, @expiry, 'normal', @agentAccountId, @accountId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

		SET @newAgentId = SCOPE_IDENTITY();

		SELECT * FROM dbo.agent WHERE id = @newAgentId;

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO

ALTER PROCEDURE AgentAddAccount
	@agentAccountId INT,
	@accountId INT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
        BEGIN TRANSACTION;

		IF NOT EXISTS (
			SELECT 1
			FROM dbo.accountInformation
			WHERE addedById = @accountId AND accountId = @agentAccountId
		)
		BEGIN
			THROW 50002, N'Thành viên này chưa có trong danh sách !', 1;
		END

		UPDATE dbo.agent
		SET agentAccountId = @agentAccountId
		WHERE accountId = @accountId;

		SELECT * FROM dbo.agent WHERE status = 'normal' AND accountId = @accountId AND agentAccountId = @agentAccountId;

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO

delete dbo.agent