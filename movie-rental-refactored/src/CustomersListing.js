import React from "react";
import axios from "axios";
import { Gridview } from "./Gridview";

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
        <Gridview
          datasource={this.state.datasource}
          headers={["First name", "Last name", "Email"]}
          properties={["firstName", "lastName", "email"]}
        />
      </>);
  }
}