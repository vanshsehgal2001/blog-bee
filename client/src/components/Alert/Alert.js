import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline';
import Alert from '@mui/material/Alert';

const AlertComp = ({ alerts }) => {
    return (
        <Fragment>
            <CssBaseline />
            {
                alerts !== null && alerts.length > 0 && alerts.map(alert => {
                    return (
                        <Alert style={{ width: "50%", margin: "auto", marginBottom: "10px", marginTop: "15px" }} key={alert.id} severity={`${alert.type}`}>
                            <strong> {alert.message} </strong>
                        </Alert>
                    )
                })
            }
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    const alerts = state.alert
    return { alerts }
}

export default connect(mapStateToProps)(AlertComp);
