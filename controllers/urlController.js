const Url = require("../models/Url");
const shortid = require("shortid");

// Create Short URL
exports.createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    const shortCode = shortid.generate();

    const url = await Url.create({
      originalUrl,
      shortCode,
    });

    res.status(201).json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: `http://localhost:5000/${url.shortCode}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// Redirect URL
exports.redirectUrl = async (req, res) => {
  try {
    console.log("Requested Code:", req.params.shortCode);

    const all = await Url.find();
    console.log("All URLs:", all);

    const url = await Url.findOne({
      shortCode: req.params.shortCode.trim(),
    });

    console.log("Found URL:", url);

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    url.clicks++;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};