const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const generateAuthToken = require("../utils/generateAuthToken");
const router = express.Router();

router.post("/", async (req, res) => {
    const schema = Joi.object({
        name:
            Joi.string().min(3).max(30).required(),
        email:
            Joi.string().min(3).max(200).required().email({
                minDomainSegments: 2,
                tlds: {
                    allow: ['com', 'net']
                }
            }),
        password:
            Joi.string().min(6).max(200).required(),
        phone: Joi.string().min(10).max(15).allow(""),
        address: Joi.string().min(5).max(200).allow(""),
        city: Joi.string().min(5).max(50).allow(""),
        district: Joi.string().min(5).max(50).allow(""),
        country: Joi.string().min(5).max(50).allow(""),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);

    }
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Tài khoản người dùng đã tồn tại!");

    const { name, email, password, phone, address, city, district, country } = req.body;
    user = new User({ name, email, password, phone, address, city, district, country });
  
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = generateAuthToken(user);

    res.send(token);
});

module.exports = router;
