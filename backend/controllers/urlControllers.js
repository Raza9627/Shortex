import Url from "../models/urlModel.js";

function generateShortCode() {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let code = "";

    for (let i = 0; i < 6; i++) {
        code += characters[Math.floor(Math.random() * characters.length)];
    }

    return code;
}

export async function getAllUrls(req, res) {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "You aren't logged in"
            });
        }

        const urls = await Url.find({
            user: userId
        });

        return res.status(200).json(urls);

    } catch (error) {
        console.log("error is", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function createUrl(req, res) {
    try {
        const { originalUrl, expiresAt } = req.body;
        const userId = req.userId;

        if (!originalUrl) {
            return res.status(400).json({
                message: "Original URL is required"
            });
        }

        // Validate URL
        try {
            const url = new URL(originalUrl);

            if (url.protocol !== "http:" && url.protocol !== "https:") {
                return res.status(400).json({
                    message: "Only HTTP and HTTPS URLs are allowed"
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: "Invalid URL"
            });
        }

        if (expiresAt && new Date() > new Date(expiresAt)) {
            return res.status(400).json({
                message: "Expiration date must be in the future"
            });
        }

        let newUrl;

        while (!newUrl) {
            const shortCode = generateShortCode();

            try {
                newUrl = await Url.create({
                    originalUrl,
                    shortCode,
                    user: userId,
                    isActive: true,
                    expiresAt
                });
            } catch (error) {
                if (error.code !== 11000) {
                    throw error;
                }
            }
        }

        const shortUrl = `${process.env.BACKEND_URL}/${newUrl.shortCode}`;

        return res.status(201).json({
            message: "Url generated successfully",
            shortCode: newUrl.shortCode,
            shortUrl
        });

    } catch (error) {
        console.log("error is", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
export async function disableUrl(req, res) {
    try {

        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "You aren't logged in"
            });
        }

        const url = await Url.findOneAndUpdate(
            {
                _id: req.params.id,
                user: userId
            },
            {
                isActive: false
            },
            {
                new: true
            }
        );

        if (!url) {
            return res.status(404).json({
                message: "URL not found or you don't have permission"
            });
        }

        return res.status(200).json({
            message: "Link disabled successfully"
        });

    } catch (error) {
        console.log("error is", error);

        return res.status(400).json({
            message: "Invalid URL ID"
        });
    }
}
export async function enableUrl(req, res) {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "You aren't logged in"
            });
        }
        const url = await Url.findOneAndUpdate(
            { _id: req.params.id, user: userId },
            { isActive: true },
            { new: true }
        )
        if (!url) {
            return res.status(404).json({ message: "URL not found" });
        }
        return res.status(200).json({
            message: "Link enabled successfully"
        })
    }
    catch (error) {
        console.log("error is", error);

        return res.status(400).json({
            message: "Invalid URL ID"
        });
    }
}
export async function deleteUrl(req, res) {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "You aren't logged in"
            });
        }

        const url = await Url.findOneAndDelete({
            _id: req.params.id,
            user: userId
        });

        if (!url) {
            return res.status(404).json({
                message: "URL not found or you don't have permission"
            });
        }

        return res.status(200).json({
            message: "Link deleted successfully"
        });

    } catch (error) {
        console.log("error is", error);

        return res.status(400).json({
            message: "Invalid URL ID"
        });
    }
}
export async function getAnalytics(req, res) {
    try {
        const urls = await Url.find({
            user: req.userId
        });

        const totalUrls = urls.length;

        const activeUrls = urls.filter(
            url => url.isActive === true
        ).length;

        const disabledUrls = urls.filter(
            url => url.isActive === false
        ).length;

        const totalClicks = urls.reduce(
            (total, url) => total + url.clicks,
            0
        );

        // -------------------------
        // Time calculations
        // -------------------------

        const now = new Date();

        // Start of today
        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);

        // Start of yesterday
        const startOfYesterday = new Date(startOfToday);
        startOfYesterday.setDate(
            startOfYesterday.getDate() - 1
        );

        // Start of last 7 days
        const startOf7Days = new Date(now);
        startOf7Days.setDate(
            startOf7Days.getDate() - 7
        );

        // Start of last 30 days
        const startOf30Days = new Date(now);
        startOf30Days.setDate(
            startOf30Days.getDate() - 30
        );

        // Start of this month
        const startOfThisMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        );

        // Start of last month
        const startOfLastMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            1
        );

        // -------------------------
        // Click calculations
        // -------------------------

        // Today's clicks
        const todayClicks = urls.reduce((total, url) => {
            const clicks = (url.clickHistory || []).filter(
                click =>
                    click.clickedAt >= startOfToday
            ).length;

            return total + clicks;
        }, 0);

        // Yesterday's clicks
        const yesterdayClicks = urls.reduce((total, url) => {
            const clicks = (url.clickHistory || []).filter(
                click =>
                    click.clickedAt >= startOfYesterday &&
                    click.clickedAt < startOfToday
            ).length;

            return total + clicks;
        }, 0);

        // Last 7 days clicks
        const last7DaysClicks = urls.reduce((total, url) => {
            const clicks = (url.clickHistory || []).filter(
                click =>
                    click.clickedAt >= startOf7Days
            ).length;

            return total + clicks;
        }, 0);

        // Last 30 days clicks
        const last30DaysClicks = urls.reduce((total, url) => {
            const clicks = (url.clickHistory || []).filter(
                click =>
                    click.clickedAt >= startOf30Days
            ).length;

            return total + clicks;
        }, 0);

        // This month's clicks
        const thisMonthClicks = urls.reduce((total, url) => {
            const clicks = (url.clickHistory || []).filter(
                click =>
                    click.clickedAt >= startOfThisMonth
            ).length;

            return total + clicks;
        }, 0);

        // Last month's clicks
        const lastMonthClicks = urls.reduce((total, url) => {
            const clicks = (url.clickHistory || []).filter(
                click =>
                    click.clickedAt >= startOfLastMonth &&
                    click.clickedAt < startOfThisMonth
            ).length;

            return total + clicks;
        }, 0);

        const thisMonthUrls = urls.filter(
            url => url.createdAt >= startOfThisMonth
        ).length;

        const lastMonthUrls = urls.filter(
            url =>
                url.createdAt >= startOfLastMonth &&
                url.createdAt < startOfThisMonth
        ).length;

        // -------------------------
        // Send response
        // -------------------------

        return res.status(200).json({
            totalUrls,
            activeUrls,
            disabledUrls,
            totalClicks,
            todayClicks,
            yesterdayClicks,
            last7DaysClicks,
            last30DaysClicks,
            thisMonthUrls,
            lastMonthUrls
        });

    } catch (error) {
        console.log("error is", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
export async function getAnalyticsDetails(req, res) {
    try {
        const urls = await Url.find({
            user: req.userId
        }).select(
            "_id shortCode originalUrl clicks isActive clickHistory"
        );

        const details = urls.map(url => {
            return {
                _id: url._id,
                shortCode: url.shortCode,
                originalUrl: url.originalUrl,
                clicks: url.clicks,
                isActive: url.isActive,
                clickHistory: url.clickHistory
            };
        });

        return res.status(200).json(details);

    } catch (error) {
        console.log("error is", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
//get weekly anlytics
export async function getWeeklyAnalytics(req, res) {
    try {

        const urls = await Url.find({
            user: req.userId
        });

        const now = new Date();

        // Start of today
        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);

        // Create last 7 days
        const days = [];

        for (let i = 6; i >= 0; i--) {

            const date = new Date(startOfToday);

            date.setDate(
                date.getDate() - i
            );

            days.push({
                date: date,
                label: date.toLocaleDateString("en-US", {
                    weekday: "short"
                }),
                clicks: 0
            });
        }

        // Count clicks for each day
        urls.forEach(url => {

            (url.clickHistory || []).forEach(click => {

                const clickDate = new Date(click.clickedAt);

                days.forEach(day => {

                    const startOfDay = new Date(day.date);

                    const endOfDay = new Date(day.date);

                    endOfDay.setDate(
                        endOfDay.getDate() + 1
                    );

                    if (
                        clickDate >= startOfDay &&
                        clickDate < endOfDay
                    ) {
                        day.clicks++;
                    }

                });

            });

        });

        return res.status(200).json({
            days: days.map(day => ({
                label: day.label,
                clicks: day.clicks
            }))
        });

    } catch (error) {

        console.log("error is", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}