const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    websiteURL: {
        type: String
    },
    location: {
        type: String
    },
    gender: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    skills: {
        type: [String]
    },
    address: {
        type: String
    },
    dob: {
        type: Date,
        required: true
    },
    githubUsername: {
        type: String
    },
    image: {
        type: String
    },
    education: [
        {
            institutionName: {
                type: String,
                required: true
            },
            location: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldOfStudy: {
                type: String,
                required: true
            },
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date
            },
            isGoingon: {
                type: Boolean,
                default: false
            }
        }
    ],
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            companyName: {
                type: String,
                required: true
            },
            location: {
                type: String,
                required: true
            },
            startDate: {
                type: Date,
                required: true
            },
            endDate: {
                type: Date
            },
            isGoingon: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    urls: {
        linkedin: {
            type: String
        },
        github: {
            type: String
        },
        codechef: {
            type: String
        },
        codeforces: {
            type: String
        },
        leetcode: {
            type: String
        },
        twitter: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const ProfileModel = mongoose.model('profile', ProfileSchema)

module.exports = ProfileModel   