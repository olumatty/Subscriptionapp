const express = require('express');
const router = express.Router();
const Subscription = require('../Models/Subscription');
const ensureAuth  = require('../Middleware/auth'); 

router.get('/', ensureAuth, async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the token
    const subscriptions = await Subscription.find({ userId });

    const totalExpense = subscriptions.reduce((total, sub) => total + sub.cost, 0);
    const expenses = subscriptions.map(sub => ({
      name: sub.name,
      cost: sub.cost,
      startDate: sub.startDate,
      category: sub.category,
    }));

    res.status(200).json({ totalExpense, expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Error fetching expenses." });
  }
});

module.exports = router;
