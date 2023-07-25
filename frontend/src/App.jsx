import { Route, Switch } from 'react-router-dom';
import SplashPage from "./components/SplashPage";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage/SignInPage";
import Logout from "./components/Logout";
import Feed from "./components/Feed";
import ProfilePage from "./components/ProfilePage";
import NetworkPage from './components/Network/NetworkPage';
import Login from './components/Login';
import { Redirect } from 'react-router-dom';

function App() {


  return (
    <>
      <Switch>
        <Route exact path="/"><SplashPage /></Route>
        <Route exact path='/signup'><SignUpPage /></Route>
        <Route exact path='/login'><SignInPage /></Route>
        <Route exact path='/feed'><Feed /></Route>
        <Route exact path='/logout'><Logout /></Route>
        <Route exact path='/profile/:id' ><ProfilePage /></Route>
        <Route exact path='/mynetwork' ><NetworkPage /></Route>
        <Route exact path='/mynetwork1' ><Login /></Route>
        <Route path='*'><Redirect to='/feed' /></Route>
      </Switch>
    </>
  );


}

export default App;
