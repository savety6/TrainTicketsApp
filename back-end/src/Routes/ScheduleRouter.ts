import { Router } from 'express';

import Route from '../Models/Schedule/Route';
import Schedules from '../Models/Schedule/Schedules';
import Stations from '../Models/Schedule/Stations';
import Trains from '../Models/Schedule/Trains';

import protect from '../Utility/protectMiddleware';

const router = Router();

// GET all Stations
router.get('/stations', protect, async (req, res) => {
    try {
        const stations = await Stations.find();
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

