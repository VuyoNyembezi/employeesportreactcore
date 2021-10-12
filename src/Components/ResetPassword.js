import React,{Component} from 'react';
import '../App.css';
import { Card,CardBody,CardGroup,Col,Container,Form,Input,InputGroup,Row } from 'reactstrap';
import { Navbar,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {ImUser,ImLock,ImUserTie,ImSwitch} from "react-icons/im"
class Reset extends Component{
    constructor(){
        super();
        this.state={
            Email:'',
            Password:'',
            Role:1
        }

        this.Password = this.Password.bind(this);
        this.Email =this.Email.bind(this);
        this.login =this.login.bind(this);

    }
Email(event){
    this.setState({Email: event.target.value})
}
Password(event){
    this.setState({Password: event.target.value})
}Role(event){
    this.setState({Role: event.target.value})
}

login(event){
    event.preventDefault();;
    fetch('http://localhost:45413/api/Login/Reset',{
        method:'put',
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email:this.state.Email,
            password: this.state.Password
        })
    }).then((Response)=> Response.json())
    .then((result)=>{
        console.log(result);
        if (result.status === 'Success')
        alert('Password reset successfully');
        else if (result.status === 'Failed')
        alert('email not found, please check input')
      
        
           
    })
}
render(){
    return(
        <div className="app flex-row-align-items-center">
        <>
        <Navbar bg="dark" variant="light">
        <Link to="/">
        <Button variant="danger"   >
            <ImSwitch/>Log Out  
         </Button>
         </Link>
         
        </Navbar> 
        </>
        <div>
            <h2>Reset Client/Admin Password </h2>
        </div>
            <Container>
                <Row className="justify-content-center">
                    <Col md="9" lg="7" x1="6">

                        <CardGroup>
                            <Card className="p-2">
                                <CardBody>
                                    <Form onSubmit={this.login}>
                                        <div className="row mb-2 pageheading">
                                            <div className="col-sm-12 ">
                                            <ImUserTie/>  Reset Password
                                            </div>
                                        </div>
                                        <InputGroup className="mb-3">
                                          <ImUser/>  <Input type="email" onChange={this.Email} placeholder="Enter Email" required/>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                           <ImLock/> <Input type="password" onChange={this.Password} placeholder="Enter Password" required/>
                                        </InputGroup>
                                        <Button type="submit" color="success" variant="success" size="lg">Reset</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

}
export default Reset;