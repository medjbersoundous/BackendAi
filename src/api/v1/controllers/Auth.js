import bcrypt from 'bcryptjs';
import Athlete from '../models/Athlete.js';
import { generateToken } from '../../helper/GenerateToken.js';
import crypto from 'crypto';
import { sendVerificationEmail } from '../../helper/emailHelper.js';
const generateAthleteId = () => {
    return `ATH-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

export const registerAthlete = async (req, res) => {
  try {
    const { fullName, email, age, gender, heightCm, weightKg, position, password } = req.body;

    const existingAthlete = await Athlete.findOne({ email });
    if (existingAthlete) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const athleteId = generateAthleteId();
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const athlete = new Athlete({
      athleteId,
      fullName,
      email,
      age,
      gender,
      heightCm,
      weightKg,
      position,
      password: hashedPassword,
      verified: false, 
      verificationToken, 
    });

    await athlete.save();
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: 'Athlete registered successfully, please verify your email to activate your account.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const loginAthlete = async (req, res) => {
  try {
      const { email, password } = req.body;
      const athlete = await Athlete.findOne({ email });
      if (!athlete) {
          return res.status(404).json({ message: 'Athlete not found' });
      }
      if (!athlete.verified) {
          return res.status(403).json({ message: 'Please verify your account first' });
      }

      const isMatch = await bcrypt.compare(password, athlete.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const token = generateToken(athlete._id);
      res.json({ message: 'Login successful', token, athleteId: athlete.athleteId });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const getAthleteInfo = async (req, res) => {
    try {
        res.status(200).json({ athlete: req.athlete });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

