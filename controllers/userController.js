import jwt from "jsonwebtoken";
import User from "../models/User.js";


const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
        expiresIn: "1d"
    });
}

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExits = await User.findOne({email: email});
        if (userExits) {
            return res.status(400).json({message: `User already exists`});
        }
        const user = await User.create({name : name, email: email, password: password})
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } catch (error) {
        return res.status(400).json({messsage: `Error registering user: ${error}`});
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
            });
        } else {
            res.status(401).send("Invalid Credentials");
        }
    } catch (error) {
        return res.status(402).send(`Invalid Credentials: ${error.message}`);
    }
}