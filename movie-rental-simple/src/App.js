import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./Home";
import { CustomersListing } from "./CustomersListing";
import { BooksListing } from "./BooksListing";
import { Header } from "./Header";
import Container from '@material-ui/core/Container';
import './App.css'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Container fixed>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/customers" component={CustomersListing} />
          <Route path="/books" component={BooksListing} />
        </Container>
      </Router>
    );
  }
}


