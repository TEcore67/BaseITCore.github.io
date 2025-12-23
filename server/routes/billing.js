const express = require('express');

const router = express.Router();

router.post('/checkout', async (req, res) => {
  try {
    const { user_id: userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    const {
      LEMONSQUEEZY_API_KEY,
      LEMONSQUEEZY_STORE_ID,
      LEMONSQUEEZY_VARIANT_ID,
      LEMONSQUEEZY_SUCCESS_URL,
      LEMONSQUEEZY_CANCEL_URL,
    } = process.env;

    if (
      !LEMONSQUEEZY_API_KEY ||
      !LEMONSQUEEZY_STORE_ID ||
      !LEMONSQUEEZY_VARIANT_ID ||
      !LEMONSQUEEZY_SUCCESS_URL ||
      !LEMONSQUEEZY_CANCEL_URL
    ) {
      return res.status(500).json({ error: 'Missing Lemon Squeezy configuration' });
    }

    const payload = {
      data: {
        type: 'checkouts',
        attributes: {
          store_id: Number(LEMONSQUEEZY_STORE_ID),
          variant_id: Number(LEMONSQUEEZY_VARIANT_ID),
          checkout_options: {
            success_url: LEMONSQUEEZY_SUCCESS_URL,
            cancel_url: LEMONSQUEEZY_CANCEL_URL,
          },
          custom_data: {
            user_id: userId,
          },
        },
      },
    };

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LEMONSQUEEZY_API_KEY}`,
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return res.status(response.status).json({ error: errorBody || 'Checkout failed' });
    }

    const data = await response.json();
    const checkoutUrl = data?.data?.attributes?.url;

    if (!checkoutUrl) {
      return res.status(502).json({ error: 'Missing checkout URL from Lemon Squeezy' });
    }

    return res.status(200).json({ checkout_url: checkoutUrl });
  } catch (error) {
    return res.status(500).json({ error: 'Unexpected error creating checkout' });
  }
});

module.exports = router;
