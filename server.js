
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/line", (req, res) => {
    const body = req.body;
    console.log("Received body:", JSON.stringify(body, null, 2));

    if (body.events && body.events.length > 0) {
        const userId = body.events[0].source.userId;
        console.log("★ KazumaのUID:", userId);
    }

    res.sendStatus(200);
});

app.get("/", (req, res) => {
    res.send("Kazuma's Webhook Server is running.");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
