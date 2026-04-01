import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
        
        res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true });
        res.status(201).json({
            message: "User Registered Successfully",
            user: { _id: user._id, username: user.username, email: user.email }, 
            token 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
        
        res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true });
        res.status(200).json({
            message: "Logged in Successfully",
            user: { _id: user._id, username: user.username, email: user.email }, 
            token
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export { registerUser, loginUser };