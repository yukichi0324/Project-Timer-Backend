const express = require("express");
const request = require("request");
const app = express();
const port = 3001;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-cybozu-api-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // POSTメソッドを許可
  next();
});

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
