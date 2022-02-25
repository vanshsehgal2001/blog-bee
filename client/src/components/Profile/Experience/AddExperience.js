import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import './CreateProfile.css'
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { connect } from 'react-redux'
import Checkbox from '@mui/material/Checkbox';
import { addExperience } from '../../../redux/actions/profile'
import { setAlert } from '../../../redux/actions/alert'

const AddExperience = ({ addExperience, setAlert }) => {

    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        companyName: '',
        location: '',
        description: ''
    })

    const [startDate, setstartDate] = useState(null)
    const [endDate, setendDate] = useState(null)

    const [isGoingon, setisGoingon] = useState(false)

    const {
        title,
        companyName,
        location,
        description
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
        const response = await addExperience(data)
        if (response === "Success") {
            navigate("/dashboard")
        }
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm" className="form-container"  >
                <Typography variant="h3" >
                    Add Experience
                </Typography>
                <form onSubmit={e => onsubmit(e)} style={{ display: "flex", flexDirection: "column", gap: "30px", alignItems: "center", paddingBottom: "40px" }} >
                    <TextField
                        type="text"
                        // required
                        autoComplete="off"
                        label="Position*"
                        name="title"
                        value={title}
                        onChange={e => handleChange(e)}
                    />
                    <TextField
                        type="text"
                        // required
                        autoComplete="off"
                        label="Company*"
                        name="companyName"
                        value={companyName}
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
                    <TextField
                        multiline
                        rows={4}
                        label="Job Description"
                        name="description"
                        value={description}
                        onChange={e => handleChange(e)}
                    />
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

export default connect(null, { addExperience, setAlert })(AddExperience);
