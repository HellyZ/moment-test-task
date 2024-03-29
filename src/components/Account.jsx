import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import FormContainer from '../containers/FormContainer';

class Account extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { editing: false };
  }

  toggle() {
    this.setState({ editing: !this.state.editing });
    // document.getElementsByClassName("toggleForm").css('visibility', 'visible');
  }

  render() {
    console.log(this.props)
    return (
        <tr >
          <td><b>{this.props.data.accountNumber}</b></td> 
               <td>{this.props.data.financialAccountCategory}</td> 
               <td>{this.props.data.currentVatPercentage}% ({this.props.data.vatCategoryCode})</td>
               <td><b>{this.props.data.name}</b></td> 
               <td>{/* EDIT ACCOUNT BUTTON HERE */}</td> 
               <td><Button color="primary" onClick={this.toggle}>Toggle</Button></td>
               
      <tr>
         <td colspan="6" className="toggleForm">
           <Collapse isOpen={this.state.editing}>
             <Card>
               <CardBody>
               <FormContainer />
               </CardBody>
             </Card> 
           </Collapse>
         </td>
       </tr>
        </tr>
    
      // <tr>
      //   <td colspan="6" className="toggleForm">
      //     <Collapse isOpen={this.state.editing}>
      //       <Card>
      //         <CardBody>
      //         <FormContainer />
      //         </CardBody>
      //       </Card> 
      //     </Collapse>
      //   </td>
      // </tr>
    );
  }
}

export default Account;