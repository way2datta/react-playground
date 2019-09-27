import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 650
  }
}));

export class BooksListing extends React.Component {
  state = {
    datasource: []
  };

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
      </>
    );
  }
}

function Gridview({ datasource }) {
  const classes = useStyles();

  if (!datasource.length) {
    return <h2>No record found.</h2>;
  }

  return (
    <>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datasource.map(x => {
              return ( 
                <TableRow key={x.id}>
                  <TableCell>{x.name}</TableCell>
                  <TableCell>{x.authorName}</TableCell>
                  <TableCell className="text-capitalize">{x.status}</TableCell>
                  <TableCell>{x.customer || "--"}</TableCell>
                  <TableCell>
                    {x.status === "available" ? (
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        Borrow
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        Return
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
