'use client'

import { useAdmin } from "@/context/admin"

export default function page(){
    const { admin,order } = useAdmin()
    return(
        <div>
            <div style={{ width: '100%', overflowX: 'auto' }}>
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Order No.</th>
          <th>Order Date</th>
          <th>Delivery Date</th>
          <th>Items</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {order.map((orderItem, index) => (
          <tr key={orderItem.id}>
            <td>{orderItem.user}</td>
            <td>{orderItem.orderno}</td>
            <td>{orderItem.orderdate}</td>
            <td>{orderItem.deliverydate}</td>
            <td>{orderItem.products.length}</td>
            <td>
              <button className="btn btn-info">View</button>
              <button className="btn btn-danger">Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
        <p>this is he admin page</p>
        </div>
    )
}