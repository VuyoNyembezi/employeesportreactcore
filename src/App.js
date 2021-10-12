import './App.css';
import React,{useState,useMemo} from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {BrowserRouter,Switch} from 'react-router-dom';
import {ImLibrary} from "react-icons/im";

import Home from './Components/Home';
import AddEmployee from './Components/AddEmployee';
import TerminateEmployee from './Components/DeleteEmployee';
import UpdateEmployee from './Components/UpdateEmployee';
import Employees from './Components/Employees';
import Login from './Components/Login';
import Reg from './Components/RegisterUser';


import Reset from './Components/ResetPassword';
import Terminated from './Components/TerminatedEmployee';
import DeleteUser from './Components/RemoveUser';
import Forgotpass from './Components/ForgotPassword';

//Authentication Imports
import PrivateRoute from './hooks/PrivateRoute';
import PublicRoute from './hooks/PublicRoute';
import AdminPrivate from './hooks/PrivateAdminRoute';
import {UserContext} from './hooks/UserContext'

function App() {
  const [user,setUser] = useState(null);
const value = useMemo (() =>({user, setUser}),[user,setUser]);
window.localStorage.clear();
  return (
   
      <div className="App">
    
       <BrowserRouter>
       <UserContext.Provider value={value}>
      <Navbar bg = "dark" variant = "dark" >
                <Nav className = "mr-auto" > 
                </Nav>     
            </Navbar> 
            <br/>
      <h2 className = "m-3 d-flex justify-content-center" >
      <ImLibrary/  >Employees portal   <ImLibrary/>
        </h2>
        <Switch> 
        
        {/* User and Administration Routes  */}
        <PublicRoute restricted={true} path='/' component={Login}  exact/> 
        <PublicRoute restricted={true} path='/login' component={Login}  exact/>
        <AdminPrivate path='/Reset' component={Reset} />
          <AdminPrivate path='/register' component={Reg} />
          <AdminPrivate path='/removeUser' component={DeleteUser} />
          <PublicRoute restricted={true} path='/Forgot' component={Forgotpass} />

          {/* Main System Routes */}

          <PrivateRoute path='/Home' component={Home} exact />
          <PrivateRoute path='/AddEmployee' component={AddEmployee} />
          <PrivateRoute path='/DeleteEmployee' component={TerminateEmployee} />
          <PrivateRoute path='/UpdateEmployee' component={UpdateEmployee} />
          <PrivateRoute path='/Employees' component={Employees} />
          <PrivateRoute path='/Terminated' component={Terminated} />
                  
          
        </Switch>
        </UserContext.Provider>
        </BrowserRouter>  
    </div>
    
  );
}

export default App;
