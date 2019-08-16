import React from 'react';
import axios from 'axios';
// import {Collapse} from 'reactstrap';
import { connect } from 'react-redux';

import AccountForm from './accountForm';

class AccountsPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    const { onLoad } = this.props;

    axios('http://localhost:4000/articles')
      .then((res) => onLoad(res.data));
  }

  handleDelete(id) {
    const { onDelete } = this.props;

    return axios.delete(`http://localhost:4000/articles/${id}`)
      .then(() => onDelete(id));
  }

  handleEdit(article) {
    const { setEdit } = this.props;

    setEdit(article);
  }

  render() {
    const { accounts } = this.props;

    return (
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            {accounts.map((account) => {
              return (
                <div className="container">
                <ul className="list-group">
                  <li className="list-group-item">
                    <div className="pull-left">
                  {account.accountNumber} - {account.financialAccountCategory} - {account.currentVatPercentage} %({account.vatCategoryCode}) - {account.name}
                  </div>
                  <button onClick={() => this.handleEdit(account)} className="btn btn-primary mx-3">
                        Edit
                      </button>
                      <button onClick={() => this.handleDelete(account.id)} className="btn btn-danger">
                        Delete
                      </button>
                  </li>
      
                </ul>
                <tr>
              <td colSpan="6" className="toggleForm">
                {/* <Collapse isOpen={this.state.collapse}> */}
                    <AccountForm data={account}/>
                {/* </Collapse> */}
              </td>
            </tr>
              </div>
          
       
              )
            })}
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts,
});

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: 'PAGE_LOADED', data }),
  onDelete: id => dispatch({ type: 'DELETE_ACCOUNT', id }),
  setEdit: accounts => dispatch({ type: 'SET_EDIT', accounts }),
});

connect(mapStateToProps, mapDispatchToProps)(AccountsPage);

export default AccountsPage