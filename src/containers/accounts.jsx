import React, {Component, Fragment} from 'react';  

/* Import Components */
import '../index.css'
import Account from '../components/Account';



class AccountsList extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }

  };
  componentDidMount() {
    fetch("http://localhost:4000/accounts")
    .then(response => response.json())
    .then(data => this.setState({data: data}));
  };
 
  render() {
    return (
      <div>
        <table className="table border">
          <tbody>
      {
        this.state.data.map(item =>(
        <Fragment key={item.id}>
          <Account data={item}/>
        </Fragment>
        ))}
      </tbody>
      </table>
      </div>

    )}}


export default AccountsList