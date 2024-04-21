import { Router } from 'express';

import User from '../Models/UserSchema';

import Route from '../Models/Schedule/Route';
import Schedules from '../Models/Schedule/Schedules';
import Stations from '../Models/Schedule/Stations';
import Trains from '../Models/Schedule/Trains';

import DiscountCardWaitingList from '../Models/Schedule/DiscountCardWaitingList';

import protect from '../Utility/protectMiddleware';

const router = Router();

// GET all Stations
router.get('/stations', protect, async (req, res) => {
    try {
        console.log("someone pinged on /stations");
        const stations = await Stations.find();
        console.log(stations);
        res.json(stations);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// GET all Trains
router.get('/trains', protect, async (req, res) => {
    try {
        const trains = await Trains.find();
        res.json(trains);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// GET route by station ID
router.get('/route/:stationId', protect, async (req, res) => {
    try {
        const route = await Route.findOne({ stationId: req.params.stationId });
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// GET all routes where origin is the station ID
router.get('/routes/:stationId', protect, async (req, res) => {
    try {
        console.log("someone pinged on /routes/:stationId", req.params.stationId);

        const routes = await Route.find({ originStationId: req.params.stationId });
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// GET all schedules where route ID is the route ID
router.get('/schedules/:routeId', protect, async (req, res) => {
    try {
        const schedules = await Schedules.find({ routeId: req.params.routeId });
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

//GET all users in the discount card waiting list
router.get('/discountCardWaitingList', protect, async (req, res) => {
    try {
        const users = await DiscountCardWaitingList.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

//POST user to the discount card waiting list and change the user's discount card status to "waiting"
router.post('/discountCardWaitingList/:userId', protect, async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingEntry = await DiscountCardWaitingList.findOne({ userId: userId });

        if (existingEntry) {
            return res.status(400).json({ message: 'User already in the discount card waiting list' });
        }

        const newUser = new DiscountCardWaitingList({
            userId: user._id,
            requestedDiscountCard: req.body.requestedDiscountCard
        });

        await newUser.save();
        await User.findByIdAndUpdate(user._id, { discountCardStatus: req.body.requestedDiscountCard });

        res.status(201).json({ message: 'User added to discount card waiting list' });
    } catch (error) {
        console.error(`Error while adding user with ID ${req.params.userId} to the discount card waiting list: `, error);
        res.status(500).json({ message: 'An error occurred while adding the user to the discount card waiting list. Please try again later.' });
    }
});

//DELETE user from the discount card waiting list and Grant the user a discount card
router.patch('/discountCardWaitingList/:userId', protect, async (req, res) => {
    const userId = req.params.userId;

    try {
        const waitingListUser = await DiscountCardWaitingList.findByIdAndDelete({ userId: userId });

        if (!waitingListUser) {
            return res.status(404).json({ message: `User with ID ${userId} not found in the discount card waiting list.` });
        }

        const updatedUser = await User.findByIdAndUpdate(waitingListUser.userId, { discountCardStatus: waitingListUser.requestedDiscountCard }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: `User with ID ${waitingListUser.userId} not found in the user database.` });
        }

        res.status(200).json({ message: `User with ID ${userId} has been removed from the discount card waiting list and their discount card status has been updated.` });
    } catch (error) {
        console.error(`Error while updating discount card status for user with ID ${userId}: `, error);
        res.status(500).json({ message: 'An error occurred while updating the discount card status. Please try again later.' });
    }
});

//DELETE user from the discount card waiting list without granting the user a discount card
router.delete('/discountCardWaitingList/:userId', protect, async (req, res) => {
    const userId = req.params.userId;

    try {
        const waitingListUser = await DiscountCardWaitingList.findByIdAndDelete(userId);

        if (!waitingListUser) {
            return res.status(404).json({ message: `User with ID ${userId} not found in the discount card waiting list.` });
        }

        const updatedUser = await User.findByIdAndUpdate(waitingListUser.userId, { discountCardStatus: "denied" }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: `User with ID ${waitingListUser.userId} not found in the user database.` });
        }

        res.status(200).json({ message: `User with ID ${userId} has been removed from the discount card waiting list and their discount card status has been updated to "denied".` });
    } catch (error) {
        console.error(`Error while updating discount card status for user with ID ${userId}: `, error);
        res.status(500).json({ message: 'An error occurred while updating the discount card status. Please try again later.' });
    }
});



export default router;

