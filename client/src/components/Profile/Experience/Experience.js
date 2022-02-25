import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, TableContainer, Table, TableCell, TableBody, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { connect } from 'react-redux';
import moment from 'moment'
import './Experience.css'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import clipContent from '../../utils/ClipContent'
import Modal from '@mui/material/Modal';
import { deleteExperience } from '../../../redux/actions/profile'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'whitesmoke',
    // border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    textAlign: "center",
};

const Experience = ({ profile: { profile }, deleteExperience }) => {

    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('')

    return (
        <>
            <CssBaseline />
            <div style={{ width: "100%" }} >
                <Typography variant="h4" style={{ marginBottom: "20px" }} >
                    Experience Details
                </Typography>
                {
                    profile.experience.length > 0 ? (
                        <>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead  >
                                        <TableRow className="head-table" style={{ background: "rgb(169,169,169)", color: "white" }} >
                                            <TableCell  >Role</TableCell>
                                            <TableCell align="right">Company</TableCell>
                                            <TableCell align="right">Location</TableCell>
                                            <TableCell align="right">Description</TableCell>
                                            <TableCell align="right">Start Date</TableCell>
                                            <TableCell align="right">End Date</TableCell>
                                            <TableCell align="right">Currently going on</TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody  >
                                        {
                                            profile.experience.length > 0 && profile.experience.map(exp => {
                                                return (

                                                    <TableRow key={exp._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                                        <TableCell component="th" scope="row" > {exp.title}
                                                        </TableCell>
                                                        <TableCell align="right" > {exp.companyName} </TableCell>
                                                        <TableCell align="right" > {exp.location} </TableCell>
                                                        <TableCell align="right" >
                                                            <div style={{ display: 'flex', flexDirection: "column" }} >
                                                                {exp.description && clipContent(exp.description)}
                                                                {exp.description && <Button style={{ fontSize: "10px", color: "blue" }} onClick={() => {
                                                                    setOpen(true)
                                                                    setContent(exp.description)
                                                                }} >Read Full</Button>}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align="right" > {moment(exp.startDate).format('DD-MM-YYYY')} </TableCell>
                                                        <TableCell align="right" > {exp.endDate ? moment(exp.endDate).format('DD-MM-YYYY') : '---'} </TableCell>
                                                        <TableCell align="right" > {exp.isGoingon ? 'Yes' : 'No'} </TableCell>
                                                        <TableCell align="right" >
                                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                                                                <Link style={{ textDecoration: "none" }} to={`/edit-experience/${exp._id}`} >
                                                                    <Button><EditIcon /></Button>
                                                                </Link>
                                                                <Button onClick={() => {
                                                                    deleteExperience(exp._id)
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
                            <Modal
                                open={open}
                                onClose={() => {
                                    setOpen(false)
                                    setContent('')
                                }}
                            >
                                <Box sx={style}>
                                    <Typography style={{ fontWeight: "bold" }} id="modal-modal-title" variant="h6" component="h2">
                                        DESCRIPTION
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: "bold" }}>
                                        {content}
                                    </Typography>
                                </Box>

                            </Modal>
                        </>
                    ) : (
                        <div style={{ width: "100%", textAlign: "center", marginTop: "50px" }} >
                            <Typography variant="h5" >
                                No experience details
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

export default connect(mapStateToProps, { deleteExperience })(Experience);
