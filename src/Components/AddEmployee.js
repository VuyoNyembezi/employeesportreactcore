import React,{Component} from 'react';
import { Form,Button,Col,Nav,Navbar} from 'react-bootstrap';
import {NavLink,Link} from 'react-router-dom';
import axios from 'axios';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import TextField  from '@material-ui/core/TextField';
import {ImHome,ImUpload2,ImUserPlus,ImSwitch} from "react-icons/im"
import { Card,CardBody,Container,Input,InputGroup,Row,Label } from 'reactstrap';
import { logout} from '../Auth';

class AddEmployee extends Component
{
constructor(props){
    super(props);
    this.state={
     
        firstName:'',
        surname:'',
        dateOfBirth:'',
        fKGenderId:0,
        fKNationId:0,
       
        GenderData:[],
        NationalityData:[],
        isOpen: false
    };
}


componentDidMount(){
    axios.get('http://localhost:45413/api/Employee/Gender').then(response =>{
        console.log(response.data);
        this.setState({
            GenderData: response.data
        });
    });  
    axios.get('http://localhost:45413/api/Employee/Nationality').then(response =>{
        console.log(response.data);
        this.setState({
            NationalityData: response.data
        });
    });  
}

handleSubmit = e =>{
    e.preventDefault();
  
    fetch(`http://localhost:45413/api/Employee/`,{
        method:'POST',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            firstName: e.target.firstName.value,
            surname:e.target.surname.value,
            dateOfBirth: e.target.dateOfBirth.value,
            fkGenderId: e.target.fkGenderId.value,
            fkNationId: e.target.fkNationId.value
        })
    }).then((Response) => Response.json())
    .then(Response =>{

 if(Response.returnId === 1)
 alert("new employee record saved ")
 else if(Response.returnId === -1)
 alert("saving process failed please check input")
})
.catch(error =>{
    
    alert("server error please contact the admin")
})
}


changeHandler =e =>{
    this.setState({[e.target.name]:e.target.value})
}

logout = () =>{
    this.setState({auth:''});
    localStorage.clear()
}

render(){
const {firstName,surname,dateOfBirth,fkGenderId,fkNationId} = this.state;
const formData = this.state;
return(
<div><div>
<Navbar bg="light" variant="light">
<Link onClick={() => logout()} to="/" >
        <Button variant="danger" >
            <ImSwitch/>Log Out 
         </Button>
         </Link>
        </Navbar> 
        <br/>
                    <Navbar bg = "dark" variant = "dark" >

          <Nav className = "mr-auto" >
          <NavLink className = "d-inline p-2 bg-dark text-white" to = "/Home" ><ImHome/> Home </NavLink> 
          <NavLink className = "d-inline p-2 bg-dark text-white"
          to = "/UpdateEmployee"><ImUpload2/> Update Employee </NavLink> 
          </Nav> 
          </Navbar> 
          <br/>
        </div>
        <div>
        <h2> ADD NEW EMPLOYEE</h2>
        </div>
        <>
        <Container>
            <Row className= "justify-content-center">
                <Col md="9" lg="7" x1="6">
                <Card className="mb-2">
                    <CardBody className="p-4">
                        <Form onSubmit={this.handleSubmit}>    
                            <InputGroup className="mb-3"> 
                            <Label>First Name : </Label>
                            <br/>
                            <InputGroup className="mb-3">
                                <Input  type = "text" placeholder = "enter first name" name= "firstName"  onChange={this.changeHandler} value={firstName} required/>
                            </InputGroup>
                            <Label>Surname : </Label>
                            <InputGroup className="mb-3">
                                <Input  type = "text" placeholder = "enter surname" name= "surname" onChange={this.changeHandler} value={surname} required/>
                            </InputGroup>
                            <Label>Date Of Birth: </Label> <br/>
                            <InputGroup className="mb-3">
                            <TextField id="date"  type="date"  name="dateOfBirth" onChange={this.changeHandler} value={dateOfBirth} InputLabelProps={{shrink: true,}}
                            required/>
                            </InputGroup>
                            <Label>Gender : </Label>
                            </InputGroup>
                            <div className="form-group dropdown">
                                <select className="form-control" name="fkGenderId" onChange={this.changeHandler} value={fkGenderId} required>
                                    <option value="">Select Gender</option>
                                    {this.state.GenderData.map((e, key) =>{
                                        return <option key={key} value={e.genderId}>{e.genderType}</option>
                                    })}
                                </select>
                            </div>
                            <InputGroup className="mb-3"> 
                            <Label>Nationality : </Label>
                            </InputGroup>
                            <div className="form-group dropdown">
                                <select className="form-control" name="fkNationId" onChange={this.changeHandler} value={fkNationId} required>
                                    <option value="">Select Nationality</option>
                                    {this.state.NationalityData.map((e, key) =>{
                                        return <option key={key} value={e.nationId}>{e.nationalityGroup}</option>
                                    })}
                                </select>
                            </div>
                            <Button type = "submit" className = "my-1"  >
                            <ImUserPlus/>ADD EMPLOYEE 
                            </Button> 
                        </Form>
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </Container>
        </>
</div>
)}
}
export default AddEmployee;