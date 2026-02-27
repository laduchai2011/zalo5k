INSERT INTO dbo.zaloApp (label, appId, appName, appSecret, status, accountId, updateTime, createTime)
VALUES ('5k aquarium', '2474292114893114248', '5k aquarium', '7XFkowzBCeRBRGqDhUkL', 'normal', 1, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

INSERT INTO dbo.zaloOa (label, oaId, oaName, oaSecret, refreshToken, status, zaloAppId, accountId, updateTime, createTime)
VALUES ('5k aquarium (OA)', '2018793888801741529', '5kcacanh', 'iRf70Tagp3qpjVYuYWld', '', 'normal', 3, 1, SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET());

INSERT INTO dbo.zaloOaToken (refreshToken, zaloOaId)
VALUES ('eBn2R9q_6XsbkK5XbpSO6AoqG6IUBMrqqwDVSPzxU4txgL5Ff6ryVPltKKJQ4GnfavDBGgn-56NfZHracrW-IFYN432hLKedyOPq9x07BnhvWZyWjmCT1j3U7GEo728xx_uEGwSQLs3Bb0fOzKzOQhohNNhJA7H2jzjmVk8yN7oIn797pZfUIPFTSqduEbTteVn8Pyu644wByYrDvI84DRlQ9pJI1dKKY8bIBxjuUoNVl789v6nL2RQKHGlvUsKKWPixQyfk7cBuiprBXpPYQhdULs_6FdnkX-XZVlaLHs-xasL-vsD7GwdZOcByR5aIj9K64FXt7XEBcKSDo49c0PEGEmNeOIWOWAKmDSvW44sDZY1EmL0pSgdV2ddBC5baay5uMA1EN7BBcWPZX1mwMz7b665F2hTgI9ub6X0', 4)

UPDATE dbo.zaloOaToken WITH (ROWLOCK)
SET refreshToken = 'dFkA5rDyOqAP_eaQMNHXHv3pY1zGRY8BnhcNLmiuEqgR_ODg1pfWIyZCxtDv46TSkCVrMdKuTbFxqTuBRIue1kRwbrncFnvxmSMDOc0I14t8pPLaT0m_IiIDdc5q32fkeOoIJpL66K6BXeLiHNONNykpc4bASXjI-eoNP5PoOK_ecDr2FLvF6FQxrZ1fMruwsj39EbiWTXJE-jfA3dfULho7xGiMPtqAdRhe8rPk1XpRdvuMPsesBFczX7L5EZXLz_cRScGeS2hAsfyyHZO6VSJnk5DQCW5SajkqGmKF34ALYfXq965sMhU5vGKCUGWlkf-d43Hx63E-dQrhF5m7QPw1ip8iTIqybhN5A5bEJ130hjmMIKLqEUBFt3XH37DXmehGL7C1Hd7PtDXlM5TDJlQGsHBuizjiK6PZJm'
WHERE zaloOaId = 4