import { Route, Switch } from 'react-router-dom';
import SplashPage from "./components/SplashPage";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage/SignInPage";
import Logout from "./components/Logout";
import Feed from "./components/Feed";
import ProfilePage from "./components/ProfilePage";
import NetworkPage from './components/Network/NetworkPage';
import { Redirect } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <>
      <Switch>
        <Route exact path="/"><SplashPage /></Route>
        <Route exact path='/signup'><SignUpPage /></Route>
        <Route exact path='/login'><SignInPage /></Route>
        <ProtectedRoute exact path="/feed" component={Feed} />

        {/* <Route exact path='/feed'><Feed /></Route> */}
        <ProtectedRoute exact path='/logout'><Logout /></ProtectedRoute>
        <ProtectedRoute exact path='/profile/:id' ><ProfilePage /></ProtectedRoute>
        <ProtectedRoute exact path='/mynetwork' ><NetworkPage /></ProtectedRoute>
        <ProtectedRoute path='*'><Redirect to='/feed' /></ProtectedRoute>
      </Switch>
    </>
  );


}

export default App;
