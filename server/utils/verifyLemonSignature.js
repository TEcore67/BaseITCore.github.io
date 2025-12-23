const crypto = require('crypto');

const verifyLemonSignature = (rawBody, signature, webhookSecret) => {
  if (!rawBody || !signature || !webhookSecret) {
    return false;
  }

  const hmac = crypto.createHmac('sha256', webhookSecret);
  hmac.update(rawBody);
  const digest = hmac.digest('hex');

  if (digest.length !== signature.length) {
    return false;
  }

  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
  } catch (error) {
    return false;
  }
};

module.exports = verifyLemonSignature;
