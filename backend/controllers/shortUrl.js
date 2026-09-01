import Url from "../models/urlModel.js";

export async function redirectUrl(req, res) {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                message: "Short URL not found"
            });
        }

        if (!url.isActive) {
            return res.status(404).json({
                message: "URL is disabled"
            });
        }

        if (url.expiresAt && new Date() > url.expiresAt) {
            return res.status(404).json({
                message: "URL has expired"
            });
        }

        // Count the click
        url.clicks++;

        // Store when the click happened
        url.clickHistory.push({
            clickedAt: new Date()
        });

        await url.save();

        res.redirect(url.originalUrl);

    } catch (error) {
        console.log("error is", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}