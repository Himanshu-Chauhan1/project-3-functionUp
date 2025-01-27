const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

        title: {
            type: String,
            required: true,
            enum: ["Mr", "Mrs", "Miss"],
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: Number,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLen: 8,
            maxLen: 15
        },
        address: {
            street: { type: String, trim: true },
            city: { type: String, trim: true },
            pincode: { type: String, trim: true }
        }
    }, { timestamps: true }) // created at , updatedat

module.exports = mongoose.model("User", userSchema)