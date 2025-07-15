const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String,required:false, unique: false, sparse: true },
    age: { type: Number },
    role: { type: String, default: 'farmer' },
    registrationDate: { type: Date, default: Date.now },
    avatar: { type: Buffer, default: null },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: Number },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    isVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationTokenExpires: { type: Date },
    passwordResetToken: { type: String },
    passwordResetTokenExpires: { type: Date }
});

const User = mongoose.model('User', userSchema);

module.exports = User;