const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express();

// CORSミドルウェアの設定
app.use(cors({
  origin: '*', // 全てのオリジンを許可
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-cybozu-api-token']
}));

app.use(express.json());

// プレフライトリクエストの明示的な処理
app.options('/api/data', cors()); // プレフライトリクエストを明示的に処理

// APIエンドポイントの設定
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
