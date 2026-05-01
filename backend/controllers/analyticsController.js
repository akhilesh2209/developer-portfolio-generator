import Analytics from "../models/Analytics.js";

export const getAnalytics = async (req, res) => {
  try {
    let analytics = await Analytics.findOne();
    if (!analytics) analytics = await Analytics.create({ views: 0, clicks: 0, downloads: 0 });
    res.json({ views: analytics.views, clicks: analytics.clicks, downloads: analytics.downloads });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const trackView = async (req, res) => {
  try {
    let analytics = await Analytics.findOne();
    if (!analytics) analytics = await Analytics.create({ views: 0, clicks: 0, downloads: 0 });
    analytics.views += 1;
    await analytics.save();
    res.json({ views: analytics.views });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const trackClick = async (req, res) => {
  try {
    let analytics = await Analytics.findOne();
    if (!analytics) analytics = await Analytics.create({ views: 0, clicks: 0, downloads: 0 });
    analytics.clicks += 1;
    await analytics.save();
    res.json({ clicks: analytics.clicks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const trackDownload = async (req, res) => {
  try {
    let analytics = await Analytics.findOne();
    if (!analytics) analytics = await Analytics.create({ views: 0, clicks: 0, downloads: 0 });
    analytics.downloads += 1;
    await analytics.save();
    res.json({ downloads: analytics.downloads });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};