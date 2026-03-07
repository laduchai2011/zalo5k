ALTER PROCEDURE CreateAgent
	@accountId INT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
        BEGIN TRANSACTION;

		IF NOT EXISTS (
			SELECT 1
			FROM dbo.accountInformation
			WHERE accountId = @accountId AND accountType = 'admin'
		)
		BEGIN
			THROW 50001, N'Không phải tài khoản admin .', 1;
		END

		DECLARE @newAgentId INT;

		-- Thêm medication
        INSERT INTO dbo.agent (type, expiry, status, agentAccountId, accountId, updateTime, createTime)
        VALUES ('basic', NULL, 'normal', NULL, @accountId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

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
			WHERE accountId = @accountId AND accountType = 'admin'
		)
		BEGIN
			THROW 50001, N'Không phải tài khoản admin .', 1;
		END

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