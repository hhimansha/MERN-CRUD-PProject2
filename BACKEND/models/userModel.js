const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { 
        type : String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required : true
    }
});

// Static signup method
userSchema.statics.signup = async function(email, password) {
    try {
        // Validation
        if (!email || !password) {
            throw new Error('All fields must be filled');
        }
        if (!validator.isEmail(email)) {
            throw new Error('Email is not valid');
        }
        if (!validator.isStrongPassword(password)) {
            throw new Error('Password not strong enough');
        }

        const exists = await this.findOne({ email });

        if (exists) {
            throw new Error('Email already in use');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await this.create({ email, password: hash });

        const token = createToken(user._id);

        return { email, token };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Static login method
userSchema.statics.login = async function(email, password) {
    try {
        // Login validation
        if (!email || !password) {
            throw new Error('All fields must be filled');
        }

        const user = await this.findOne({ email });

        if (!user) {
            throw new Error('Incorrect email');
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error('Incorrect password');
        }

        const token = createToken(user._id);

        return { email, token };
    } catch (error) {
        throw new Error(error.message);
    }
};

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

module.exports = mongoose.model('User', userSchema);
