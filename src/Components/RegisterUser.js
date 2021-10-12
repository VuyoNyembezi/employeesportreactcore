import React,{Component} from 'react';
import { Card,CardBody,Col,Container,Input,InputGroup,Row } from 'reactstrap';
import { Button,Navbar ,Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {ImSwitch,ImUnlocked} from "react-icons/im"
import axios from 'axios';
import { logout} from '../Auth';

class Reg extends Component{
    constructor(){
        super();
        this.state ={
            AdminName:'',
            City:0,
            Email:'',
            Password:'',
            Department:0,
            Role:0,
            DepartmentData:[],
            RolesData:[],
            CityData:[],
            DepId:0,
            isOpen: false,
            auth:''
        }
        this.Email = this.Email.bind(this);
        this.Password =this.Password.bind(this);
        this.AdminName = this.AdminName.bind(this);
        this.Department=this.Department.bind(this);
        this.City =this.City.bind(this);
        this.Role = this.Role.bind(this)
        this.register =this.register.bind(this);  
    }
    Email(event){
        this.setState({Email: event.target.value})
    }
    Department(event){
        this.setState({Department: event.target.value})
    }
    Password(event){
        this.setState({Password: event.target.value})
    }
    City(event){
        this.setState({City: event.target.value})
    }
    AdminName(event){
        this.setState({AdminName: event.target.value})
    }
    Role(event){
        this.setState({Role: event.target.value})
    }

    componentDidMount(){
        axios.get('http://localhost:45413/api/Login/Roles').then(response =>{
            console.log(response.data);
            this.setState({
                RolesData: response.data
            });
        });
        axios.get('http://localhost:45413/api/Login/Cities').then(response =>{
                    console.log(response.data);
                    this.setState({
                        CityData: response.data
                    });
                });
        axios.get('http://localhost:45413/api/Login/Departments').then(response =>{
                    console.log(response.data);
                    this.setState({
                        DepartmentData: response.data
                    });
                });
    }
register(event){
    event.preventDefault();
    console.log(event.data)
    fetch('http://localhost:45413/api/Login/InsertUser',{
        method: 'post',
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`,
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            adminName: this.state.AdminName,
            password:this.state.Password,
            email: this.state.Email,
            cityID: this.state.City,
            departmentID:this.state.Department,
            roleID: this.state.Role
        })      
    }).then((Response) => Response.json())
    .then((Result)=>{
        console.log(Result)
        if (Result.returnId >=1)
        {
            alert("user added successful") 
        }
        else if(Result.returnId === -2)
        {
            alert("failed email already used")
        }
        else if(Result.returnId <1)
        alert("registration failed")       
    })
}
openmodal =() => this.setState({isOpen: true});
closeModal =()=> this.setState({isOpen: false});

logout = () =>{
    this.setState({auth:''});
    localStorage.clear()
}

render(){
    return(
        <div className="app flex-row align-items-center">
        <>
        <Navbar bg="dark" variant="light">
        <Link onClick={() => logout()} to="/" >
        <Button variant="danger"  >
            <ImSwitch/>Log Out 
         </Button>
         </Link>
        </Navbar> 
        <Navbar bg="light" className="justify-content-end" variant="light"> 
         <Link to="/Reset">
        <Button variant="warning"   >
            <ImUnlocked/>Reset Client Password 
         </Button>
         </Link>
         <Link to="/removeUser"> 
        <Button variant="danger"   >
            <ImUnlocked/>Remove/DeActivate User 
         </Button>
         </Link>
        </Navbar> 
        </>
        <Container>
            <Row className= "justify-content-center">
                <Col md="9" lg="7" x1="6">
                <Card className="mb-2">
                    <CardBody className="p-4">
                        <Form onSubmit={this.register}>
                            <div className="row mb-2 pageheading">
                                <div className="col-sm-12">
                                    Sign Up
                                </div>
                            </div>
                            <div className="form-group dropdown">
                                <select className="form-control" name="RoleID" onChange={this.Role} required>
                                    <option value="">Select Role</option>
                                    {this.state.RolesData.map((e, key) =>{
                                        return <option key={key} value={e.roleId}>{e.roleName}</option>
                                    })}
                                </select>
                            </div>
                            <InputGroup className="mb-3">
                                <Input type="text" onChange={this.AdminName} placeholder="Enter Name" required  />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <Input type="email" onChange={this.Email} placeholder="Enter  Email" required />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <Input type="text" onChange={this.Password} placeholder="Enter  Password"  required />
                            </InputGroup>

                            <div className="form-group dropdown">
                                <select className="form-control" name="cityID" onChange={this.City} required>
                                    <option value="">Select City</option>
                                    {this.state.CityData.map((e, key) =>{
                                        return <option key={key} value={e.cityID}>{e.cityName}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-group dropdown">
                                <select className="form-control" name="departmentID" onChange={this.Department} required>
                                    <option value="">Select Department</option>
                                    {this.state.DepartmentData.map((e, key) =>{
                                        return <option key={key} value={e.departmentID}>{e.departmentName}</option>
                                    })}
                                </select>
                            </div>
                            <Button type="submit" color="success" block>Create Admin Account</Button>
                        </Form>
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </Container>
            
        </div>
    )
}
}
export default Reg;