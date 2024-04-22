import { Router } from 'express';
import Tickets from '../Models/TicketSchema';

import protect from '../Utility/protectMiddleware';

const router = Router();

// GET all tickets by user ID
router.get('/:id', protect, async (req, res) => {
    try {
        const tickets = await Tickets.find({ userId: req.params.id });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// POST create new ticket
router.post('/', protect, async (req, res) => {
    try {
        const ticket = new Tickets({
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            price: req.body.price,
        });
        await ticket.save();
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// DELETE ticket by ID
router.delete('/:id', protect, async (req, res) => {
    try {
        await Tickets.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// PUT update ticket by user ID
router.put('/:id', protect, async (req, res) => {
    try {
        const ticket = await Tickets.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        ticket.userId = req.body.userId;
        ticket.title = req.body.title;
        ticket.description = req.body.description;
        ticket.status = req.body.status;
        ticket.price = req.body.price;
        await ticket.save();
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default router;
