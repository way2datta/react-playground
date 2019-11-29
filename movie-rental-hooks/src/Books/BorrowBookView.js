import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

export class BorrowBookView extends React.Component {
  state = {
    book: {},
    selectedCustomer: "",
    customers: []
  };

  async componentDidMount() {
    await this.fetchBook();
    await this.fetchCustomers();
  }

  async fetchBook() {
    const bookId = this.props.match.params.id;
    const response = await axios.get("http://localhost:5000/books/" + bookId);
    this.setState({
      book: response.data
    });
  }

  async fetchCustomers() {
    const response = await axios.get("http://localhost:5000/customers");
    this.setState({
      customers: response.data
    });
  }

  handleCustomerChange = e => {
    this.setState({
      selectedCustomer: e.target.value
    });
  };

  handleBorrowBook = async () => {
    await axios.patch("http://localhost:5000/books/" + this.state.book.id, {
      status: "borrowed",
      customer: this.state.selectedCustomer
    });
    this.props.history.push("/books");
  };

  render() {
    return (
      <>
        <Grid container>
          <h1>Borrow book</h1>
          <Grid item xs={12}>
            <label>Name: </label>
            {this.state.book.name}
          </Grid>
          <Grid item xs={12}>
            <label>Author: </label>
            {this.state.book.authorName}
          </Grid>
          <Grid item xs={12}>
            <label>Status: </label>
            {this.state.book.status}
          </Grid>
          <Grid item xs={12}>
            <label>Customer: </label>{" "}
            <Select
              value={this.state.selectedCustomer}
              onChange={this.handleCustomerChange}
            >
              {this.state.customers.map(x => (
                <MenuItem key={x.id} value={x.firstName + " " + x.lastName}>
                  {x.firstName + " " + x.lastName}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleBorrowBook}
            >
              Borrow
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
}
