const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const User = require('../modals/User')
const Profile = require('../modals/Profile')
const { check, validationResult } = require('express-validator')
const config = require('config')
const GITHUB_CLIENT_ID = config.get('GITHUB_CLIENT_ID')
const GITHUB_CLIENT_SECRET = config.get('GITHUB_CLIENT_SECRET')
const request = require('request')
// const uploadImage = require('../config/imageUpload')

//get all user profiles
router.get('/profiles', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name'])
        res.json(profiles)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
})



//get logged in user's profile
router.get('/my', authMiddleware, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name'])

        if (!profile) {
            return res.status(400).json({ msg: "No profile found" })
        }
        return res.json(profile)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Internal Server error"
        })
    }
})



//get profile by user id
router.get('/:user_id', async (req, res) => {
    try {

        const user = await User.findOne({
            _id: req.params.user_id
        })

        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name'])

        if (!profile) {
            return res.status(400).json({ msg: "Profile not found" })
        }
        res.json(profile)
    } catch (error) {
        console.log(error)
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: "Profile not found" })
        }
        return res.status(500).json({ msg: "Server error" })
    }
})


//create and update a profile
router.post('/createUpdate', [authMiddleware, [
    check('gender', 'Gender is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        websiteURL,
        location,
        gender,
        status,
        description,
        skills,
        address,
        dob,
        githubUsername,
        linkedin,
        codechef,
        codeforces,
        leetcode,
        twitter,
        github

    } = req.body

    // const { image } = req?.file?.filename

    var profile = {}

    profile.user = req.user.id
    if (websiteURL) profile.websiteURL = websiteURL
    else {
        profile.websiteURL = ''
    }
    if (location) profile.location = location
    else {
        profile.location = ''
    }
    if (gender) profile.gender = gender
    else {
        profile.gender = ''
    }
    if (status) profile.status = status
    else {
        profile.status = ''
    }
    if (description) profile.description = description
    else {
        profile.description = ''
    }
    if (address) profile.address = address
    else {
        profile.address = ''
    }
    if (dob) profile.dob = dob
    else {
        profile.dob = ''
    }
    if (githubUsername) profile.githubUsername = githubUsername
    else {
        profile.githubUsername = ''
    }
    // if (req.file?.filename) profile.image = req.file?.filename
    // else {
    //     profile.image = ''
    // }


    if (skills) {
        profile.skills = skills.split(',').map(skill => skill.trim())
    }
    else {
        profile.skills = []
    }

    profile.urls = {}
    if (linkedin) profile.urls.linkedin = linkedin
    else {
        profile.urls.linkedin = ''
    }
    if (github) profile.urls.github = github
    else {
        profile.urls.github = ''
    }
    if (codechef) profile.urls.codechef = codechef
    else {
        profile.urls.codechef = ''
    }
    if (codeforces) profile.urls.codeforces = codeforces
    else {
        profile.urls.codeforces = ''
    }
    if (leetcode) profile.urls.leetcode = leetcode
    else {
        profile.urls.leetcode = ''
    }
    if (twitter) profile.urls.twitter = twitter
    else {
        profile.urls.twitter = ''
    }


    try {
        var userProfile = await Profile.findOne({
            user: req.user.id
        })
        if (userProfile) {
            userProfile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profile },
                { new: true }  //new option to true to return the document after update was applied.
            )
            return res.json(userProfile)
        }
        userProfile = new Profile(profile)
        await userProfile.save()
        return res.json(userProfile)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
})



//delete profile 
router.delete('/delete', authMiddleware, async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id })

        res.json({ msg: "Profile deleted" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server error" })
    }
})


//add experience
router.post('/experience', [authMiddleware, [
    check('title', "Title is required").not().isEmpty(),
    check('companyName', "Company Name is required").not().isEmpty(),
    check('location', "Location is required").not().isEmpty(),
    check('startDate', "Start date is required").not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        title,
        companyName,
        location,
        startDate,
        endDate,
        isGoingon,
        description
    } = req.body

    const experience = {
        title,
        companyName,
        location,
        startDate,
        endDate,
        isGoingon,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id })
        profile.experience.push(experience)
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.log(error)
        res.status(500).json({ "msg": "Server error" })
    }

})


