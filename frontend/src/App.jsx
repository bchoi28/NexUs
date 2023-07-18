import { Route, Switch } from 'react-router-dom';
import SplashPage from "./components/SplashPage";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage/SignInPage";
import Logout from "./components/Logout";
import Feed from "./components/Feed";
import ProfilePage from "./components/ProfilePage";
import Login from './components/Login/Login';
import NetworkPage from './components/Network/NetworkPage';

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
      </Switch>
    </>
  );


}

export default App;
