const express = require('express');
const Subscription = require('../models/Subscription');
const verifyLemonSignature = require('../utils/verifyLemonSignature');

const router = express.Router();

router.post('/lemonsqueezy', async (req, res) => {
  const signature = req.get('X-Signature');
  const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  const rawBody = req.body;

  const isValid = verifyLemonSignature(rawBody, signature, webhookSecret);

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody.toString('utf8'));
  } catch (error) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const eventName = payload?.meta?.event_name;
  const attributes = payload?.data?.attributes || {};
  const subscriptionId = payload?.data?.id;
  const userId = payload?.meta?.custom_data?.user_id;

  try {
    switch (eventName) {
      case 'subscription_created': {
        if (!userId || !subscriptionId) {
          return res.status(400).json({ error: 'Missing subscription identifiers' });
        }

        await Subscription.create({
          user_id: userId,
          lemonsqueezy_customer_id: attributes.customer_id,
          subscription_id: subscriptionId,
          order_id: attributes.order_id,
          plan_variant_id: attributes.variant_id,
          status: attributes.status,
          renews_at: attributes.renews_at ? new Date(attributes.renews_at) : null,
          ends_at: attributes.ends_at ? new Date(attributes.ends_at) : null,
          last_payment_at: attributes.last_payment_at
            ? new Date(attributes.last_payment_at)
            : null,
        });
        break;
      }
      case 'subscription_updated': {
        if (!subscriptionId) {
          return res.status(400).json({ error: 'Missing subscription_id' });
        }

        await Subscription.findOneAndUpdate(
          { subscription_id: subscriptionId },
          {
            status: attributes.status,
            plan_variant_id: attributes.variant_id,
            renews_at: attributes.renews_at ? new Date(attributes.renews_at) : null,
            ends_at: attributes.ends_at ? new Date(attributes.ends_at) : null,
          },
          { new: true }
        );
        break;
      }
      case 'subscription_payment_success': {
        if (!subscriptionId) {
          return res.status(400).json({ error: 'Missing subscription_id' });
        }

        await Subscription.findOneAndUpdate(
          { subscription_id: subscriptionId },
          {
            last_payment_at: attributes.last_payment_at
              ? new Date(attributes.last_payment_at)
              : new Date(),
          },
          { new: true }
        );
        break;
      }
      default:
        return res.status(200).json({ received: true });
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
});

module.exports = router;
