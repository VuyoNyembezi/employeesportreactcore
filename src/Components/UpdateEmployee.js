import React ,{Component} from 'react';
import axios from 'axios';
import {NavLink,Link} from 'react-router-dom';
import { Navbar,Nav,Col,Form,FormControl,Table,Button,Modal } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import {ImHome,ImUserPlus,ImSearch,ImUpload2,ImWarning,ImSwitch} from "react-icons/im"
import { logout} from '../Auth';

class EmployeeUpdate extends Component {

    constructor(props) {      
       super(props);
       this.state = {
           emp: [],
           employID: '',
           id:0,
          employeeID:'',
          firstName:'',
          surname:'',
          dateOfBirth:'',
         gender:'',
         isOpen:false
       }
   }
   componentDidMount =()=> {
       this.refreshData();
      
   }
   openmodal =() => this.setState({isOpen: true});
   closeModal =()=> this.setState({isOpen: false});
   refreshData =()=> {
    const headers ={   
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
       axios.get('http://localhost:45413/api/Employee',{headers}).then(response => {
           console.log(response.data);
           this.setState({emp: response.data});
           this.setState(response.EmployeeId)
           this.setState(response.FirstName)
           this.setState(response.Surname)
       });           
    }

selectEmp= (emp) =>{
   console.log(emp)
   this.setState({EmployeeId : emp.employeeId})
   this.setState({FirstName : emp.firstName})
   this.setState({Surname : emp.surname})
}
logout = () =>{
    this.setState({auth:''});
    localStorage.clear()
}
onsubmit =(e) =>{
console.log(this.employID)
e.preventDefault();
const headers ={   
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
}
axios.get(`http://localhost:45413/api/Employee/${this.state.employID}`,{headers}).then(response =>{
    if(!response.data.length){
        this.setState({isOpen: true})
    }  
    else
   this.setState({
       emp: response.data
   });
});
}

handleSubmit = (event) =>{
   event.preventDefault();
   fetch(`http://localhost:45413/api/Employee/`,{
       method:'PUT',
       headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`,
           'Accept':'application/json',
           'Content-Type':'application/json'
       },
       body:JSON.stringify({
           employeeId: event.target.EmployeeId.value,
           firstName: event.target.FirstName.value,
           surname: event.target.Surname.value
       })
   })
   .then(Response => {
    console.log(Response);
  if (Response.status === 200)
  {
    return   alert("Employee successfully Updated");
  }
  else
  return alert("Employee Update Failed");
     })
     .catch(error =>{
        console.log(error)
        alert("Employee update process failed")
    })
}
openConfirmation = (event) => {
    event.preventDefault();
    this.setState({isOpen: true});
    console.log({isOpen: this.state.isOpen});
}
closeConfirmation =(event) =>{
    event.preventDefault();
    this.setState({isOpen: false});
    console.log({isOpen: this.state.isOpen});
}

    changeHandler = e =>{
       this.setState({[e.target.name]: e.target.value})
     }

   render() {
       const {employID,EmployeeId,FirstName,Surname} = this.state
       if (this.state.noData){
        return <p>No record found</p>
                }
       return ( 
           <>
               <Navbar bg="light" variant="light">
               <Link onClick={() => logout()} to="/" >
        <Button variant="danger"  >
            <ImSwitch/>Log Out 
         </Button>
         </Link>
        </Navbar> 
        <br/>
           <Navbar bg = "dark" variant = "dark" >
                <Nav className = "mr-auto" >
                   <Nav.Link><NavLink className = "d-inline p-2 bg-dark text-white" to = "/Home" ><ImHome/> Home </NavLink> </Nav.Link>
                   <Nav.Link><NavLink variant="outline-success" className = "d-inline p-2 bg-dark text-white"
                   to = "/AddEmployee"><ImUserPlus/> ADD Employee </NavLink> </Nav.Link>
                </Nav> 

                <Form inline onSubmit={this.onsubmit}>
                    <FormControl type = "number" placeholder = "enter employeeID" className = "mr-sm-2" name="employID" onChange={this.changeHandler} value={employID}
                    />
                    <Button variant = "outline-info"  type="submit" ><ImSearch/>  Search </Button> 
                </Form> 
            </Navbar> 
               <br/>
               <div><h4>Update Employee Details </h4></div>
               <div>
               <form onSubmit={this.handleSubmit}>
               <Form.Group >
               <Form.Row >
               <Form.Label column = "sm" lg = { 2 } >EmployeeID:
               </Form.Label> 
               <Col >
               <Form.Control size = "sm" type = "number" placeholder = "Employee ID" name= "EmployeeId"   value={EmployeeId} onChange={this.changeHandler} disabled required />
               </Col> 
               </Form.Row> 
               <Form.Row >
               <Form.Label column = "sm" lg = { 2 } >First Name:
               </Form.Label> 
               <Col >
               <Form.Control size = "sm" type = "text" placeholder = "enter first name" name= "FirstName" value={FirstName} onChange={this.changeHandler} required/>
               </Col> 
               </Form.Row> 
               <Form.Row>
               <Form.Label column = "sm" lg = { 2 } >
               Surname:
               </Form.Label> 
               <Col >
               <Form.Control size = "sm" type = "text" placeholder = "enter surname" name= "Surname"  value={Surname} onChange={this.changeHandler} required/>
               </Col> 
               </Form.Row> 
               <Button type="submit" className = "my-1">
               <ImUpload2/> UPDATE EMPLOYEE 
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
           </Table></div>
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
export default EmployeeUpdate;