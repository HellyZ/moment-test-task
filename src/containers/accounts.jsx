import React, {Component, Fragment} from 'react';  

/* Import Components */
import '../index.css'
import Account from '../components/Account';
import  { Collapse } from 'reactstrap';
import AccountForm from '../containers/AccountForm';

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
        <div className="panel-heading">
          <div className="panel-title">
            <button className="newButton btn btn-sm btn-link" onClick={this.handleClick}>
            {/* <a href="#" onClick={this.handleClick}> material-icons*/}
                <i className="material-icons">add_circle_outline</i> 
                  New Account 
            </button>
            <div className="table-name">
              Bookkeeping accounts
            </div>
          </div>
        </div>
      <Collapse isOpen={this.state.isToggleOn}>
        <AccountForm />
      </Collapse>

      </div>
    );
  }
}

class DeleteAccountButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
 
handleClick = (e) => {
    console.log('this is:', this);
    console.log('event:', e);

  }

  render() {
    return (
      <button className="btn btn-danger delete" onClick={this.handleClick}>
        <span class="oi oi-delete"></span> Del
      </button>
    );
  }
}

class AccountsList extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      collapse: false
    }
    this.toggleNewAccountForm = this.toggleNewAccountForm.bind(this);
  };    

  toggleNewAccountForm() {
    document.getElementsByClassName("hideToggleForm").
    this.setState(state => ({ collapse: !this.state.collapse }));
  }

  componentDidMount() {
    fetch("http://localhost:4000/accounts")
    .then(response => response.json())
    .then(data => this.setState({data: data}));
  };

  render() {
    return (
      <div>
        <NewAccountFormComponent />
        <table className="table border">
          <tbody>
      {
        this.state.data.map(item =>(
        <Fragment key={item.id}>
          <Account data={item} deleteAccountButton={<DeleteAccountButton id={item.id}/>}/>
        </Fragment>
        ))}
      </tbody>
      </table>
      </div>

    )}}


export default AccountsList