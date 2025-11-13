CREATE TABLE shoppingCart (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(255) NOT NULL,
	total FLOAT NOT NULL,
    status NVARCHAR(255) NOT NULL,
    accountId INT NOT NULL,
    updateTime DATETIMEOFFSET(7) NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    createTime DATETIMEOFFSET(7) NOT NULL DEFAULT SYSDATETIMEOFFSET(),

	CONSTRAINT FK_shoppingCart_Account FOREIGN KEY (accountId) REFERENCES account(id)
)
GO
CREATE NONCLUSTERED INDEX idx_account_id ON shoppingCart(accountId);
GO

CREATE TABLE shoppingCartMedication (
    id INT PRIMARY KEY IDENTITY(1,1),
	amount INT NOT NULL,
	discount FLOAT NOT NULL,
	price FLOAT NOT NULL,
    status NVARCHAR(255) NOT NULL,
    medicationId INT NOT NULL,
    shoppingCartId INT NOT NULL,
    updateTime DATETIMEOFFSET(7) NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    createTime DATETIMEOFFSET(7) NOT NULL DEFAULT SYSDATETIMEOFFSET(),

	CONSTRAINT FK_shoppingCartMedication_medication FOREIGN KEY (medicationId) REFERENCES medication(id),
	CONSTRAINT FK_shoppingCartMedication_shoppingCart FOREIGN KEY (shoppingCartId) REFERENCES shoppingCart(id)
)
GO
CREATE NONCLUSTERED INDEX idx_medication_id ON shoppingCartMedication(medicationId);
GO
CREATE NONCLUSTERED INDEX idx_shoppingCart_id ON shoppingCartMedication(shoppingCartId);
GO
