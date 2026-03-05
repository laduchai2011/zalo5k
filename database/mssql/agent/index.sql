CREATE TABLE agent (
    id INT PRIMARY KEY IDENTITY(1,1),
	type NVARCHAR(255) NOT NULL,
	isActivity BIT NOT NULL,
	expiry DATETIMEOFFSET(7),
	status NVARCHAR(255) NOT NULL,
    agentAccountId INT UNIQUE,
	accountId INT UNIQUE NOT NULL,
    updateTime DATETIMEOFFSET(7) NOT NULL,
    createTime DATETIMEOFFSET(7) NOT NULL,

	CONSTRAINT FK_agent_AgentAccount FOREIGN KEY (agentAccountId) REFERENCES account(id),
	CONSTRAINT FK_agent_Account FOREIGN KEY (accountId) REFERENCES account(id)
)
GO
CREATE NONCLUSTERED INDEX idx_account_id ON agent(accountId);
GO
