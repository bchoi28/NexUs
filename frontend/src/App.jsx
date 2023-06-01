import SignInPage from "./components/SignInPage/SignInPage";
import SignUpPage from "./components/SignUpPage";
import SplashPage from "./components/SplashPage";
import Feed from "./components/Feed";
import Logout from "./components/Logout";
import { Route, Switch } from 'react-router-dom';

function App() {


  return (
    <>
      <Switch>
        <Route exact path="/"><SplashPage /></Route>
        <Route exact path='/signup'><SignUpPage /></Route>
        <Route exact path='/login'><SignInPage /></Route>
        <Route exact path='/feed'><Feed /></Route>
        <Route exact path='/logout'><Logout /></Route>

      </Switch>
    </>
  );


}

export default App;
