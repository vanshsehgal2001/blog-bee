const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const User = require('../modals/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//get the logged in user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
})


//login the user
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
], async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { email, password } = req.body

        var user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'User does not exist' }] })
        }

        const doMatch = await bcrypt.compare(password, user.password)

        if (!doMatch) {
            return res.status(400).json({ msg: "Incorrect Password" })
        }

        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(
            payload,
            "secret",
            {
                expiresIn: 9239920
            },
            (error, token) => {
                if (error) {
                    throw error
                }
                res.json({ token })
            }
        )
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Server error" })
    }
})

module.exports = router