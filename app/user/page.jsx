'use client'
import { getData } from "@/config/db";
import { useUser } from "@/context/user";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function cart() {
  const { user, logout } =  useUser()
  const [order,setOrder] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('api/order/');
      setOrder(data);
    };
  
    fetchData();
  }, []);
  
  return (
    <div className="container">
      <h3 className="border-bottom my-5">Profile</h3>
      <div className="d-flex align-items-center mb-5 justify-content-between">
        <div className="d-flex gap-5">
          <Image
            src="http://localhost:8000/media/media/_lyricalguy_-20240104-0003_GPQhkJw.jpg"
            width={200}
            height={200}
            className="img-fluid rounded-circle"
            alt="user"
          />
          <div>
            <h2>{user.name}</h2>
            <h5 className="text-muted"><b>Email: </b>{user.email}</h5>
            <h5 className="text-muted"><b>Phone No: </b>{user.phone}</h5>
          </div>
        </div>
        <div className="text-center d-flex gap-5">
          <button className="btn btn-outline-dark" >Edit Profile</button>
          <button className="btn btn-outline-danger" onClick={logout}>Sign Out</button>
        </div>
      </div>
      {order.count > 0 ? (
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
        {order.results.filter(o=>{
          return o.user === user.id
        }).map((orderItem, index) => (
          <tr key={orderItem.id}>
            <td>{orderItem.user}</td>
            <td>{orderItem.orderno}</td>
            <td>{orderItem.orderdate}</td>
            <td>{orderItem.deliverydate}</td>
            <td>{orderItem.products.length}</td>
            <td>
              <Link href={`/user/${orderItem.id}`}><button className="btn btn-info mx-3">View</button></Link>
              <button className="btn btn-danger">Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <div>No orders found.</div>
)}

    </div>
  );
}
