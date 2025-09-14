const express = require('express');
const router = express.Router();

// Dummy payment processing endpoint
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'inr' } = req.body;
    
    // Simulate payment intent creation
    const paymentIntent = {
      id: `pi_dummy_${Date.now()}`,
      client_secret: `pi_dummy_${Date.now()}_secret_dummy`,
      amount: Math.round(amount * 100), // Convert to paise
      currency: currency,
      status: 'requires_payment_method'
    };

    res.json({
      success: true,
      paymentIntent
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create payment intent'
    });
  }
});

// Dummy payment confirmation endpoint
router.post('/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    
    // Simulate payment confirmation
    const paymentResult = {
      id: paymentIntentId,
      status: Math.random() > 0.1 ? 'succeeded' : 'failed', // 90% success rate
      amount_received: req.body.amount || 0,
      currency: 'inr'
    };

    res.json({
      success: paymentResult.status === 'succeeded',
      payment: paymentResult
    });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to confirm payment'
    });
  }
});

module.exports = router;
