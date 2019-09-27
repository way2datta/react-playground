import React from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

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
  const classes = useStyles();

  if (!datasource.length) {
    return <h2>No record found.</h2>
  }

  return <>
    <Paper className={classes.paper}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
          <TableCell>First name</TableCell>
          <TableCell>Last name</TableCell>
          <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          datasource.map(x => {
            return <tr key={x.id}>
              <TableCell>{x.firstName}</TableCell>
              <TableCell>{x.lastName}</TableCell>
              <TableCell>{x.email}</TableCell>
            </tr>
          })
        }
        </TableBody>
      </Table>
    </Paper>
  </>
}