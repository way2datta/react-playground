import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/customers" component={CustomerListing} />
          <Route path="/books" component={Books} />
        </div>
      </Router>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

function CustomerListing() {
  return <h2>About</h2>;
}

function Books({ match }) {
  return (
    <h1>Books</h1>
    );
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/customers">Customers</Link>
      </li>
      <li>
        <Link to="/books">Books</Link>
      </li>
    </ul>
  );
}

