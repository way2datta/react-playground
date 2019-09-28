import React from "react";
import axios from "axios";
import { Gridview } from "./Gridview";
import Button from "@material-ui/core/Button";

export class BooksListing extends React.Component {
  state = {
    datasource: []
  };

  async componentDidMount() {
    await this.fetchAllBooks();
  }

  handleReturnBook = async (event, id) => {
    await axios.patch("http://localhost:5000/books/" + id, {
      status: "available",
      customer: ""
    });
    await this.fetchAllBooks();
  };

  handleBorrowBook = (event, id) => {
    this.props.history.push("/books/" + id + "/borrow");
  };

  async fetchAllBooks() {
    const response = await axios.get("http://localhost:5000/books");
    this.setState({
      datasource: response.data
    });
  }

  render() {
    const actions = [
      model => {
        return model.status === "available" ? (
          <Button
            variant="contained"
            color="primary"
            onClick={e => this.handleBorrowBook(e, model.id)}
          >
            Borrow
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={e => this.handleReturnBook(e, model.id)}
          >
            Return
          </Button>
        );
      }
    ];

    return (
      <>
        <h1>Books</h1>
        <Gridview
          datasource={this.state.datasource}
          handleReturnBook={this.handleReturnBook}
          handleBorrowBook={this.handleBorrowBook}
          headers={["Name", "Author", "Status", "Customer", "Action"]}
          properties={["name", "authorName", "status", "customer"]}
          actions={actions}
        />
      </>
    );
  }
}
