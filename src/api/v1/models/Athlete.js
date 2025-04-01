import mongoose from 'mongoose';

const athleteSchema = new mongoose.Schema({
    athleteId: { type: String, required: true, unique: true },
    email:{type:String, required:true, unique:true},
    password: { type: String, required: true },
    fullName:{type:String, required:true},
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female'] },
    heightCm: { type: Number, required: true },
    weightKg: { type: Number, required: true },
    position: { type: String, required: true },
    verificationToken: { type: String },
    verified: { type: Boolean, default: false }, 
}, { timestamps: true });

const Athlete = mongoose.model('Athlete', athleteSchema);

export default Athlete;
