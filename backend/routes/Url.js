const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const shortid = require('shortid');

router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const shortCode = shortid.generate();

  const newUrl = new Url({ originalUrl, shortCode });
  await newUrl.save();

  res.json({ shortUrl: `http://localhost:3000/${shortCode}` });
});

router.get('/:shortCode', async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.shortCode });

  if (url) {
    url.clicks++;
    await url.save();
    return res.redirect(url.originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

module.exports = router;
