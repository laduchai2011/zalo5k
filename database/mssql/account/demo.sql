INSERT INTO
    account (
        userName,
        password,
        phone,
        firstName,
        lastName,
        avatar,
        status,
        updateTime,
        createTime
    )
VALUES
    (
        'thuyhang',
        'thuyhangxinhgai',
        '0984867461',
        'Thuy',
        'Hang',
        NULL,
        'normal',
        TODATETIMEOFFSET(SYSUTCDATETIME(), -5),
        TODATETIMEOFFSET(SYSUTCDATETIME(), -5)
    );


INSERT INTO
    accountInformation (
        addedById,
        accountType,
        accountId
    )
VALUES
    (
        4,
        'admin',
        '4'
    );


DELETE FROM dbo.accountInformation
WHERE accountId = 3;
go
DELETE FROM dbo.account
WHERE id = 3;
go