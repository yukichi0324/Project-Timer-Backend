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
  request(options, (error, response, body) => {
    if (error) {
      console.error('Request Error:', error); // エラーをログ出力
      return res
        .status(500)
        .json({ message: "Internal server error", details: error.message });
    }

    console.log('Response Status Code:', response.statusCode); // レスポンスのステータスコードをログ出力
    console.log('Response Body:', body); // レスポンスボディをログ出力

    if (response.statusCode >= 400) {
      // 別のAPIからエラーが返ってきた場合
      return res
        .status(response.statusCode)
        .json({ message: "API request failed", details: body });
    }

    // 成功した場合
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-cybozu-api-token"
    );
    res.json(body);
  });
});


// // サーバーを起動
// const port = 3002;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
