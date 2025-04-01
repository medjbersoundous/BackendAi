import axios from 'axios';

export const predictRecovery = async (req, res) => {
    try {
        const FLASK_AI = process.env.FLASK_AI;

        if (!FLASK_AI) {
            console.error('FLASK_AI environment variable is not set!');
            return res.status(500).json({ message: 'FLASK_AI environment variable is not set!' });
        }

        const response = await axios.post(`${FLASK_AI}/predict`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error communicating with ML model', error: error.message });
    }
};
