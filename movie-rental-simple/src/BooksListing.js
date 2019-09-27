import React from "react";
import axios from "axios";

export class BooksListing extends React.Component {
  state = {
    datasource: []
  }

  async componentDidMount() {
    const response = await axios.get("http://localhost:5000/books");
    this.setState({
      datasource: response.data
    });
  }

  render() {
    return (
      <>
        <h1>Books</h1>
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
          <th>Name</th>
          <th>Author</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {
          datasource.map(x => {
            return <tr key={x.id}>
              <td>{x.name}</td>
              <td>{x.authorName}</td>
              <td>{x.status}</td>
            </tr>
          })
        }
      </tbody>
    </table>
  </>
}