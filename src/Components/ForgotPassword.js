import React,{Component} from 'react';
import { Card,CardBody,Col,Container,Input,InputGroup,Row } from 'reactstrap';
import { Button,Navbar ,Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {ImSwitch,ImUnlocked} from "react-icons/im"
import axios from 'axios';
import { IoIosEye } from 'react-icons/io';

class Forgotpass extends Component{
    constructor(){
        super();
        this.state ={
            Email:'',
            Password:'',
            ResetPasswordKey:'',
            isOpen: false,
            passwordHidden: true
        }
        this.Email = this.Email.bind(this);
        this.Password =this.Password.bind(this);
        this.ResetPasswordKey = this.ResetPasswordKey.bind(this)
        this.register =this.register.bind(this);  
        this.toggleShow = this.toggleShow.bind(this);
    }
    Email(event){
        this.setState({Email: event.target.value})
    }
    Password(event){
        this.setState({Password: event.target.value})
    }
    ResetPasswordKey(event){
        this.setState({ResetPasswordKey: event.target.value})
    }
    toggleShow(){
        this.setState({passwordHidden: !this.state.passwordHidden})
    }
    componentDidMount(){
        this.setState({password: this.props.password})
    }
generate_key =(event)=>{
    event.preventDefault();
    console.log(event.data)
    fetch('http://localhost:45413/api/Login/UserResetPass',{
        method: 'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: this.state.Email
        })
    }).then((result) => result.json())
    .then((result) =>{
        console.log(result)
        if (result.status === "Success")
        alert("reset key sent please check your email ")
        else if(result.status ==="Failed")
        alert(" this email is not registered")
    })
}
    
register(event){
    event.preventDefault();
    console.log(event.data)
    fetch('http://localhost:45413/api/Login/Forgottenpassword',{
        method: 'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           
            password:this.state.Password,
            email: this.state.Email,
            resetPasswordkey: this.state.ResetPasswordKey,
        })      
    }).then((Response) => Response.json())
    .then((Result)=>{
        console.log(Result)
        if (Result.status ==="Failed")
       alert("password resetting failed ")
        else if(Result.status ===  "Success" )
         alert("Password Changed")
    })
}

render(){
    return(
        <div className="app flex-row align-items-center">
        <>
        <Navbar bg="dark" variant="light">
        <Link to="/">
        <Button variant="success"   >
            <ImSwitch/>Login  
         </Button>
         </Link>
         
        </Navbar> 
       
        </>
        <Container>
            <Row className= "justify-content-center">
                <Col md="9" lg="7" x1="6">
                <Card className="mb-2"> <div className="col-sm-12">
                                    forgotten your password?
                                </div>
                    <CardBody className="p-4">
                    
                         <Form onSubmit={this.generate_key}>
                              <InputGroup className="mb-3" >
                                <Input type="email" onChange={this.Email} placeholder="Enter  Email" required />

                            </InputGroup>
                            
                            <Button type="submit" variant="warning"  >Get Key</Button><hr />
                         </Form>
                      
                           
                        <Form onSubmit={this.register} >
                         
                            <InputGroup className="mb-3">
                                <Input type="text" onChange={this.ResetPasswordKey} placeholder="Enter  Reset Key"  required />
                            </InputGroup>
                            <InputGroup className="mb-3">

                                <Input type={this.state.passwordHidden ? 'password':'text'}
                                onChange={this.Password} 
                                placeholder="New  Password"  
                                value={this.state.Password}
                                required />
                                <Button variant="dark" onClick={this.toggleShow}><IoIosEye/></Button>
                            </InputGroup>

                           
                            <Button type="submit" variant="success" >Reset Password</Button>
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
export default Forgotpass;