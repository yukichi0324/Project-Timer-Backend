const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express();

// CORSミドルウェアを設定
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-cybozu-api-token']
}));

// リクエストボディをJSONとしてパース
app.use(express.json());

app.post("/api/data", (req, res) => {
  const url = "https://jdg50gqzyue2.cybozu.com/k/v1/record.json";
  const options = {
    url: url,
    method: "POST",
    headers: {
      "X-Cybozu-API-Token": req.headers["x-cybozu-api-token"],
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  };
  request(options).pipe(res);
});

// サーバーを起動
const port = 3000; // ポート番号を指定
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
