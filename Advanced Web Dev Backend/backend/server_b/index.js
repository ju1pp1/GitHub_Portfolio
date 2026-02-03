const express = require("express");
require("dotenv").config();
const { Kafka } = require("kafkajs");

const app = express();
const PORT = 4000;
const cors = require('cors');

app.use(cors());

// Kafka configuration
const kafka = new Kafka({
    clientId: "server_b",
    brokers: [process.env.KAFKA_BROKER || "kafka:9092"]
});

const consumer = kafka.consumer({ groupId: "emote-aggregator" });
const producer = kafka.producer();

let emoteBuffer = [];

// Aggregation settings
let aggregationSettings = {
    interval: 100, // Number of messages before aggregation
    threshold: 0.2, // 20% threshold
    allowedEmotes: ['❤️', '👍', '😢', '😡']
};

// Middleware parsing JSON
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    next();
  });

// Kafka consumer reads raw-emote-data topic
const consumeRawEmoteData = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: "raw-emote-data", fromBeginning: false});

    console.log("Server B is consuming raw emote data..");

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const emoteData = JSON.parse(message.value.toString());
            console.log("Received emote:", emoteData);

            if(aggregationSettings.allowedEmotes.includes(emoteData.emote)) {
                
                // Here emote data is stored for later aggregation
                emoteBuffer.push(emoteData);
                if(emoteBuffer.length >= aggregationSettings.interval) {
                    analyzeAndPublishAggregatedData();
                }
            }
        },
    });
};

// Emote aggregation logic
const analyzeAndPublishAggregatedData = async () => {
    const significantMoments = [];
    const emoteCounts = {};

    emoteBuffer.forEach(record => {
        const timestamp = record.timestamp.slice(0, 16); // Minute-level granularity
        const emote = record.emote;

        if(!emoteCounts[timestamp]) {
            emoteCounts[timestamp] = { total: 0 };
        }

        if(!emoteCounts[timestamp][emote]) {
            emoteCounts[timestamp][emote] = 0;
        }

        emoteCounts[timestamp][emote]++;
        emoteCounts[timestamp].total++;
    });

    for(const timestamp in emoteCounts) {
        const counts = emoteCounts[timestamp];
        const totalEmotes = counts.total;

        for(const emote in counts) {
            if(emote !== "total" && counts[emote] / totalEmotes > aggregationSettings.threshold) {
                significantMoments.push({
                    timestamp,
                    emote,
                    count: counts[emote],
                    totalEmotes
                });
            }
        }
    }

    if(significantMoments.length > 0) {
        await producer.connect();
        await producer.send({
            topic: "aggregated-emote-data",
            messages: significantMoments.map(moment => ({
                value: JSON.stringify(moment)
            }))
        });
        
        console.log("Published significant moments:", significantMoments);
    }

    // Buffer should be cleared after aggregation
    emoteBuffer.length = 0;
};

// REST API for Server B

app.get("/settings", (req, res) => {
    res.json(aggregationSettings);
});

// Update interval
app.post("/settings/interval", (req, res) => {
    const { interval } = req.body;
    if(typeof interval === "number" && interval > 0) {
        aggregationSettings.interval = interval;
        res.json({ success: true, message: `Interval set to ${interval}` });
    } else {
        res.status(400).json({ success: false, message: "Invalid interval" });
    }
});

// Update threshold
app.post("/settings/threshold", (req, res) => {
    const {threshold} = req.body;
    if(typeof threshold === "number" && threshold >= 0 && threshold <= 1) {
        aggregationSettings.threshold = threshold;
        res.json({ success: true, message: `Threshold set to ${threshold}` });
    } else {
        res.status(400).json({ success: false, message: "Invalid threshold (must be 0-1)" });
    }
});

// Update allowed emotes
app.post("/settings/allowed-emotes", async (req, res) => {
    const {allowedEmotes} = req.body;
    if(Array.isArray(allowedEmotes) && allowedEmotes.every(e => typeof e === "string")) {
        aggregationSettings.allowedEmotes = allowedEmotes;
        res.json({ success: true, message: "Allowed emotes updated", allowedEmotes });
    } else {
        res.status(400).json({ success: false, message: "Invalid emotes list" });
    }
});

// Start express server
app.listen(PORT, () => {
    console.log(`Server B running on http://localhost:${PORT}`);
});

consumeRawEmoteData();