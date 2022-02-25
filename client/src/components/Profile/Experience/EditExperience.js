import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { connect } from 'react-redux'
import Checkbox from '@mui/material/Checkbox';
import { setAlert } from '../../../redux/actions/alert'
import { getLoggedinUserProfile } from '../../../redux/actions/profile'
import { useParams } from 'react-router-dom'
import { editExperience } from '../../../redux/actions/profile'

const EditExperience = ({ getLoggedinUserProfile, profile, editExperience, setAlert }) => {

    let navigate = useNavigate()
    const { exp_id } = useParams()

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

    useEffect(() => {
        getLoggedinUserProfile()
        if (!profile.loading) {
            var experience_data = profile.profile.experience.filter(exp => exp._id == exp_id)[0]
            setFormData({
                title: !experience_data.title ? '' : experience_data.title,
                companyName: !experience_data.companyName ? '' : experience_data.companyName,

                location: !experience_data.location ? '' : experience_data.location,

                description: !experience_data.description ? '' : experience_data.description,

            })
            setstartDate(!experience_data.startDate ? '' : experience_data.startDate)
            setendDate(!experience_data.endDate ? '' : experience_data.endDate)
            setisGoingon(!experience_data.isGoingon ? false : experience_data.isGoingon)
        }
    }, [profile.loading])

    const onsubmit = async e => {
        e.preventDefault()
        if (endDate === null && isGoingon === false) {
            setAlert("Both end date and currently going on can't be null.Fill one out of them", 'error')
            return;
        }
        if (endDate != null && (Date.parse(startDate) > Date.parse(endDate))) {
            setAlert("Start Date should be less than End date", 'error')
            return;
        }
        const data = { ...formData, startDate, endDate, isGoingon }
        if (data.endDate == null) {
            data.endDate = ''
        }
        const response = await editExperience(data, exp_id)
        if (response === "Success") {
            navigate("/dashboard")
        }
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm" className="form-container"  >
                <Typography variant="h3" >
                    Edit Experience
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
                            endDate !== null && endDate !== '' ? true : false
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
                        <Button type="submit" >Update</Button>
                        <Button onClick={e => {
                            navigate(-1)
                        }} >Back</Button>
                    </div>
                </form>
            </Container>
        </>
    )
};

const mapStateToProps = state => {
    const profile = state.profile
    return { profile }
}

export default connect(mapStateToProps, { getLoggedinUserProfile, editExperience, setAlert })(EditExperience);
