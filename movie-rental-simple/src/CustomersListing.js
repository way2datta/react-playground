import React from "react";
import axios from "axios";

export class CustomersListing extends React.Component {
  state = {
    datasource: []
  }

  async componentDidMount() {
    const response = await axios.get("http://localhost:5000/customers");
    this.setState({
      datasource: response.data
    });
  }

  render() {
    return (
      <>
        <h1>Customers</h1>
        <Gridview datasource={this.state.datasource} />
      </>);
  }
}

function Gridview({ datasource }) {
  if (!datasource.length) {
    return <h2>No record found.</h2>
  }

  return <>
    <table>
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {
          datasource.map(x => {
            return <tr key={x.id}>
              <td>{x.firstName}</td>
              <td>{x.lastName}</td>
              <td>{x.email}</td>
            </tr>
          })
        }
      </tbody>
    </table>
  </>
}