import User from "../Models/UserSchema";
import jwt from "jsonwebtoken";
import { MongoError } from "mongodb";

const generateToken = (user) => {
    return jwt.sign({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, discountCardStatus: user.discountCardStatus }, process.env.JWT_SECRET, {
        expiresIn: '1w', // Token expiration time
    });
};

export async function authLoginController(req, res) {
    const { name, email, password } = req.body;

    try {
        let user;

        if (name) {
            user = await User.findOne({ name });
        } else if (email) {
            user = await User.findOne({ email });
        } else {
            return res.status(400).json({ error: "Please provide either name or email" });
        }
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log("Invalid credentials");
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.status(200).json({ token: token });
    } catch (error) {
        if (error instanceof MongoError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error });
        }
    }
}

export async function authRegisterController (req, res) {
    const { name, email, password } = req.body;
    console.log("Registering user:", name, email, password);
    
    try {
        const user = new User({
            name,
            email,
            password
        });
        await user.save();
        const token = generateToken(user);
        res.status(200).json({ token: token });
    }
    catch (error) {
        console.log(error);
        
        if (error instanceof MongoError) {
            if (error.code === 11000) { //TODO: check for other known errors
                res.status(400).json({ error: "User already exists" });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
        else {
            res.status(400).json({ error: error });
        }
    }
}