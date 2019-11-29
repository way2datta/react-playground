import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

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

export function Gridview({
  datasource,
  headers,
  properties,
  actions,
  handleReturnBook,
  handleBorrowBook
}) {
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
              {headers.map(header => (
                <TableCell>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {datasource.map(model => {
              return (
                <TableRow key={model.id}>
                  {properties &&
                    properties.map(propName => (
                      <TableCell>{model[propName]}</TableCell>
                    ))}
                  {actions &&
                    actions.map(action => (
                      <TableCell>{action(model)}</TableCell>
                    ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
