import React from "react";
import { Link } from "react-router-dom";
export function Header() {
  return (<ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/customers">Customers</Link>
    </li>
    <li>
      <Link to="/books">Books</Link>
    </li>
  </ul>);
}
