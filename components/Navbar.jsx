import Link from "next/link";
import { getData } from "../config/db";
import { useEffect, useState } from "react";
import {
  FaCartArrowDown,
  FaHome,
  FaUser,
  FaCaretDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useCart } from "@/context/cart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility
  const [data, setData] = useState([]); // State to hold category data
  const { state } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData("api/category/");
      setData(response.category);
      console.log(response)
    };
    fetchData();
  }, []);

  return (
    <header
      className="navbar navbar-expand-md navbar-light px-lg-5"
    >
      <div className="container-fluid">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <h4>Company Name</h4>
        </Link>

        <button
          className="navbar-toggler"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link href="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                href="#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={isOpen}
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                {data ? data.map((c) => (
                  <li key={c.id}>
                    <Link href={`/Category/${c.id}`} className="dropdown-item">
                      {c.name}
                    </Link>
                  </li>
                )) : (
                  <li>Loading...</li>
                )}
              </ul>
            </li>
            <li className="nav-item">
              <Link href="/products" className="nav-link">
                Products
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <Link
              href="/cart"
              className="nav-link text-black mx-lg-5"
              aria-label="Cart"
            >
              <div className="position-relative">
                <FaCartArrowDown size="1.3rem" />
                {state.totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {state.totalItems}
                  </span>
                )}
              </div>
            </Link>
            <Link
              href="/user"
              className="nav-link text-black"
              aria-label="User"
            >
              <FaUser size="1.3rem" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
