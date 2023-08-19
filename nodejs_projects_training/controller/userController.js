const expressAsyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc api REGISTER new user
//@router api POST /api/users/register
//@access public
const registerUser = expressAsyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All field are mandatory");
    }
    const userAvailable = await User.findOne({ email });

    if (!userAvailable) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        console.log(`user create succesfully ${user.username}`);
        if (user) {
            res.status(201).json({ _id: user.id, email: user.email });
        } else {
            res.status(400);
            throw new Error(`user data is not valid`);
        }
    }
    res.status(400).json({ message: "Email has adready taken" });
});

//@desc api REGISTER new user
//@router api POST /api/users/register
//@access public
const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });
    if (user || (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "1m"}
        );
        res.status(200).json({ accessToken });
    }else{
        res.status(400);
        throw new Error("Email or Password is not valid");
    }
});

//@desc api REGISTER new user
//@router api POST /api/users/register
//@access public
const currentUser = expressAsyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };