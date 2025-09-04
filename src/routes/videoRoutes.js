const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const verifySubscription = require("../middlewares/verifySubscription");

router.get("/free-videos", verifyToken, (req, res) => {
    return res.json({
        videos: [
            { id: 1, title: "Vídeo grátis 1" },
            { id: 2, title: "Vídeo grátis 2" },
        ],
        user: req.user
    });
});

router.get("/premium-videos", verifyToken, verifySubscription, (req, res) => {
    return res.json({
        videos: [
            { id: 101, title: "Filme exclusivo Premium 1" },
            { id: 102, title: "Série exclusiva Premium 2" },
        ],
        user: req.user
    });
});

module.exports = router