import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './components/Register/Register';
import Login from './components/Login/Login';
// import Footer from './components/Footer/Footer'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Fragment, useEffect } from 'react';
import Alert from './components/Alert/Alert'
import Dashboard from './components/Dashboard/Dashboard'
import setToken from './redux/utils/setToken'
import { loadUser } from './redux/actions/auth'
import PrivateRoute from './components/utils/PrivateRoute';
import CreateProfile from './components/Profile/CreateProfile/CreateProfile';
import EditProfile from './components/Profile/EditProfile/EditProfile';
import AddEducation from './components/Profile/Education/AddEducation'
import AddExperience from './components/Profile/Experience/AddExperience'
import EditEducation from './components/Profile/Education/EditEducation';
import EditExperience from './components/Profile/Experience/EditExperience';
import Profiles from './components/Profiles/Profiles'
import UserProfile from './components/Profiles/UserProfile';
import Posts from './components/Posts/Posts'
import UserPost from './components/Posts/UserPost';
import CreatePost from './components/Posts/CreatePost/CreatePost';
import EditPost from './components/Posts/EditPost/EditPost';

if (localStorage.getItem('token')) {
  setToken(localStorage.getItem('token'))
}

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])



  return (
    <Fragment>
      <Provider store={store} >
        <div style={{ position: "relative", height: "100%", width: "100%" }} >
          <Router>
            <Navbar />
            <Alert />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
              />
              <Route
                path="/create-profile"
                element={
                  <PrivateRoute>
                    <CreateProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <PrivateRoute>
                    <EditProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-education"
                element={
                  <PrivateRoute>
                    <AddEducation />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-experience"
                element={
                  <PrivateRoute>
                    <AddExperience />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-education/:ed_id"
                element={
                  <PrivateRoute>
                    <EditEducation />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-experience/:exp_id"
                element={
                  <PrivateRoute>
                    <EditExperience />
                  </PrivateRoute>
                }
              />
              <Route path="/users" element={<Profiles />} />
              <Route path="/profile/:user_id" element={<UserProfile />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/post/:post_id" element={<UserPost />} />
              <Route
                path="/add-post"
                element={
                  <PrivateRoute>
                    <CreatePost />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-post/:post_id"
                element={
                  <PrivateRoute>
                    <EditPost />
                  </PrivateRoute>
                }
              />
            </Routes>
            {/* <Footer /> */}
          </Router>
        </div>
      </Provider>
    </Fragment>
  )
}


export default App;
