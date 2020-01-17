import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from "./components/Home"
import Login from "./components/Login/Login"
import Signup from "./components/Login/SignUp"
import { AuthProvider } from './Auth'
import PrivateRoute from "./PrivateRoute"


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="font-sans">
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;
