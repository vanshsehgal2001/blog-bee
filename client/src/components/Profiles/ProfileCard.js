import { CssBaseline, Typography } from '@mui/material'
import user from '../../assets/user1.jpg'
import codechefimg from '../../assets/codechef.png'
import linkedinimg from '../../assets/linkedin.jpg'
import codeforcesimg from '../../assets/codeforces.png'
import githubimg from '../../assets/github.png'
import leetcodeimg from '../../assets/leetcode.png'
import moment from 'moment'
import Modal from '@mui/material/Modal';
import { useState } from 'react'
import { Box, Button } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FFF8DC',
    // border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    textAlign: "center",
};

const ProfileCard = ({ profile }) => {

    const [open, setOpen] = useState(false)
    const [content, setContent] = useState('')

    // console.log(profile)

    return (
        <>
            <CssBaseline />
            <div style={{ minHeight: "300px", width: "85%", margin: "150px auto", backgroundColor: "rgba(255,255,255,0.8)", marginBottom: "50px" }} >

                <div style={{ position: "absolute", top: "0%", left: "50%", transform: "translate(-50%,80%)" }} >
                    <img style={{ borderRadius: "100%", height: "200px", width: "250px", marginTop: "20px" }} alt="" src={(profile?.profile?.image === '' || profile?.profile?.image == null) ? user : profile.profile.image} />
                </div>
                <div style={{ paddingTop: "150px" }} >
                    <Typography variant="h3" style={{ textAlign: "center", fontWeight: "bold" }} >
                        {profile?.profile?.user?.name}
                    </Typography>
                    <Typography variant="h6" style={{ textAlign: "center" }} >
                        {profile?.profile?.gender}
                    </Typography>
                    <Typography variant="h6" style={{ textAlign: "center" }} >
                        {profile?.profile?.status}
                    </Typography>

                    <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", gap: "30px", marginTop: "30px", paddingBottom: "10px" }} >
                        {
                            profile?.profile.websiteURL != '' && (
                                <>
                                    <a href={profile.profile.websiteURL} target="_blank" rel="noopener noreferrer">
                                        <LanguageIcon style={{ height: "40px", width: "40px", color: "black" }} />
                                    </a>
                                </>
                            )
                        }
                        {
                            profile?.profile.urls != null && (
                                <>
                                    {
                                        profile?.profile?.urls?.leetcode &&
                                        (
                                            <a href={profile.profile.urls.leetcode} target="_blank" rel="noopener noreferrer">
                                                <img style={{ borderRadius: "10px", height: "40px", width: "40px" }} alt="leetcode" src={leetcodeimg} />
                                            </a>
                                        )
                                    }
                                    {
                                        profile?.profile?.urls?.codechef &&
                                        (
                                            <>
                                                <a href={profile.profile.urls.codechef} target="_blank" rel="noopener noreferrer">
                                                    <img style={{ borderRadius: "10px", height: "40px", width: "40px" }} alt="codechef" src={codechefimg} />
                                                </a>
                                            </>
                                        )
                                    }
                                    {
                                        profile?.profile?.urls?.codeforces &&
                                        (
                                            <>
                                                <a href={profile.profile.urls.codeforces} target="_blank" rel="noopener noreferrer">
                                                    <img style={{ borderRadius: "10px", height: "40px", width: "40px" }} alt="codeforces" src={codeforcesimg} />
                                                </a>
                                            </>
                                        )
                                    }
                                    {
                                        profile?.profile?.urls?.github &&
                                        (
                                            <>
                                                <a href={profile.profile.urls.github} target="_blank" rel="noopener noreferrer">
                                                    <img style={{ borderRadius: "10px", height: "40px", width: "40px" }} alt="github" src={githubimg} />
                                                </a>
                                            </>
                                        )
                                    }
                                    {
                                        profile?.profile?.urls?.linkedin &&
                                        (
                                            <>
                                                <a href={profile.profile.urls.linkedin} target="_blank" rel="noopener noreferrer">
                                                    <img style={{ borderRadius: "10px", height: "40px", width: "40px" }} alt="linkedin" src={linkedinimg} />
                                                </a>
                                            </>
                                        )
                                    }
                                    {
                                        profile?.profile?.urls?.twitter &&
                                        (
                                            <>
                                                <a href={profile.profile.urls.twitter} target="_blank" rel="noopener noreferrer">
                                                    <img style={{ borderRadius: "10px", height: "40px", width: "40px" }} alt="twitter" src={"http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png"} />
                                                </a>
                                            </>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>


                </div>
            </div>
            {
                profile?.profile?.skills.length > 0 && (
                    <>
                        <div style={{ minHeight: "100px", width: "80%", margin: "auto", textAlign: "center", backgroundColor: "#6A5ACD", color: "#F0F8FF" }} >

                            <div style={{ textAlign: "center", marginTop: "30px", width: "100%", padding: "20px 0px", backgroundColor: "#6A5ACD" }} >
                                {
                                    profile?.profile?.skills.length > 0 && (
                                        <>
                                            <Typography variant="h4" style={{ fontWeight: "bold" }} >
                                                Skills
                                            </Typography>
                                            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", gap: "10px", color: "black", marginTop: "10px" }} >
                                                {
                                                    profile?.profile?.skills.map(skill => {
                                                        return (
                                                            <div key={skill} style={{ color: "white", fontSize: "15px", backgroundColor: "black", padding: "10px", borderRadius: "10px" }} >
                                                                {skill}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </>
                                    )
                                }

                            </div>
                        </div>

                    </>
                )
            }

            {
                profile?.profile.description != null && (
                    <>
                        <div style={{ minHeight: "100px", width: "80%", margin: "auto", marginTop: "30px", textAlign: "center", backgroundColor: "#6A5ACD", marginBottom: "20px" }} >
                            <Typography variant="h4" style={{ fontWeight: "bold", paddingTop: "20px", color: "#F0F8FF" }} >
                                {profile?.profile?.user?.name.split(' ')[0]}'s Bio
                            </Typography>
                            <Typography variant="h6" style={{ paddingTop: "5px", fontWeight: "bold" }} >
                                {profile?.profile?.description}
                            </Typography>
                        </div>
                    </>
                )
            }
            <div style={{ display: "grid", width: "70%", margin: "auto", gridTemplateColumns: "repeat(2,1fr)", marginTop: "50px", marginBottom: "40px", columnGap: "20px", alignItems: "start" }} >
                <div style={{ justifySelf: "start", padding: "20px", backgroundColor: "#FCF55F" }} >
                    <Typography variant="h4" style={{ marginBottom: "30px", fontWeight: "bold" }} >
                        Education Details
                    </Typography>
                    {
                        profile?.profile?.education.length > 0 ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }} >
                                {
                                    profile?.profile?.education.map(edu => {
                                        return (
                                            <div key={edu._id} >
                                                <Typography variant="h6" style={{ fontWeight: "bold" }} >
                                                    {edu.institutionName}
                                                </Typography>
                                                <Typography variant="h6" style={{ fontWeight: "bold" }} >
                                                    {edu.degree} in {edu.fieldOfStudy}
                                                </Typography>
                                                <Typography variant="h6" style={{ fontWeight: "bold" }} >
                                                    {edu.location}
                                                </Typography>
                                                <Typography variant="h6" style={{ fontWeight: "bold" }} >
                                                    {moment(edu.startDate).format('DD-MM-YYYY')} - {edu.isGoingon ? "current" : moment(edu.startDate).format('DD-MM-YYYY')}
                                                </Typography>
                                                {/* <div style={{ height: "1px", width: "50%", margin: "auto", background: "black", marginTop: "40px" }} ></div> */}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : (<Typography variant="h6" style={{ textAlign: "center" }} >
                            No education details
                        </Typography>)
                    }
                </div>
                <div style={{ justifySelf: "center", padding: "20px", backgroundColor: "#FCF55F" }} >
                    <Typography variant="h4" style={{ marginBottom: "30px", fontWeight: "bold" }} >
                        Experience Details
                    </Typography>
                    {
                        profile?.profile?.experience.length > 0 ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }} >
                                {
                                    profile?.profile?.experience.map(exp => {
                                        return (
                                            <div key={exp._id} >
                                                <Typography variant="h6" style={{ fontWeight: "bold" }} >
                                                    {exp.title} at {exp.companyName}
                                                </Typography>
                                                <Typography variant="h6" style={{ fontWeight: "bold" }} >
                                                    {exp.location}
                                                </Typography>
                                                <Typography variant="h6" style={{ fontWeight: "bold" }} >
                                                    {moment(exp.startDate).format('DD-MM-YYYY')} - {exp.isGoingon ? "current" : moment(exp.startDate).format('DD-MM-YYYY')}
                                                </Typography>
                                                {exp.description != null &&
                                                    (
                                                        <Button style={{ fontSize: "11px", backgroundColor: "#D2691E", color: "black", fontWeight: "bolder" }} onClick={() => {
                                                            setOpen(true)
                                                            setContent(exp.description)
                                                        }} >Description</Button>
                                                    )
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : (<Typography variant="h6" style={{ textAlign: "center" }} >
                            No experience details
                        </Typography>)
                    }
                </div>
            </div>
            {
                profile?.repos.length > 0 && (
                    <>
                        <div style={{ minHeight: "200px", width: "70%", margin: "0px auto", backgroundColor: "rgba(255,255,255,0.8)", marginTop: "50px", marginBottom: "50px" }} >
                            <Typography variant="h3" style={{ textAlign: "center", fontWeight: "bold", marginBottom: "20px", padding: "10px 0px" }} >
                                Repos
                            </Typography>
                            <div style={{ display: "flex", flexDirection: "column", fontWeight: "bold", gap: "10px" }} >
                                {
                                    profile?.repos.map(repo => {
                                        return (
                                            <div key={repo.id} style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#6A5ACD", alignItems: "center", padding: "15px", fontSize: "20px", margin: "0px 10px", borderRadius: "10px", marginBottom: "10px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }} >
                                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "black" }} >
                                                    <Typography variant="p" >
                                                        {repo.name}
                                                    </Typography>
                                                </a>
                                                <div style={{ display: "flex", flexDirection: "column" }} >
                                                    <div>
                                                        Forks : {repo.forks_count}
                                                    </div>
                                                    <div>
                                                        Watchers: {repo.watchers_count}
                                                    </div>
                                                    <div>
                                                        Stars : {repo.stargazers_count}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>
                )
            }
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
                    <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: "bold" }} >
                        {content}
                    </Typography>
                </Box>

            </Modal>
        </>
    )
}

export default ProfileCard