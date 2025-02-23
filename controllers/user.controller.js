
const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const signUp = async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body;
    if(!username || !email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if(existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const profilePicture = `https://robohash.org/${username}`;
        const user = new User({ username, email, password: hashedPassword, firstName, lastName, profilePicture });
        await user.save();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
    }
}
const logIn = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = generateToken(user);
        const { password: userPassword, ...rest } = user._doc;
        res.cookie('authToken', token, { httpOnly: true });
        res.status(200).json({ message: 'Sign-in successful' , token: token, user: rest });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error signing in' });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching users' });
    }
}
const logout = (req, res) => {
    res.clearCookie('authToken');
    res.status(200).json({ message: 'Logged out successfully' });
}


module.exports = { signUp, logIn , getAllUsers, logout };