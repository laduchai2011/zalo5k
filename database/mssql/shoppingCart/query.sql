CREATE PROCEDURE GetAllShoppingCarts
    @accountId INT
AS
BEGIN
	SELECT 
    sc.*,
    ROW_NUMBER() OVER (ORDER BY sc.id DESC) AS rn
	FROM shoppingCart AS sc
	WHERE sc.accountId = @accountId
	ORDER BY sc.id DESC;
END
GO