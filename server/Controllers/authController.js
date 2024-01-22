const authModel = require('../Models/authModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "hello123EmitrrProject";

const loginUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await authModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

const createUser = async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let existingUser = await authModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "Sorry, a user with the same email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new authModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        const data = {
            user: {
                id: savedUser.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

const logedInUserDetail=async(req, res)=>{
    try {
        const user = await authModel.findById(req.user.id).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    loginUser,
    createUser,
    logedInUserDetail
};
