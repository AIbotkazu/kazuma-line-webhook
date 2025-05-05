
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/line", (req, res) => {
    console.log("LINE Webhook received:", req.body);
    res.sendStatus(200);
});

app.get("/", (req, res) => {
    res.send("Kazuma's Webhook Server is running.");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
