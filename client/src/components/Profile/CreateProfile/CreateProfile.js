import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Container, TextField, Typography, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './CreateProfile.css'
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import codechefimg from '../../../assets/codechef.png'
import linkedinimg from '../../../assets/linkedin.jpg'
import codeforcesimg from '../../../assets/codeforces.png'
import githubimg from '../../../assets/github.png'
import leetcodeimg from '../../../assets/leetcode.png'
import { createUpdateProfile } from '../../../redux/actions/profile'
import { connect } from 'react-redux'


const CreateProfile = ({ createUpdateProfile }) => {

    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        websiteURL: '',
        gender: '',
        status: '',
        description: '',
        skills: '',
        address: '',
        githubUsername: '',
        linkedin: '',
        github: '',
        codechef: '',
        codeforces: '',
        leetcode: '',
        twitter: ''
    })

    const [dob, setDOB] = useState(null)

    const [flag, setFlag] = useState(false)

    const {
        websiteURL,
        gender,
        status,
        description,
        skills,
        address,
        githubUsername,
        linkedin,
        github,
        codechef,
        codeforces,
        leetcode,
        twitter
    } = formData

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onsubmit = async e => {
        e.preventDefault()
        const data = { ...formData, dob }
        console.log(data)
        const response = await createUpdateProfile(data, false)
        console.log(response)
        if (response === "Success") {
            navigate('/dashboard')
        }
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm" className="form-container"  >
                <Typography variant="h3" >
                    Create Profile
                </Typography>
                <form onSubmit={e => onsubmit(e)} style={{ display: "flex", flexDirection: "column", gap: "30px", alignItems: "center", paddingBottom: "40px" }} >
                    <TextField
                        type="url"
                        autoComplete="off"
                        label="Website URL"
                        name="websiteURL"
                        value={websiteURL}
                        onChange={e => handleChange(e)}
                    />
                    <FormControl style={{ width: "75%" }} >
                        <InputLabel id="demo-simple-select-label">Gender *</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Gender"
                            name="gender"
                            value={gender}
                            onChange={e => handleChange(e)}
                        >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: "75%" }} >
                        <InputLabel id="demo-simple-select-label">Status *</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Status"
                            name="status"
                            value={status}
                            onChange={e => handleChange(e)}
                        >
                            <MenuItem value={"Senior Developer"}>Senior Developer</MenuItem>
                            <MenuItem value={"Junior Developer"}>Junior Developer</MenuItem>
                            <MenuItem value={"CEO"}>CEO</MenuItem>
                            <MenuItem value={"Manager"}>Manager</MenuItem>
                            <MenuItem value={"HR"}>HR</MenuItem>
                            <MenuItem value={"Teacher"}>Teacher</MenuItem>
                            <MenuItem value={"Student"}>Student</MenuItem>
                            <MenuItem value={"Professor"}>Professor</MenuItem>
                            <MenuItem value={"Business Analyst"}>Business Analyst</MenuItem>
                            <MenuItem value={"Data Scientist"}>Data Scientist</MenuItem>
                            <MenuItem value={"Intern"}>Intern</MenuItem>
                            <MenuItem value={"Software Engineer"}>Software Engineer</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={DateAdapter} >
                        <DatePicker
                            required
                            label="DOB *"
                            value={dob}
                            onChange={value => setDOB(value)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        placeholder="Description"
                        multiline
                        rows={5}
                        name="description"
                        value={description}
                        onChange={e => handleChange(e)}
                    />
                    <TextField
                        placeholder="Skills (Comma separated)"
                        multiline
                        rows={3}
                        value={skills}
                        onChange={e => handleChange(e)}
                        name="skills"
                    />
                    <TextField
                        multiline
                        rows={3}
                        label="Address"
                        value={address}
                        onChange={e => handleChange(e)}
                        name="address"
                    />
                    <TextField
                        type="text"
                        autoComplete="off"
                        label="Github Username"
                        name="githubUsername"
                        value={githubUsername}
                        onChange={e => handleChange(e)}
                    />

                    <div style={{ width: "70%", marginLeft: "-29px", display: "flex", flexDirection: "column", gap: "20px", justifyContent: "center" }} >
                        <Button onClick={() => { setFlag(!flag) }} style={{ width: "30%" }} >Add URLs</Button>
                        {
                            flag ? (<>
                                <div style={{ display: "flex", alignItems: "center" }} >
                                    <img src={linkedinimg} alt="" style={{ height: 30, width: 30, borderRadius: "5px" }} />
                                    <TextField
                                        type="url"
                                        autoComplete="off"
                                        label="Linkedin"
                                        name="linkedin"
                                        value={linkedin}
                                        onChange={e => handleChange(e)}
                                    />
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }} >
                                    <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png" alt="" style={{ height: 30, width: 30, borderRadius: "5px" }} />

                                    <TextField
                                        type="url"
                                        autoComplete="off"
                                        label="Twitter"
                                        name="twitter"
                                        value={twitter}
                                        onChange={e => handleChange(e)}
                                    />
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }} >
                                    <img src={leetcodeimg} alt="" style={{ height: 30, width: 30, borderRadius: "5px" }} />
                                    <TextField
                                        type="url"
                                        autoComplete="off"
                                        label="Leetcode"
                                        name="leetcode"
                                        value={leetcode}
                                        onChange={e => handleChange(e)}
                                    />
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }} >
                                    <img src={codechefimg} alt="" style={{ height: 30, width: 30, borderRadius: "5px" }} />
                                    <TextField
                                        type="url"
                                        autoComplete="off"
                                        label="Codechef"
                                        name="codechef"
                                        value={codechef}
                                        onChange={e => handleChange(e)}
                                    />
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }} >
                                    <img src={codeforcesimg} alt="" style={{ height: 30, width: 30, borderRadius: "5px" }} />
                                    <TextField
                                        type="url"
                                        autoComplete="off"
                                        label="Codeforces"
                                        name="codeforces"
                                        value={codeforces}
                                        onChange={e => handleChange(e)}
                                    />
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }} >

                                    <img src={githubimg} alt="" style={{ height: 30, width: 30, borderRadius: "5px" }} />

                                    <TextField
                                        type="url"
                                        autoComplete="off"
                                        label="Github"
                                        name="github"
                                        value={github}
                                        onChange={e => handleChange(e)}
                                    />
                                </div>
                            </>) : (null)
                        }

                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", gap: "10px" }} >
                        <Button type="submit" >Create</Button>
                        <Button onClick={e => {
                            navigate(-1)
                        }} >Back</Button>
                    </div>
                </form>
            </Container>
        </>
    )
};

export default connect(null, { createUpdateProfile })(CreateProfile);
