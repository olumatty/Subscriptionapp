    const express = require('express');
    const router = express.Router();
    const Subscription = require('../Models/Subscription');
    const ensureAuth = require("../Middleware/auth");

    // Get all subscriptions for the authenticated user
    router.get('/', ensureAuth, async (req, res) => {
        try {
            const subscriptions = await Subscription.find({ userId: req.user.id });
            res.status(200).json(subscriptions);
        } catch (error) {
            res.status(500).json({ message: "Error fetching subscriptions.", error: error.message });
        }
    });

    // Add a new subscription for the authenticated user
    router.post('/', ensureAuth, async (req, res) => {
        const { name, cost, startDate, renewalDate, category } = req.body;
        const userId = req.user.id; 

        const newSubscription = new Subscription({
            name,
            cost,
            startDate,
            renewalDate,
            category,
            userId 
        });

        try {
            await newSubscription.save();
            res.status(201).json(newSubscription);
        } catch (error) {
            res.status(400).json({ message: "Error adding subscription.", error: error.message });
        }
    });

    // Edit a subscription for the authenticated user
    router.put('/:id', ensureAuth, async (req, res) => {
        const { id } = req.params;
        const { name, cost, startDate, renewalDate, category } = req.body;

        try {
            const updatedSubscription = await Subscription.findOneAndUpdate(
                { _id: id, userId: req.user.id },
                { name, cost, startDate, renewalDate, category },
                { new: true }
            );

            if (!updatedSubscription) {
                return res.status(404).json({ message: "Subscription not found or unauthorized." });
            }

            res.status(200).json(updatedSubscription);
        } catch (error) {
            res.status(400).json({ message: "Error updating subscription.", error: error.message });
        }
    });

    // Delete a subscription for the authenticated user
    router.delete('/:id', ensureAuth, async (req, res) => {
        const { id } = req.params;

        try {
            const deletedSubscription = await Subscription.findOneAndDelete({
                _id: id,
                userId: req.user.id 
            });

            if (!deletedSubscription) {
                return res.status(404).json({ message: "Subscription not found or unauthorized." });
            }

            res.status(200).json({ message: "Subscription deleted." });
        } catch (error) {
            res.status(500).json({ message: "Error deleting subscription.", error: error.message });
        }
    });

    module.exports = router;
