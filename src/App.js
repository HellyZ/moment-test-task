import React, { Component }from 'react';
import AccountsList from './containers/accounts';
import  { Collapse } from 'reactstrap';
import AccountForm from './containers/AccountForm';

import './App.css';


class NewAccountFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {  
    return (
      <div className="container-fluid">
            <button onClick={this.handleClick}><i className="material-icons">add_box</i> New Account </button>
      <Collapse isOpen={this.state.isToggleOn}>
        <AccountForm />
      </Collapse>
      </div>
    );
  }
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {newFormCollapse: false,
    accounts: []};
    
    this.toggleNewAccountForm = this.toggleNewAccountForm.bind(this);

  };

  componentDidMount(){
    const accounts = []
    fetch("http://localhost:4000/accounts")
    .then(response => response.json())
    .then(data => accounts.concat(data));
    this.setState({accounts: accounts})
  }

  toggleNewAccountForm() {
    this.setState({newFormCollapse: !this.state.newFormCollapse});
  }

  render() {
    console.log(this.state)
    return (
      <div className="col-md-6 offset-md-3">
        {/* <NewAccountFormComponent /> */}
        <AccountsList data={this.state.accounts}/>
      </div>
    );
  }
}

export default App;
