import React, {Component} from 'react';  
import {Input, TextArea, Select, Button, Form, FormGroup, ButtonToolbar} from 'react-bootstrap'
import '../index.css'



class FormContainer extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      newAccount: {
        name: '',
        accountNumber: '',
        financialAccountCategory: '',
        comment: '',
        currentVatPercentage: '',
        vatCategoryCode: '',
        externalTaxCode: '',
        externalRevenueClass: ''
      },

      finAccCategoryOptions: ['sales', 'purchases'],
    };

    console.log(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let account = this.state.newAccount;
    account.id = `${(+new Date()).toString(16)}`;
    account.companyId = 1;
    account.version = null;
    console.log(account);

    this.this.setState({ 
      newAccount: {
        name: '',
        accountNumber: '',
        financialAccountCategory: '',
        comment: '',
        currentVatPercentage: '',
        vatCategoryCode: '',
        externalTaxCode: ''
      }
    })
  }   

  handleClearForm(e) {
      e.preventDefault();
      console.log("RESET FORM!");
      this.setState({ 
        newAccount: {
          name: '',
          accountNumber: '',
          financialAccountCategory: '',
          comment: '',
          currentVatPercentage: '',
          vatCategoryCode: '',
          externalTaxCode: ''
        }
      })
  }
  
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup controlId="accountNumber">
          <Form.Label>Account number</Form.Label>
          <Form.Control type="text" name= {'accountNumber'}  />
        </FormGroup>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select">
            <option value="sales">Sales</option>
            <option value="purchases">Purchases</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="vatPercentage">
          <Form.Label>Vat percentage</Form.Label>
          <Form.Control type="number" name={'vatPercentage'}/>
        </Form.Group>

        <Form.Group controlId="vatCategoryCode">
          <Form.Label>Vat category code</Form.Label>
          <Form.Control type="text" name={'vatCategoryCode'}/>
        </Form.Group>

        <Form.Group controlId="accountName">
          <Form.Label>Account name</Form.Label>
          <Form.Control type="text" name={'accountName'}/>
        </Form.Group>

        <Form.Group controlId="externalTaxCode">
          <Form.Label>External Tax Code</Form.Label>
          <Form.Control type="text" name={'externalTaxCode'}/>
        </Form.Group>

        <Form.Group controlId="externalRevenueClass">
          <Form.Label>External Revenue Class</Form.Label>
          <Form.Control type="text" name={'externalRevenueClass'}/>
        </Form.Group>

        <Form.Group controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control as="textarea" rows="10"/>
        </Form.Group>

        <ButtonToolbar>
          <Button type="submit" variant="primary" onSubmit={this.handleFormSubmit} className="saveButton">Save</Button>
          <Button type="reset" variant="secondary" onAbort={this.handleClearForm} className="cancelButton">Cancel</Button>
        </ButtonToolbar>

      </Form>
  
    );
  }
}

export default FormContainer;