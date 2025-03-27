import jwt from 'jsonwebtoken';
import Athlete from '../models/Athlete.js';

export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, token missing' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.athlete = await Athlete.findById(decoded.id).select('-password');

        if (!req.athlete) {
            return res.status(404).json({ message: 'Athlete not found' });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
