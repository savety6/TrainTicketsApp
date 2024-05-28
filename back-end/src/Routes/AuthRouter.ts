import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../Models/UserSchema";
import { MongoError } from "mongodb";

import { authLoginController, authRegisterController } from "../Controllers/Auth";

const router = Router();

const generateToken = (user) => {
    return jwt.sign({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, discountCardStatus: user.discountCardStatus }, process.env.JWT_SECRET, {
        expiresIn: '1w', // Token expiration time
    });
};

router.post("/login", authLoginController);



router.post("/register", authRegisterController);

router.get("/verify", async (req, res) => {
    const BearerToken:string | undefined = req.headers.authorization;
    const token:string | undefined = BearerToken?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            console.log("User not found");
            return res.status(401).json({ error: "Access denied" });
        }
        const newToken = generateToken(user);
        res.status(200).json({ token: newToken });
        
    } catch (error) {

        if (error instanceof jwt.TokenExpiredError) {
            return res.json({ error: "Token Expired" });
        }
        res.status(400).json({ error: "Access denied" });
        console.log(error);
        
    }
});

export default router;