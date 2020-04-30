const express = require("express");

const app = express();
const bodyparser = require("body-parser");
var cors = require('cors')

const port = process.env.PORT || 3200;
app.use(cors())

// middleware

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/access-token', (req, res) => {
    res.json({
        access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6IjQxMjMyNDAwODkwIiwibmFtZWlkIjoiNDEyMzI0MDA4OTAiLCJnaXZlbl9uYW1lIjoiS2VsdnltIE1pcmFuZGEiLCJ2ZXJzaW9uIjoidjEiLCJpYXQiOiIxNTg4MjA2NTYwIiwiZW1haWwiOiJrZWx2eW1tQGdtYWlsLmNvbSIsImNsaSI6IntcIkNsaWVudElkXCI6XCI4NzZkYWIyMTkwNDY0ODg0YmY5YjA5MmFhMTQwNzU4NVwiLFwiTmFtZVwiOlwiUG9ydGFsL0hvbWUgQnJva2VyXCIsXCJJbnRlcm5hbFwiOmZhbHNlfSIsImFjYyI6IjcwNTQyMjgiLCJlc2ciOiJBTEloOVdYK256WW1TUGJZKyticnU2Z0FuUjdnbTYvdTI3ekpOVE5HZjMrK2NlR3dCU1k9IiwiYWR2IjoiODAiLCJjaWEiOiIxOTEuMTMuOTQuNjUiLCJzaGMiOiI2TjhTSyIsImlzcyI6Imh0dHBzOi8vYXBpLmVhc3ludmVzdC5jb20uYnIvYXV0aCIsImF1ZCI6Imh0dHBzOi8vd3d3LmVhc3ludmVzdC5jb20uYnIiLCJleHAiOjE1ODgyMzUzNjB9.NfJ9kJzuh7-haOOgy3dB21KyqSb6xrV_2XFcVidZXC0'
    })
})

app.get('/custody-position', (req, res) => {
    res.json({
        "easyBalance":10.00,
        "totalInvestments":0.0,
        "totalBalance":10.00,
        "hasIpo":false,
        "hasEquity":true,
        "investmentsQuantity":0.0,
        "availableWithdrawMoney":10.00,
        "isProjectedBalance":false,
        "isCached":false,
        "cacheUpdatedData":"0001-01-01T00:00:00",
        "investments":[],
        "investmentPortfolio":[
            {
                "investmentType": {
                    "id":1,
                    "description":"Tesouro Direto e Títulos Públicos",
                    "color":"#4F034F"
                },
                "value":0.0,
                "percentagePortfolio":0.0
            }
        ]
    })
})

app.listen(port, () => {
  console.log(`running at port ${port}`);
});