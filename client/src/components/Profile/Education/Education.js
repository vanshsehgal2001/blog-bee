import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { TableContainer, Table, TableCell, TableBody, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { connect } from 'react-redux';
import moment from 'moment'
import './Education.css'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteEducation } from '../../../redux/actions/profile'



const Education = ({ profile: { profile }, deleteEducation }) => {
    return (
        <>
            <CssBaseline />
            <div style={{ width: "100%" }} >
                <Typography variant="h4" style={{ marginBottom: "20px" }} >
                    Education Details
                </Typography>
                {
                    profile.education.length > 0 ? (
                        <>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead  >
                                        <TableRow className="head-table" style={{ background: "rgb(169,169,169)", color: "white" }} >
                                            <TableCell  >Institution Name</TableCell>
                                            <TableCell align="right">Degree</TableCell>
                                            <TableCell align="right">Field Of Study</TableCell>
                                            <TableCell align="right">Location</TableCell>
                                            <TableCell align="right">Start Date</TableCell>
                                            <TableCell align="right">End Date</TableCell>
                                            <TableCell align="right">Currently going on</TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody  >
                                        {
                                            profile.education.length > 0 && profile.education.map(ed => {
                                                return (

                                                    <TableRow key={ed._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                                        <TableCell component="th" scope="row" > {ed.institutionName} </TableCell>
                                                        <TableCell align="right" > {ed.degree} </TableCell>
                                                        <TableCell align="right" > {ed.fieldOfStudy} </TableCell>
                                                        <TableCell align="right" > {ed.location} </TableCell>
                                                        <TableCell align="right" > {moment(ed.startDate).format('DD-MM-YYYY')} </TableCell>
                                                        <TableCell align="right" > {ed.endDate ? moment(ed.endDate).format('DD-MM-YYYY') : '---'} </TableCell>
                                                        <TableCell align="right" > {ed.isGoingon ? 'Yes' : 'No'} </TableCell>
                                                        <TableCell align="right" >
                                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                                                                <Link style={{ textDecoration: "none" }} to={`/edit-education/${ed._id}`} >
                                                                    <Button><EditIcon /></Button>
                                                                </Link>
                                                                <Button onClick={() => {
                                                                    deleteEducation(ed._id)
                                                                }} ><DeleteIcon /></Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>

                                                )
                                            })
                                        }

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    ) : (
                        <div style={{ width: "100%", textAlign: "center", marginTop: "50px" }} >
                            <Typography variant="h5" >
                                No education details
                            </Typography>

                        </div>
                    )
                }


            </div>
        </>
    )
};

const mapStateToProps = (state) => {
    const profile = state.profile
    return { profile }
}

export default connect(mapStateToProps, { deleteEducation })(Education);
