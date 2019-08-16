import React, {Component} from 'react';

export default class AccountForm extends Component {
  default = {
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

  constructor(props) {
    super(props);
    
    // this.state = (this.props.data !== undefined) ? this.props.data : this.default
    this.state = {
      
      newAccount: {
      name: '',
      accountNumber: '',
      financialAccountCategory: '',
      comment: '',
      currentVatPercentage: '',
      vatCategoryCode: '',
      externalTaxCode: '',
      externalRevenueClass: ''},

      financialAccountCategoryOptions: ['sales', 'purchases'],
      formSubmitted: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    };

    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      
      this.setState({[name]: value});
    }
  
    handleSubmit(event) {
      event.preventDefault();

      let data = this.state
      console.log(data);
      fetch("http://localhost:4000/accounts", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            })
            .then(response => response.json())
            .then(data => this.setState({responsData: data}))
            .catch(error => console.log(error));

      this.setState({formSubmitted: true});
      var _this = this.props.parrent;
      console.log(_this);
      _this.setState(state => ({ collapse: !state.collapse }));
    }

    handleClearForm(e) {
      console.log(`Reset Form State: ${e}`)
      this.setState(this.default)
      console.log(`State has bin reseted: ${this.state}`)

  }

  render() {
    let accountToEdit = this.props.data;
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="form-group row">
          <label for="accountNumber" className="col-form-label col-sm-4">Account number</label>
          <input className="form-control col-md-6" name="accountNumber" type="number" value={this.state.accountNumber}
            onChange={this.handleInputChange} min="1000" max="9999" required/>
        </div>

        <div className="form-group row">
        <label for="financialAccountCategory" className="col-form-label col-sm-4">Category</label>
          <select className="form-control col-md-6" name="financialAccountCategory" type="select"
            value={this.state.financialAccountCategory} onChange={this.handleInputChange} required>
            {
            this.state.financialAccountCategoryOptions.map(item =>(
            <option value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="form-group row">
          <label for="currentVatPercentage" className="col-form-label col-sm-4">Current vat percentage</label>
          <input className="form-control col-md-6" name="currentVatPercentage" type="number" min="0" max="100" value={this.state.currentVatPercentage}
            onChange={this.handleInputChange} required />
        </div>

        <div className="form-group row">
          <label for="vatCategoryCode" className="col-form-label col-sm-4">Vat category code</label>
          <input className="form-control col-md-6" name="vatCategoryCode" type="text" value={this.state.vatCategoryCode} pattern="[A-Z]{1}"
            onChange={this.handleInputChange} required/>
        </div>

        <div className="form-group row">
          <label for="externalTaxCode" className="col-form-label col-sm-4">External tax code</label>
          <input className="form-control col-md-6" name="externalTaxCode" type="text" value={this.state.externalTaxCode}
            onChange={this.handleInputChange} />
        </div>

        <div className="form-group row">
          <label for="externalRevenueClass" className="col-form-label col-sm-4">External revenue className</label>
          <input className="form-control col-md-6" name="externalRevenueClass" type="text" value={this.state.externalRevenueClass}
            onChange={this.handleInputChange} /> </div>

        <div className="form-group row">
         <label for="name" className="col-form-label col-sm-4">Name</label>
          <input className="form-control col-md-6" name="name" type="text" pattern="[A-Za-z]{1,30}" value={this.state.name}
            onChange={this.handleInputChange} required/> </div>

        <div className="form-group row">
        <label for="comment" className="col-form-label col-sm-4">Comment</label>
          <input className="form-control col-md-6" name="comment" type="textarea" value={this.state.comment}
            onChange={this.handleInputChange} />
        </div>

        <div className="row pull-right">
            <button type="submit" className="btn btn-sm btn-secondary">Cencel</button>
            <button onClick={this.handleSubmit} className="btn btn-primary float-right">{accountToEdit ? 'Update' : 'Submit'}</button>
            <button type="submit" className="submit btn btn-sm btn-primary">Save</button>
        </div>
        <div className="row pull-left">
              
        </div>

      </form>
    );
  }
}