//update experience
router.put('/experience/:exp_id', [authMiddleware, [
    check('title', "Title is required").not().isEmpty(),
    check('companyName', "Company Name is required").not().isEmpty(),
    check('location', "Location is required").not().isEmpty(),
    check('startDate', "Start date is required").not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        title,
        companyName,
        location,
        startDate,
        endDate,
        isGoingon,
        description
    } = req.body

    try {
        let experience = await Profile.findOne(
            { user: req.user.id, 'experience._id': req.params.exp_id }
        )

        if (!experience) {
            return res.status(400).json({ msg: "Experience not found" })
        }

        profile = await Profile.findOneAndUpdate({ user: req.user.id, 'experience._id': req.params.exp_id },
            {
                '$set': {
                    'experience.$.title': title,
                    'experience.$.companyName': companyName,
                    'experience.$.location': location,
                    'experience.$.startDate': startDate,
                    'experience.$.endDate': endDate,
                    'experience.$.isGoingon': isGoingon,
                    'experience.$.description': description
                }
            },
            { new: true }
        )
        res.json(profile)
    } catch (error) {
        console.log(error)
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: "Experience not found" })
        }
        res.status(500).json({ "msg": "Server error" })
    }
})


//delete experience
router.delete('/experience/:exp_id', [authMiddleware], async (req, res) => {

    try {
        let prof = await Profile.findOne(
            { user: req.user.id, 'experience._id': req.params.exp_id }
        )

        if (!prof) {
            return res.status(400).json({ msg: "Experience not found" })
        }

        prof = await Profile.findOneAndUpdate(
            { user: req.user.id },
            {
                $pull: {
                    "experience": {
                        "_id": req.params.exp_id
                    }
                }
            },
            {
                new: true
            }
        )
        res.json(prof)

    } catch (error) {
        console.log(error)
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: "Experience not found" })
        }
        res.status(500).json({ "msg": "Server error" })
    }
})


//add education
router.post('/education', [authMiddleware, [
    check('degree', "Degree is required").not().isEmpty(),
    check('institutionName', "Institution Name is required").not().isEmpty(),
    check('location', "Location is required").not().isEmpty(),
    check('fieldOfStudy', "Field of study is required").not().isEmpty(),
    check('startDate', "Start date is required").not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        degree,
        institutionName,
        location,
        fieldOfStudy,
        startDate,
        endDate,
        isGoingon
    } = req.body

    const education = {
        degree,
        institutionName,
        location,
        fieldOfStudy,
        startDate,
        endDate,
        isGoingon
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id })
        profile.education.push(education)
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.log(error)
        res.status(500).json({ "msg": "Server error" })
    }

})


//update education
router.put('/education/:edu_id', [authMiddleware, [
    check('degree', "Degree is required").not().isEmpty(),
    check('institutionName', "Institution Name is required").not().isEmpty(),
    check('location', "Location is required").not().isEmpty(),
    check('fieldOfStudy', "Field of study is required").not().isEmpty(),
    check('startDate', "Start date is required").not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        degree,
        institutionName,
        location,
        fieldOfStudy,
        startDate,
        endDate,
        isGoingon
    } = req.body

    try {
        let education = await Profile.findOne(
            { user: req.user.id, 'education._id': req.params.edu_id }
        )

        if (!education) {
            return res.status(400).json({ msg: "Education not found" })
        }

        profile = await Profile.findOneAndUpdate({ user: req.user.id, 'education._id': req.params.edu_id },
            {
                '$set': {
                    'education.$.degree': degree,
                    'education.$.institutionName': institutionName,
                    'education.$.location': location,
                    'education.$.fieldOfStudy': fieldOfStudy,
                    'education.$.startDate': startDate,
                    'education.$.endDate': endDate,
                    'education.$.isGoingon': isGoingon
                }
            },
            { new: true }
        )
        res.json(profile)
    } catch (error) {
        console.log(error)
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: "Education not found" })
        }
        res.status(500).json({ "msg": "Server error" })
    }
})


//delete education
router.delete('/education/:edu_id', [authMiddleware], async (req, res) => {

    try {
        let prof = await Profile.findOne(
            { user: req.user.id, 'education._id': req.params.edu_id }
        )

        if (!prof) {
            return res.status(400).json({ msg: "Education not found" })
        }

        prof = await Profile.findOneAndUpdate(
            { user: req.user.id },
            {
                $pull: {
                    "education": {
                        "_id": req.params.edu_id
                    }
                }
            }, {
            new: true
        }
        )
        res.json(prof)

    } catch (error) {
        console.log(error)
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: "Education not found" })
        }
        res.status(500).json({ "msg": "Server error" })
    }
})


//get github repos
router.get('/github/:username', async (req, res) => {
    try {
        const options = {
            uri: `http://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}`,
            method: 'GET',
            headers: {
                'user-agent': 'node.js'
            }
        }

        request(options, (err, response, body) => {
            if (err) {
                console.log(err)
            }
            if (response.statusCode !== 200) {
                return res.status(400).json({ msg: "Github Profile not found" })
            }
            return res.json(JSON.parse(body))
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Server error" })
    }
})


module.exports = router