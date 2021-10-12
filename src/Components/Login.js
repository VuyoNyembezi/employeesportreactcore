import React,{Component} from 'react';
import '../App.css';
import { Card,CardBody,CardGroup,Col,Container,Form,Input,InputGroup,Row } from 'reactstrap';
import { Navbar,Nav, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {ImUser,ImLock} from "react-icons/im";
import {IoIosEye} from "react-icons/io";

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            Email:'',
            Password:'',
            hidden: true,
            cookies: ['user']
        }
        this.Password = this.Password.bind(this);
        this.Email =this.Email.bind(this);  
        this.login =this.login.bind(this);
       this.toggleShow = this.toggleShow.bind(this);
    }
    
Email(event){
    this.setState({Email: event.target.value})
}
Password(event){
    this.setState({Password: event.target.value})
}
toggleShow(){
    this.setState({hidden: !this.state.hidden});
}

componentDidMount(){
    if (this.props.password) {
        this.setState({password: this.props.password})
    }
}

login(event, d){
    event.preventDefault();   
    fetch('http://localhost:45413/api/Login/Login',{
        method:'post',
        headers:{
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
        if (result.status === 'Invalid')
        alert(`please check your details `);
        else if(result.role ===2){
            localStorage.setItem('auth', d)
            localStorage.setItem('user', this.state.Email)
            localStorage.setItem('token',result.token)
            this.props.history.push('/Home')
        }
       else if(result.role ===1){
         localStorage.setItem('adm',d)
       this.props.history.push('/Register')  
       }
       else if (result.role===3)
       alert("Account Disabled ,please contact system admin ")
    })
}

render(){ 
    return(
        <div className="app flex-row-align-items-center">
        <>
        <Navbar bg = "dark" variant = "dark" >
                <Nav className = "mr-auto" >
                  <Nav.Link>  Please Log in First</Nav.Link>
                </Nav> 
            </Navbar> 
        </>
            <Container>
                <Row className="justify-content-center">
                    <Col md="9" lg="7" x1="6">

                        <CardGroup>

                            <Card className="p-2">
                                <CardBody>
                                    <Form onSubmit={this.login}>
                                        <div className="row mb-2 pageheading">
                                            <div className="col-sm-12 ">
                                               Login
                                            </div>
                                        </div>
                                        <InputGroup className="mb-3">
                                           <ImUser/> <Input type="email" onChange={this.Email} placeholder="Enter Email" value={this.state.Email} required />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                        <ImLock/><Input type={this.state.hidden ? 'password': 'text'}
                                         onChange={this.Password} placeholder="Enter Password"
                                         value={this.state.Password}
                                          required />
                                          <Button variant="dark" onClick={this.toggleShow}><IoIosEye/> show</Button>
                                        </InputGroup>
                                        <Button type="submit" color="success">Login</Button>
                                    </Form>
                                    <p  class="text-right  text-wrap"><Link  to="/Forgot" >forgot password</Link></p>
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
export default Login;