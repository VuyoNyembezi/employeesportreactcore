import React, { Component} from 'react';
import Button from 'react-bootstrap/Button';
import { NavLink,Link } from 'react-router-dom';
import { Navbar, Nav, Form} from 'react-bootstrap';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import {ImHome,ImSwitch,ImUsers,ImUserPlus,ImUserMinus,ImUpload2,ImSearch,ImLibrary,ImUser} from "react-icons/im"
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import {logout} from '../Auth';

class Home extends Component {
constructor(props){
    super(props); 
    this.state ={
        emp:[],
        searchEmp:'',
        id:0,
        employID: '',
        isOpen: false,
        user:[],
        columns:[
            {dataField: "employeeId",text: "EmployeeID"},
            {dataField: "firstName",text: "FirstName"},
            {dataField: "surname",text: "Surname"},
            {dataField: "dateOfBirth",text:"DateOfBirth",},
            {dataField: "genderType",text:"Gender"},
            {dataField: "nationalityGroup",text:"Nationality"},
            ],
            auth:'',
    }      
}
openmodal =() => this.setState({isOpen: true});
closeModal =()=> this.setState({isOpen: false});

 logout = () =>{
     this.setState({auth:''});
     localStorage.clear()
 }
  
    componentDidMount() {
        this.refreshData();
        const user = localStorage.getItem('user');
        this.setState({user});
    }
   
    refreshData() {
        const headers ={   
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        axios.get('http://localhost:45413/api/Employee/',{headers
        }).then(response => {
                this.setState({
                    emp: response.data
                });
            });        
    }
    render(){
        const {SearchBar} =Search;      
    return (
            <>
                <ToolkitProvider keyField="EmployeeID" data= {this.state.emp} columns= {this.state.columns} search>
                    {
                        props=>(  
                                <div>
                                <p className="text-right">
                                <b>Hi: <ImUser/> {localStorage.getItem('user')}</b>
                                </p>
                                <>
                                <Navbar bg="light" variant="light">
                                <Link onClick={() => logout()} to="/">
                                <Button variant="danger" onClick={this.openmodal} >
                                <ImSwitch/>Log Out  
                                </Button>
                                </Link>
                                </Navbar>                           
                                    <br/>
                                    </>
                                    <Navbar bg="light" variant="light">
                                    <Navbar.Brand><ImLibrary/></Navbar.Brand>
                                        <Nav className="mr-auto">
                                        <Nav.Link><NavLink className = "d-inline p-2 bg-light text-black" to = "/Home" ><ImHome /> Home </NavLink> </Nav.Link>
                                        <Nav.Link><NavLink className = "d-inline p-2 bg-light text-black" to = "/AddEmployee" ><ImUserPlus/> ADD EMPLOYEE </NavLink> </Nav.Link>
                                        <Nav.Link><NavLink className = "d-inline p-2 bg-light text-black" to = "/UpdateEmployee" ><ImUpload2/> UPDATE EMPLOYEE </NavLink></Nav.Link>
                                        <Nav.Link><NavLink className = "d-inline p-2 bg-light text-black" to = "/DeleteEmployee" ><ImUserMinus/> TERMINATE EMPLOYEE </NavLink> </Nav.Link>
                                        <Nav.Link><NavLink className = "d-inline p-2 bg-light text-black" to = "/Employees" ><ImUsers/> ALL EMPLOYEES </NavLink></Nav.Link>
                                        </Nav>
                                        <Form inline>
                                        <ImSearch/> <SearchBar {...props.searchProps} placeholder = "Search (Auto search) "/> 
                                        </Form>     
                                    </Navbar> 
                                    <br/>
                                    <div >
                                        <BootstrapTable   striped bordered hover variant ="dark" {...props.baseProps} pagination={paginationFactory()} />
                                    </div> 
                                </div>
                            )
                        }
                    </ToolkitProvider> 
              </> 
            );
        }
}
export default Home;
