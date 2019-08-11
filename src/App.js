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
            <a href="#" onClick={this.handleClick}><i className="material-icons">add_box</i> New Account </a>
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

    this.state = {collapse: false };
    
    this.toggleNewAccountForm = this.toggleNewAccountForm.bind(this);

  };

  toggleNewAccountForm() {
    this.setState(state => ({ collapse: !this.state.collapse }));
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <NewAccountFormComponent/>
        <AccountsList />
      </div>
    );
  }
}

export default App;
