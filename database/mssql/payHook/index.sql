CREATE TABLE payHook (
    id INT PRIMARY KEY IDENTITY(1,1),
    gateway varchar(100) NOT NULL,
    transactionDate timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
    accountNumber varchar(100) DEFAULT NULL,
    subAccount varchar(250) DEFAULT NULL,
    amountIn decimal(20,2) NOT NULL DEFAULT 0.00,
    amountOut decimal(20,2) NOT NULL DEFAULT 0.00,
    accumulated decimal(20,2) NOT NULL DEFAULT 0.00,
    code varchar(250) DEFAULT NULL,
    transactionContent text DEFAULT NULL,
    referenceNumber varchar(255) DEFAULT NULL,
    body text DEFAULT NULL,
	agentPayId INT,
	orderId INT,
    createdAt timestamp NOT NULL DEFAULT current_timestamp(),

	CONSTRAINT FK_payHook_AgentPay FOREIGN KEY (agentPayId) REFERENCES agentPay(id),
	CONSTRAINT FK_payHook_Order FOREIGN KEY (orderId) REFERENCES [order](id)
)
GO
CREATE NONCLUSTERED INDEX idx_agentPay_id ON agentPay(agentPayId);
GO
CREATE NONCLUSTERED INDEX idx_order_id ON [order](orderId);
GO


