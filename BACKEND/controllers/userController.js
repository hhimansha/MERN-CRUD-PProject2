const User = require('../models/userModel');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await User.login(email, password);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await User.signup(email, password);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signupUser, loginUser };
