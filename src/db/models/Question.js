const { Schema, model } = require('mongoose');

// Schema creation for Question
const questionSchema = new Schema(
    {
        question:  String,
        choices: [String],
        answer : String,
        category:  Number
    },
    {
        timestamps: true,
    },
);

// Fixes in questionSchema
questionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
});

// Compilation of Question model
const Question = model('Question', questionSchema);

module.exports = Question;