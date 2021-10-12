import '../App.css';
import React ,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Navbar,Col,Form,FormControl,Table,Button,Modal } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import {ImSearch,ImWarning,ImSwitch,ImPointDown} from "react-icons/im"
import { Card,CardBody,Container,Input,InputGroup,Row} from 'reactstrap';

class DeleteUser extends Component {
    constructor(props) {      
       super(props);
       this.state = {
           emp: [],
           employID: '',
          fkRoleId:0,
          RolesData:[],
          adminName:'',
          email:'',
         isOpen:false
       }
   }
   componentDidMount =()=> {
       this.refreshData();
       axios.get('http://localhost:45413/api/Login/Roles').then(response =>{
            console.log(response.data);
            this.setState({
                RolesData: response.data
            });
        });
   }
   
   openmodal =() => this.setState({isOpen: true});
   closeModal =()=> this.setState({isOpen: false});
   
   refreshData =()=> {
       axios.get('http://localhost:45413/api/Login/Users').then(response => {
           console.log(response.data);
           this.setState({emp: response.data});
           this.setState(response.Id)
           this.setState(response.Email)
           this.setState(response.AdminName)
       });           
    }

selectEmp= (emp) =>{
    this.setState({Id : emp.id})
this.setState({AdminName : emp.adminName})
   this.setState({Email : emp.email})


   console.log(emp)
}

onsubmit =(e) =>{
console.log(this.employID)
e.preventDefault();
const headers ={   
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
}
axios.get(`http://localhost:45413/api/Login/Users/${this.state.employID}`,headers).then(response =>{
    if(!response.data.length){
        this.setState({isOpen: true})
    }  
    else
   this.setState({
       emp: response.data
   });
});
}

handleChangeRole = (event) =>{
   event.preventDefault();
   
   fetch(`http://localhost:45413/api/Login/ChangeRole`,{
       method:'PUT',
       headers:{
           'Authorization':`Bearer ${localStorage.getItem('token')}`,
           'Accept':'application/json',
           'Content-Type':'application/json'
       },
       body:JSON.stringify({
           id: event.target.Id.value,
           fkRoleId: event.target.fkRoleId.value
       })
   })
   .then(Response => Response.json())
   .then((Results) =>{
     if (Results.returnId === 1){
      return alert("Roles successfully changed ")
     }
     else if (Results.returnId === 0)
     {
       return alert ("Process failed please try again")
     }
     else {
            alert ("internal error please contact support")
     }



console.log(Results)
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
       const {employID,Id,AdminName,Email,fkRoleId} = this.state
       return ( 
           <>
            <Navbar bg="light" variant="light">
                              <Link to = "/" >  <Button variant="danger" to="/" >
                                         <ImSwitch/>Log Out  
                                        </Button></Link>
                                </Navbar> 
                                    <br/>          
               <div className="grid-container">

<div className="grid-child purple">
<h4><b>System Users</b></h4>
<Navbar bg = "dark" variant = "light" >       
                <Form inline onSubmit={this.onsubmit}>
                    <FormControl type = "number" placeholder = "Search" className = "mr-sm-2" name="employID" onChange={this.changeHandler} value={employID}
                    />
                    <Button variant = "outline-info"  type="submit" ><ImSearch/>  Search </Button> 
                </Form> 
            </Navbar> 
               <br/>
<Table striped bordered hover variant = "light" >
            <thead>
            <tr> 
            <th scope="col"> Name </th> 
            <th scope="col"> email </th> 
            <th scope="col"> Department </th> 
            <th scope="col"> Branch </th> 
            <th scope="col"> System Role </th>
            <th scope="col"><ImPointDown/></th>
            </tr>    
            </thead> 
            <tbody>{
                this.state.emp.map((emp, Index)=>{
                    return<tr key={Index}>               
                        <td>{emp.adminName}</td>
                        <td>{emp.email}</td>
                        <td>{emp.departmentName}</td>
                        <td>{emp.cityName}</td>
                        <td>{emp.roleName}</td>
                        <td><button onClick={() => this.selectEmp(emp)}>SELECT</button></td>
                    </tr>
                })
            } 
            </tbody>
            </Table>
</div>

<div className="grid-child green">
<Container>
            <Row className= "justify-content-center">
                <Col md="9" lg="8" x1="6">
                <Card className="mb-2">
                    <CardBody className="p-4">
                        <Form onSubmit={this.handleChangeRole} >
                            <div className="row mb-2 pageheading">
                                <div className="col-sm-12">
                                    Selected User
                                </div>
                            </div>
                            <InputGroup className="mb-3">
                                <Input type="text" onChange={this.changeHandler} name="Id" value={Id}placeholder="Display User Name" required  readOnly/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Input type="text" onChange={this.changeHandler} name="AdminName" value={AdminName}placeholder="Display User Name" required  readOnly/>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Input type="email" onChange={this.changeHandler} name="Email" value={Email} placeholder="Show Email " required readOnly/>
                            </InputGroup>
                            <div className="form-group dropdown">
                                <select className="form-control" name="fkRoleId" onChange={this.changeHandler} value={fkRoleId} required >
                                    <option value="">Select Role</option>
                                    {this.state.RolesData.map((e, key) =>{
                                        return <option key={key} value={e.roleId}>{e.roleName}</option>
                                    })}
                                </select>
                            </div>
                            <Button type="submit" variant="success" >Change Role</Button>      
                        </Form>
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </Container>
          <br/>    
            </div>
  <div>
            <Modal show={this.state.isOpen} onHide={this.closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title> Note!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><ImWarning/>  No User Record Found</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeModal} >
                            OK                            
                            </Button>
                        </Modal.Footer>
                    </Modal>
            </div>     
            </div>
           </>
       );
   }
}
export default DeleteUser;