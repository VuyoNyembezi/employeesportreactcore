import React, { Component } from 'react';
import axios from 'axios';
import { NavLink ,Link} from 'react-router-dom';
import { Navbar,Nav,Col, Form, FormControl,Modal } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {ImHome,ImSearch,ImBin,ImWarning,ImSwitch} from "react-icons/im"
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import { logout} from '../Auth';

class DeleteEmployee extends Component {

     constructor(props) {
        super(props);
        this.state = {
            emp: [],
            employID: '',
            id:'',
           employeeId:'',   
           firstName:''   ,
           isOpen: false
        } 
    }
  
    componentDidMount() {
        this.refreshData();
    }
    openmodal =() => this.setState({isOpen: true});
    closeModal =()=> this.setState({isOpen: false});
    refreshData() {
        const headers ={   
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        axios.get('http://localhost:45413/api/Employee/',{headers}).then(response => {
            this.setState({emp: response.data});
            this.setState(response.employeeId)
        });        
    }
selectEmp= (emp) =>{
    this.setState({employeeId : emp.employeeId})
    this.setState({FirstName : emp.firstName})
    this.setState({Surname : emp.surname})
    this.setState({DateOfBirth : emp.dateOfBirth})
}

onsubmit =(e) =>{
debugger;
e.preventDefault();
const headers ={   
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
}
axios.get(`http://localhost:45413/api/Employee/${this.state.employID}`,{headers})
.then(response =>{
    if(!response.data.length){
        this.setState({isOpen: true})
    }  
    else
    this.setState({
        emp: response.data
    });
});
}
   handleSubmit= (event) =>{
    event.preventDefault();  
    fetch(`http://localhost:45413/api/Employee/`,{
        method:'DELETE',
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            employeeId: event.target.employeeId.value,
        })
    })
    .then(Response => {
     console.log(Response)
       return   alert("Employee successfully Terminated")
      })
    .catch(error =>{
        console.log(error)
        alert("Termination Failed try again,Contact support if the issue not resolved ")
    })
};
     changeHandler = e =>{
        this.setState({[e.target.name]: e.target.value})
      }
 
      logout = () =>{
        this.setState({auth:''});
        localStorage.clear()
    }
    render() {
        const {employID,employeeId,FirstName,Surname,DateOfBirth} = this.state   
        if (this.state.noData){
            return <p>No record found</p>
                    }
        return ( 
            <>
            
        <Navbar bg="light" variant="light">
        <Link onClick={() => logout()} to="/" >
        <Button variant="danger"   >
            <ImSwitch/>Log Out 
         </Button>
         </Link>
        </Navbar> 
        <br/>
            <Navbar bg = "dark" variant = "dark" >
                <Nav className = "mr-auto" >
                  <Nav.Link>  <NavLink className = "d-inline p-2 bg-dark text-white" to = "/Home" ><ImHome/> Home </NavLink>  </Nav.Link>
                </Nav> 
                   
                    <Form inline onSubmit={this.onsubmit}>
                    <FormControl type = "number" placeholder = "enter employeeID" className = "mr-sm-2" name="employID" value={employID} onChange={this.changeHandler} />
                    <Button variant = "outline-info"  type="submit"><ImSearch/> Search </Button> 
                    </Form> 
            </Navbar> 
            <br/>
                <div>
                <form onSubmit={this.handleSubmit}>
                <Form.Group >
                <Form.Row >
                <Form.Label column = "sm" lg = { 2 } >EmployeeID:
                </Form.Label> 
                <Col >
                <Form.Control size = "sm" type = "number" placeholder = "Enter Employee ID" name= "employeeId" value={employeeId}    onChange={this.changeHandler} readOnly required />
                </Col> 
                </Form.Row> 
                <Form.Row >
                <Form.Label column = "sm" lg = { 2 } >First Name:
                </Form.Label> 
                <Col >
                <Form.Control size = "sm" type = "text" placeholder = "display first name" name= "FirstName" value={FirstName} onChange={this.changeHandler} readOnly required/>
                </Col> 
                </Form.Row> 
                <Form.Row>
                <Form.Label column = "sm" lg = { 2 } >
                Surname:
                </Form.Label> 
                <Col >
                <Form.Control size = "sm" type = "text" placeholder = "display surname" name= "Surname"  value={Surname} onChange={this.changeHandler} readOnly required/>
                </Col> 
                </Form.Row> 
                <Form.Row>
                <Form.Label column = "sm" lg = { 2 } >
                Date Of Birth:
                </Form.Label> 
                <Col >
                <Form.Control size = "sm" type = "text" placeholder = "display surname" name= "Surname"  value={DateOfBirth} onChange={this.changeHandler} readOnly required/>
                </Col> 
                </Form.Row> 
                <Button type="submit" variant="danger" className = "my-1" >
                <ImBin/>TERMINATE EMPLOYEE 
                </Button> 
                </Form.Group> 
                </form>
            </div>
                <div>
                 <Table striped bordered hover variant = "light" >
                    <thead >
                        <tr>
                        <th scope="col"> EmployeeID </th> 
                        <th scope="col"> FirstName </th> 
                        <th scope="col"> Surname </th> 
                        <th scope="col"> DateOfBirth </th> 
                        <th scope="col"> Gender </th> 
                        <th scope="col"> Nationality </th>
                        </tr>   
                    </thead> 
                    <tbody>{
                        this.state.emp.map((emp, Index)=>{
                            return<tr key={Index}>
                                <th scope="row">{emp.employeeId}</th>                     
                                <td>{emp.firstName}</td>
                                <td>{emp.surname}</td>
                                <td>{emp.dateOfBirth}</td>
                                <td>{emp.genderType}</td>
                                <td>{emp.nationalityGroup}</td>
                            <td><button onClick={() => this.selectEmp(emp)}>SELECT</button></td>
                            </tr>
                        }) 
                    } 
                    </tbody>
                </Table>
            </div>
            <div>
            <Modal show={this.state.isOpen} onHide={this.closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Please Note!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><ImWarning/>  No Record Found</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeModal} >
                            OK                            
                            </Button>
                           
                        </Modal.Footer>
                    </Modal>
            </div>              
            </>
        );
    }
}
export default DeleteEmployee;