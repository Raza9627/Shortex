import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({

    originalUrl: {
        type: String,
        required: true
    },

    shortCode: {
        type: String,
        required: true,
        unique: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    clicks: {
        type: Number,
        default: 0
    },

    clickHistory: [{
        clickedAt: {
            type: Date,
            default: Date.now
        }
    }],

    expiresAt: {
        type: Date
    }

}, { timestamps: true });

const Url = mongoose.model("Url", urlSchema);

export default Url;