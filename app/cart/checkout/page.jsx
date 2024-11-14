"use client";
import { useCart } from "@/context/cart";
import { useUser } from "@/context/user";
import { useState } from "react";
import { FaDashcube } from "react-icons/fa";

export default function Page() {  // Changed to uppercase
  const { state } = useCart();  // Assuming removeItem is part of useCart
  const { user,addOrder } = useUser()
  const [address,setAddress] = useState({
    address1:'',
    address2:'',
    state:'',
    city:'',
    pincode:''
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    addOrder(state.items,user.id,address)
};
  return (
    <div className="container my-5">
    <div className="row g-5">
      <div className="col-md-5 col-lg-4 order-md-last">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-primary">Your cart</span>
          <span className="badge bg-primary rounded-pill">{state.totalItems}</span>
        </h4>
        <ul className="list-group mb-3">
          {state.totalItems > 0 ? state.items.map((c)=>(
            <li className="list-group-item d-flex justify-content-between lh-sm" key={c.id}>
            <div>
              <h6 className="my-0">{c.name}</h6>
              <small className="text-muted">Quantity: {c.quantity}</small>
            </div>
            <span className="text-muted">{c.price * c.quantity}.00</span>
          </li>
          )) : (<li className="list-group-item">
                No Product in Cart
            </li>)}
          <li className="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>{state.totalAmount}.00</strong>
          </li>
        </ul>
      </div>
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">Billing address</h4>
        <form className="needs-validation" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="firstName" className="form-label">First name</label>
              <input type="text" className="form-control" id="firstName" placeholder="" value={user.name} required readOnly/>
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="username" className="form-label">Phone No</label>
              <div className="input-group has-validation">
                <input type="text" className="form-control" id="username" placeholder="Phone No" value={user.phone} required readOnly/>
              <div className="invalid-feedback">
                  Your username is required.
                </div>
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" value={user.email} required readOnly/>
              <div className="invalid-feedback">
                Please enter a valid email address htmlFor shipping updates.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" value={address.address1} onChange={(e)=>setAddress({...address,address1:e.target.value})} placeholder="1234 Main St" required/>
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="address2" className="form-label">Address 2 <span className="text-muted">(Optional)</span></label>
              <input type="text" className="form-control" id="address2" value={address.address2} onChange={(e)=>setAddress({...address,address2:e.target.value})} placeholder="Apartment or suite"/>
            </div>

            <div className="col-md-5">
            <label htmlFor="address2" className="form-label">City / Village</label>
              <input type="text" className="form-control" id="address2" value={address.city} onChange={(e)=>setAddress({...address,city:e.target.value})} placeholder="City" required/>
            </div>

            <div className="col-md-4">
            <label htmlFor="address2" className="form-label">State</label>
              <input type="text" className="form-control" id="address2" value={address.state} onChange={(e)=>setAddress({...address,state:e.target.value})} placeholder="State" required/>
            </div>

            <div className="col-md-3">
              <label htmlFor="zip" className="form-label">Zip</label>
              <input type="text" className="form-control" id="zip" placeholder="" value={address.pincode} onChange={(e)=>setAddress({...address,pincode:e.target.value})} required/>
              <div className="invalid-feedback">
                Zip code required.
              </div>
            </div>
          </div>

          <hr className="my-4"/>

          <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
        </form>
      </div>
    </div>
    </div>
  );
}
