const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
const friendSchema = require('./Friend');


// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            max_length: 50,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max_length: 50,
            match: [/.+@.+\..+/, 'Must be an email address!'],
        },
        friends: [friendSchema],
        thoughts: [thoughtSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const User = model('user', userSchema);

module.exports = User;
