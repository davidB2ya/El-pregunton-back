const { Schema, model } = require('mongoose');

// Schema creation for Player
const playerSchema = new Schema(
    {
        nickname: {
            type: String || Number,
            required: [true, 'Please enter your nickname!'],
            trim: true,
        },
        historyScore: {
            type: Number,
            default: 0
        },
        attempts : {
            type: Number,
            default: 1
        }
    },
    {
        timestamps: true,
    },
);

// Fixes in playerSchema
playerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
});

// Compilation of Player model
const Player = model('Player', playerSchema);

module.exports = Player;