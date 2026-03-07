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
	@id INT,
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
			THROW 50002, N'Thành viên này chưa có trong danh sách !', 2;
		END

		IF NOT EXISTS (
			SELECT 1
			FROM dbo.agent
			WHERE id = @id AND accountId = @accountId
		)
		BEGIN
			THROW 50003, N'Agent này không phải của bạn !', 3;
		END

		UPDATE dbo.agent
		SET agentAccountId = @agentAccountId
		WHERE id = @id;

		SELECT * FROM dbo.agent WHERE status = 'normal' AND id = @id;

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