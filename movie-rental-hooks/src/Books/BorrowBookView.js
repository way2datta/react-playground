import React, { useState, useEffect } from 'react';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

export function BorrowBookView(props) {
  const [book, setBook] = useState({});
  const [selectedCustomer, setCustomer] = useState("");
  const [customers, setCustomers] = useState([]);
  const bookId = props.match.params.id;

  useEffect(() => {
    async function fetchBook() {
      const response = await axios.get("http://localhost:5000/books/" + bookId);
      setBook(response.data);
    }

    async function fetchCustomers() {
      const response = await axios.get("http://localhost:5000/customers");
      setCustomers(response.data);
    }
    fetchBook();
    fetchCustomers();    
  }, [bookId]);
 
  const handleCustomerChange = e => {
    setCustomer(e.target.value);
  };

  const handleBorrowBook = async () => {
    await axios.patch("http://localhost:5000/books/" + book.id, {
      status: "borrowed",
      customer: selectedCustomer
    });
    props.history.push("/books");
  };

  return (
    <>
      <Grid container>
        <h1>Borrow book</h1>
        <Grid item xs={12}>
          <label>Name: </label>
          {book.name}
        </Grid>
        <Grid item xs={12}>
          <label>Author: </label>
          {book.authorName}
        </Grid>
        <Grid item xs={12}>
          <label>Status: </label>
          {book.status}
        </Grid>
        <Grid item xs={12}>
          <label>Customer: </label>{" "}
          <Select
            value={selectedCustomer}
            onChange={handleCustomerChange}
          >
            {customers.map(x => (
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
            onClick={handleBorrowBook}
          >
            Borrow
            </Button>
        </Grid>
      </Grid>
    </>
  );
}
