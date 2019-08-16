import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class AccountForm extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      name: '',
      accountNumber: '',
      financialAccountCategory: '',
      comment: '',
      currentVatPercentage: '',
      vatCategoryCode: '',
      externalTaxCode: '',
      externalRevenueClass: '',
      financialAccountCategoryOptions: ['sales', 'purchases']
    }


    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.accountToEdit) {
      this.setState(nextProps.accountToEdit);
    }
  }

  handleSubmit(){
    const { onSubmit, accountToEdit, onEdit } = this.props;
    const { accountNumber, externalTaxCode, externalRevenueClass, name, comment,currentVatPercentage, vatCategoryCode, financialAccountCategory } = this.state;
    // const { title, body, author } = this.state;

    if(!accountToEdit) {
      return axios.post('http://localhost:4000/accounts', {
        accountNumber, 
        externalTaxCode, 
        externalRevenueClass, 
        name, 
        comment,
        currentVatPercentage, 
        vatCategoryCode, 
        financialAccountCategory,
        // title,
        // body,
        // author,
      })
        .then((res) => onSubmit(res.data))
        .then(() => this.setState({ accountNumber: '', externalTaxCode: '', externalRevenueClass: '', name: '', comment:'', currentVatPercentage: '', vatCategoryCode: '', financialAccountCategory: ''}));
        // .then(() => this.setState({ title: '', body: '', author: '' }));
    } else {
      return axios.put(`http://localhost:4000/accounts/${accountToEdit.id}`, {
        accountNumber, 
        externalTaxCode, 
        externalRevenueClass, 
        name, 
        comment,
        currentVatPercentage, 
        vatCategoryCode, 
        financialAccountCategory,
        // title,
        // body,
        // author,
      })
        .then((res) => onEdit(res.data))
        .then(() => this.setState({ 
          accountNumber: '', 
          externalTaxCode: '', 
          externalRevenueClass: '', 
          name: '', 
          comment: '',
          currentVatPercentage: '', 
          vatCategoryCode: '', 
          financialAccountCategory: ''
        }));
    }
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { accountToEdit } = this.props;
    const {accountNumber, externalTaxCode, externalRevenueClass, name, comment, currentVatPercentage, vatCategoryCode, financialAccountCategory} = this.state;

    return (
      <div className="col-12 col-lg-6 offset-lg-3">
        <input
          onChange={(ev) => this.handleChangeField('accountNumber', ev)}
          value={accountNumber}
          className="form-control my-3"
          placeholder="Account number"
        />
        <input
          onChange={(ev) => this.handleChangeField('externalTaxCode', ev)}
          value={externalTaxCode}
          className="form-control my-3"
          placeholder="External tax code"
        />
        <input
          onChange={(ev) => this.handleChangeField('externalRevenueClass', ev)}
          value={externalRevenueClass}
          className="form-control my-3"
          placeholder="External revenue class"
        />
        <input
          onChange={(ev) => this.handleChangeField('name', ev)}
          value={name}
          className="form-control my-3"
          placeholder="Name"
        />
        <input
          onChange={(ev) => this.handleChangeField('comment', ev)}
          value={comment}
          className="form-control my-3"
          placeholder="Comment"
        />
        <input
          onChange={(ev) => this.handleChangeField('currentVatPercentage', ev)}
          value={currentVatPercentage}
          className="form-control my-3"
          placeholder="Current vat percentage"
        />
        <input
          onChange={(ev) => this.handleChangeField('vatCategoryCode', ev)}
          value={vatCategoryCode}
          className="form-control my-3"
          placeholder="Vat category code"
        />
        <input
          onChange={(ev) => this.handleChangeField('financialAccountCategory', ev)}
          value={financialAccountCategory}
          className="form-control my-3"
          placeholder="Financial account category"
        />
        <button onClick={this.handleSubmit} className="btn btn-primary float-right">{accountToEdit ? 'Update' : 'Submit'}</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_ARTICLE', data }),
  onEdit: data => dispatch({ type: 'EDIT_ARTICLE', data }),
});

const mapStateToProps = state => ({
  accountToEdit: state.home.accountToEdit,
});

connect(mapStateToProps, mapDispatchToProps)(AccountForm);

export default AccountForm;