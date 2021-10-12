import React,{Component} from 'react';
import axios from 'axios';
import {NavLink,Link} from 'react-router-dom';
import { Navbar,Nav,Form,FormControl ,Table,Button,Modal} from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import {ImHome,ImSearch,ImWarning,ImSwitch} from "react-icons/im"
import { logout} from '../Auth';

class Terminated extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emp: [],
            searchEmp:'',
            id:0,
            employeeID: '',
            isOpen: false
        }
    }
    componentDidMount() {
        this.refreshData();
    }
    refreshData() {
        const headers ={   
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        axios.get('http://localhost:45413/api/Employee/Terminated',{headers}).then(response => {
            this.setState({
                emp: response.data
            });
        });        
    }
    openmodal =() => this.setState({isOpen: true});
    closeModal =()=> this.setState({isOpen: false});

     onsubmit =(e) =>
     {  
        e.preventDefault();
        const headers ={   
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        axios.get(`http://localhost:45413/api/Employee/Terminated/${this.state.employeeId}`,{headers}).then(response => {   
            if(!response.data.length){
                this.setState({isOpen: true})
            }  
            else         
                    this.setState({
                        emp: response.data
                    });
                });
     }
     changeHandler = e =>{
        this.setState({[e.target.name]: e.target.value})
      }
      logout = () =>{
        this.setState({auth:''});
        localStorage.clear()
    }
    render() {
        const {employID} = this.state
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
                    <Nav.Link><NavLink className = "d-inline p-2 bg-dark text-white" to = "/Home" ><ImHome/> Home </NavLink></Nav.Link>  
                    </Nav> 
                    <Form inline onSubmit={this.onsubmit}>
                    <FormControl type = "number" placeholder = "enter employeeID" className = "mr-sm-2" name="employeeId" onChange={this.changeHandler} value={employID}
                    />
                    <Button variant = "outline-info"  type="submit"><ImSearch/> Search </Button> 
                    </Form> 
                </Navbar> 
                <br/>
                <div>
        <Table striped bordered hover variant = "light" >
            <thead>
            <tr>
            <th scope="col"> EmployeeID </th> 
            <th scope="col"> FirstName </th> 
            <th scope="col"> Surname </th> 
            </tr>    
            </thead> 
            <tbody>{
                this.state.emp.map((emp, Index)=>{
                    return<tr key={Index}>
                        <th scope="row">{emp.employeeId}</th>
                        <td>{emp.firstName}</td>
                        <td>{emp.surname}</td>
                    </tr>
                })
            } 
            </tbody>
            </Table></div>
            <div>
            <Modal show={this.state.isOpen} onHide={this.closeModal} >
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
export default Terminated;