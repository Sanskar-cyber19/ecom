"use client";
import { useCart } from "@/context/cart";
import Link from "next/link";
import { FaDashcube } from "react-icons/fa";

export default function Page() {  // Changed to uppercase
  const { state, removeItem,allClear } = useCart();  // Assuming removeItem is part of useCart
  return (
    <div className="container">
      {JSON.stringify(state,null,2)}
      <div className="table-container"> {/* Fixed typo */}
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Rate</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.items && state.items.map((c, index) => (
              <tr key={c.id}>
                <td data-label="Sr.No">{index + 1}</td>
                <td data-label="Product Name">{c.name}</td>
                <td data-label="Price">{c.price}.00</td>
                <td data-label="Quantity">{c.quantity}</td>
                <td data-label="Amount">{c.price * c.quantity}.00</td>
                <td><FaDashcube onClick={() => removeItem(c.id)} /></td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td>Total Item:</td>
              <td>{state.totalItems}</td>
              <td>Total Amount:</td>
              <td>{state.totalAmount}.00</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <Link href="cart/checkout"><button className="btn btn-primary">Place Order</button></Link>
        <button className="btn btn-danger mx-5" onClick={()=>allClear()}>All Clear</button>
      </div>
    </div>
  );
}
