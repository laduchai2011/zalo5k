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
        'admin',
        'admin',
        '0789860854',
        'la',
        'hai',
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
        1,
        'admin',
        '1'
    );