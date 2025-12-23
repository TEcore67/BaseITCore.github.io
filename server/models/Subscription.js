const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, index: true },
    lemonsqueezy_customer_id: { type: String, required: true },
    subscription_id: { type: String, required: true, unique: true, index: true },
    order_id: { type: Number },
    plan_variant_id: { type: Number, required: true },
    status: { type: String, required: true },
    renews_at: { type: Date },
    ends_at: { type: Date },
    last_payment_at: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
