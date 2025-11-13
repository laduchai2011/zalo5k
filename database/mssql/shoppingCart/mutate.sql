ALTER PROCEDURE CreateShoppingCart
	@name NVARCHAR(255),
	@accountId INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @newShoppingCartId INT;

        INSERT INTO shoppingCart (name, total, status, accountId, updateTime, createTime)
        VALUES (@name, 0, 'normal', @accountId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

		SET @newShoppingCartId = SCOPE_IDENTITY();

		SELECT * FROM dbo.shoppingCart WHERE id = @newShoppingCartId;

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO

CREATE PROCEDURE AddMedicationToShoppingCart
	@amount INT,
	@discount FLOAT,
	@price FLOAT,
	@medicationId INT,
    @shoppingCartId INT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
        BEGIN TRANSACTION;
		DECLARE @newShoppingCartMedicationId INT;

        INSERT INTO shoppingCartMedication (amount, discount, price, status, medicationId, shoppingCartId, updateTime, createTime)
        VALUES (@amount, @discount, @price, 'normal', @medicationId, @shoppingCartId, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

		SET @newShoppingCartMedicationId = SCOPE_IDENTITY();

		SELECT * FROM dbo.shoppingCartMedication WHERE id = @newShoppingCartMedicationId;

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END;
GO