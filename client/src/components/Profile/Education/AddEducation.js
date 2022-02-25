import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Container, TextField, Typography, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import './CreateProfile.css'
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { connect } from 'react-redux'
import Checkbox from '@mui/material/Checkbox';
import { addEducation } from '../../../redux/actions/profile'
import { setAlert } from '../../../redux/actions/alert'


const AddEducation = ({ addEducation, setAlert }) => {

    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        institutionName: '',
        location: '',
        degree: '',
        fieldOfStudy: ''
    })

    const [startDate, setstartDate] = useState(null)
    const [endDate, setendDate] = useState(null)

    const [isGoingon, setisGoingon] = useState(false)

    const {
        institutionName,
        location,
        degree,
        fieldOfStudy
    } = formData

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onsubmit = async e => {
        e.preventDefault()
        if (endDate === null && isGoingon === false) {
            // console.log("Both end date and currently going on can't be null.Fill one out of them")
            setAlert("Both end date and currently going on can't be null.Fill one out of them", 'error')
            return;
        }
        if (endDate != null && (Date.parse(startDate) > Date.parse(endDate))) {
            // console.log(Date.parse(startDate), Date.parse(endDate))
            // console.log("Start Date should be less than End date")
            setAlert("Start Date should be less than End date", 'error')
            return;
        }
        const data = { ...formData, startDate, endDate, isGoingon }
        if (data.endDate == null) {
            data.endDate = ''
        }
        console.log(data)
        const response = await addEducation(data)
        if (response === "Success") {
            navigate("/dashboard")
        }
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm" className="form-container"  >
                <Typography variant="h3" >
                    Add Education
                </Typography>
                <form onSubmit={e => onsubmit(e)} style={{ display: "flex", flexDirection: "column", gap: "30px", alignItems: "center", paddingBottom: "40px" }} >
                    <TextField
                        type="text"
                        // required
                        autoComplete="off"
                        label="Institution Name*"
                        name="institutionName"
                        value={institutionName}
                        onChange={e => handleChange(e)}
                    />
                    <TextField
                        type="text"
                        // required
                        autoComplete="off"
                        label="Location*"
                        name="location"
                        value={location}
                        onChange={e => handleChange(e)}
                    />
                    <FormControl style={{ width: "75%" }} >
                        <InputLabel id="demo-simple-select-label">Degree *</InputLabel>
                        <Select
                            // required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Degree*"
                            name="degree"
                            value={degree}
                            onChange={e => handleChange(e)}
                        >
                            <MenuItem value={"Associate of Applied Science (AAS)"}>Associate of Applied Science (AAS)</MenuItem>
                            <MenuItem value={"Associate of Arts (AA)"}>Associate of Arts (AA)</MenuItem>
                            <MenuItem value={"Associate of Science (AS)"}>Associate of Science (AS)</MenuItem>
                            <MenuItem value={"Bachelor of Applied Science (BAS)"}>Bachelor of Applied Science (BAS)</MenuItem>
                            <MenuItem value={"Bachelor of Architecture (B.Arch.)"}>Bachelor of Architecture (B.Arch.)</MenuItem>
                            <MenuItem value={"Bachelor of Arts (BA)"}>Bachelor of Arts (BA)</MenuItem>
                            <MenuItem value={"Bachelor of Business Administration (BBA)"}>Bachelor of Business Administration (BBA)</MenuItem>
                            <MenuItem value={"Bachelor of Fine Arts (BFA)"}>Bachelor of Fine Arts (BFA)</MenuItem>
                            <MenuItem value={"Bachelor of Science (BS)"}>Bachelor of Science (BS)</MenuItem>
                            <MenuItem value={"Bachelor of Technology (BTECH)"}>Bachelor of Technology (BTECH)</MenuItem>
                            <MenuItem value={"Master of Business Administration (MBA)"}>Master of Business Administration (MBA)</MenuItem>
                            <MenuItem value={"Master of Education (M.Ed.)"}>Master of Education (M.Ed.)</MenuItem>
                            <MenuItem value={"Master of Fine Arts (MFA)"}>Master of Fine Arts (MFA)</MenuItem>
                            <MenuItem value={"Master of Laws (LL.M.)"}>Master of Laws (LL.M.)</MenuItem>
                            <MenuItem value={"Master of Public Administration (MPA)"}>Master of Public Administration (MPA)</MenuItem>
                            <MenuItem value={"Master of Public Health (MPH)"}>Master of Public Health (MPH)</MenuItem>
                            <MenuItem value={"Master of Publishing (M.Pub.)"}>Master of Publishing (M.Pub.)</MenuItem>
                            <MenuItem value={"Master of Science (MS)"}>Master of Science (MS)</MenuItem>
                            <MenuItem value={"Master of Social Work (MSW)"}>Master of Social Work (MSW)</MenuItem>
                            <MenuItem value={"Doctor of Medicine (MD)"}>Doctor of Medicine (MD)</MenuItem>
                            <MenuItem value={"Doctor of Pharmacy (Pharm.D.)"}>Doctor of Pharmacy (Pharm.D.)</MenuItem>
                            <MenuItem value={"Doctor of Education (Ed.D.)"}>Doctor of Education (Ed.D.)</MenuItem>
                            <MenuItem value={"Doctor of Philosophy (Ph.D.)"}>Doctor of Philosophy (Ph.D.)</MenuItem>

                        </Select>
                    </FormControl>
                    <FormControl style={{ width: "75%" }} >
                        <InputLabel id="demo-simple-select-label">Field Of Study *</InputLabel>
                        <Select
                            // required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Field Of Study*"
                            name="fieldOfStudy"
                            value={fieldOfStudy}
                            onChange={e => handleChange(e)}
                        >
                            <MenuItem value={"Computer Science and Engineering"}>Computer Science and Engineering</MenuItem>
                            <MenuItem value={"Electronics"}>Electronics</MenuItem>
                            <MenuItem value={"Electrical Engineering"}>Electrical Engineering</MenuItem>
                            <MenuItem value={"Biotechnology Engineering"}>Biotechnology Engineering</MenuItem>
                            <MenuItem value={"Civil Engineering"}>Civil Engineering</MenuItem>
                            <MenuItem value={"Software Engineering"}>Software Engineering</MenuItem>
                            <MenuItem value={"IT"}>IT</MenuItem>
                            <MenuItem value={"Mechanical Engineering"}>Mechanical Engineering</MenuItem>
                            <MenuItem value={"Mechatronics"}>Mechatronics</MenuItem>
                            <MenuItem value={"Chemical Engineering"}>Chemical Engineering</MenuItem>
                            <MenuItem value={"Robotics Engineering"}>Robotics Engineering</MenuItem>
                            <MenuItem value={"Electronics and Instrumentation Engineering"}>Electronics and Instrumentation Engineering</MenuItem>
                            <MenuItem value={"Electrical and Electronics Engineering"}>Electrical and Electronics Engineering</MenuItem>
                            <MenuItem value={"Electronics and Computer Engineering"}>Electronics and Computer Engineering</MenuItem>
                            <MenuItem value={"Artificial intelligence"}>Artificial intelligence</MenuItem>
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={DateAdapter} >
                        <DatePicker
                            // required
                            label="Start Date *"
                            value={startDate}
                            onChange={value => setstartDate(value)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={DateAdapter} >
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={value => setendDate(value)}
                            disabled={
                                isGoingon ? true : false
                            }
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <div style={{ display: "flex", width: "100%", marginLeft: "125px", marginTop: "-25px", alignItems: "center" }} >

                        <Checkbox checked={isGoingon} onChange={() => {
                            setisGoingon(!isGoingon)
                        }} inputProps={{ 'aria-label': 'controlled' }} disabled={
                            endDate !== null ? true : false
                        } />
                        <Typography variant="p" style={{ color: "white" }} >
                            currently going on
                        </Typography>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", gap: "10px" }} >
                        <Button type="submit" >Add</Button>
                        <Button onClick={e => {
                            navigate(-1)
                        }} >Back</Button>
                    </div>
                </form>
            </Container>
        </>
    )
};

export default connect(null, { addEducation, setAlert })(AddEducation);
