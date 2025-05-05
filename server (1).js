
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/line", async (req, res) => {
    const body = req.body;
    console.log("Received body:", JSON.stringify(body, null, 2));

    if (body.events && body.events.length > 0) {
        const userId = body.events[0].source.userId;
        console.log("★ KazumaのUID:", userId);
    }

    // KazumaのUIDとアクセストークンを使用してLINEに通知を送信
    try {
        await axios.post(
            "https://api.line.me/v2/bot/message/push",
            {
                to: "U79e000dbf91314cc0410a1d0921e02c1",
                messages: [{ type: "text", text: body.message || "Kazuma、通知テスト成功！" }]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.LINE_ACCESS_TOKEN}`
                }
            }
        );
        res.sendStatus(200);
    } catch (error) {
        console.error("LINE送信エラー:", error.response?.data || error.message);
        res.sendStatus(500);
    }
});

app.get("/", (req, res) => {
    res.send("Kazuma's Webhook Server is running.");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
