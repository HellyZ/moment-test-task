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
    
    this.state = (this.props.data !== undefined) ? this.props.data : this.default

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    };

    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({[name]: value});
    }
  
    handleSubmit(event) {
      alert('Отправленное имя: ' + this.state);
      event.preventDefault();

      let data = this.state

      fetch("http://localhost:4000", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

    handleClearForm(e) {
      console.log(`Reset Form State: ${e}`)
      this.setState(this.default)
      console.log(`State has bin reseted: ${this.state}`)

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="form-group row">
          <label for="accountNumber" class="col-form-label col-sm-4">Account number</label>
          <input class="form-control col-sm-8" name="accountNumber" type="text" value={this.state.accountNumber}
            onChange={this.handleInputChange} />
        </div>

        <div class="form-group row">
        <label for="financialAccountCategory" class="col-form-label col-sm-4">Category</label>
          <select class="form-control col-sm-8" name="financialAccountCategory" type="select"
            value={this.state.financialAccountCategory} onChange={this.handleInputChange}>
            {
            this.state.financialAccountCategoryOptions.map(item =>(
            <option value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div class="form-group row">
          <label for="currentVatPercentage" class="col-form-label col-sm-4">Current vat percentage</label>
          <input class="form-control col-sm-8" name="currentVatPercentage" type="number" value={this.state.currentVatPercentage}
            onChange={this.handleInputChange} />
        </div>

        <div class="form-group row">
          <label for="vatCategoryCode" class="col-form-label col-sm-4">Vat category code</label>
          <input class="form-control col-sm-8" name="vatCategoryCode" type="text" value={this.state.vatCategoryCode}
            onChange={this.handleInputChange} />
        </div>

        <div class="form-group row">
          <label for="externalTaxCode" class="col-form-label col-sm-4">External tax code</label>
          <input class="form-control col-sm-8" name="externalTaxCode" type="text" value={this.state.externalTaxCode}
            onChange={this.handleInputChange} />
        </div>

        <div class="form-group row">
          <label for="externalRevenueClass" class="col-form-label col-sm-4">External revenue class</label>
          <input class="form-control col-sm-8" name="externalRevenueClass" type="text" value={this.state.externalRevenueClass}
            onChange={this.handleInputChange} /> </div>

        <div class="form-group row">
         <label for="name" class="col-form-label col-sm-4">Name</label>
          <input class="form-control col-sm-8" name="name" type="text" value={this.state.name}
            onChange={this.handleInputChange} /> </div>

        <div class="form-group row">
        <label for="comment" class="col-form-label col-sm-4">Comment</label>
          <input class="form-control col-sm-8" name="comment" type="textarea" value={this.state.comment}
            onChange={this.handleInputChange} />
        </div>

        <div class="row">
            <button type="submit" class="btn btn-secondary mb-2">Cencel</button>
            <button type="submit" class="btn btn-primary mb-2">Save</button>
        </div>

      </form>
    );
  }
}