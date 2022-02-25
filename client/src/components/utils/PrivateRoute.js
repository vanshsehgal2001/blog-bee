import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, auth: { isAuthenticated, loading } }) => {
    return (
        !isAuthenticated && !loading ? (
            <Navigate to="/login" />
        ) : (
            children
        )
    )
};

const mapStateToProps = state => {
    const auth = state.auth
    return { auth }
}

export default connect(mapStateToProps)(PrivateRoute);
