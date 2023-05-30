import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCart, deleteCart } from "../redux/action/index";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);

  const dispatch = useDispatch();

  const handleClose = (item) => {
    dispatch(deleteCart(item));
  };
  const tangCart = (item) => {
    dispatch(addCart(item));
  };

  var total = 0;
  const itemList = (item) => {
    total = total + item.price * item.qty;
  };

  const cartItems = (cartItem) => {
    return (
      <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
        <div className="container py-4">
          <button
            onClick={() => handleClose(cartItem)}
            className="btn-close float-end"
            aria-label="Close"
          ></button>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <img
                src={cartItem.image}
                alt={cartItem.title}
                height="200px"
                width="180px"
              />
            </div>
            <div className="col-md-4">
              <h3>{cartItem.title}</h3>
              <p className="lead fw-bold">Giá {cartItem.price}</p>
              <div className="icon_supnav ">
                <i
                  onClick={() => handleClose(cartItem)}
                  className="fa fa-minus me-1 "
                ></i>
                <h5>{cartItem.qty}</h5>
                <i
                  onClick={() => tangCart(cartItem)}
                  className="fa fa-plus me-1 "
                ></i>
              </div>
              <p className="lead fw-bold">
                Tổng tiền {cartItem.qty * cartItem.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3>Your Cart is Empty</h3>
          </div>
        </div>
      </div>
    );
  };

  const button = () => {
    return (
      <div className="container">
        <div className="row">
          <div className=" lead fw-bold bg-light mb-5 w-25 mx-auto">
            {state.map(itemList)}
            Tổng Tiền: {total}$
          </div>
        </div>
        <div className="row">
          <NavLink
            to="/checkout"
            className="btn btn-outline-primary mb-5 w-25 mx-auto"
          >
            Thanh toán
          </NavLink>
        </div>
      </div>
    );
  };

  return (
    <>
      {state.length === 0 && emptyCart()}
      {state.length !== 0 && state.map(cartItems)}
      {state.length !== 0 && button()}
    </>
  );
};

export default Cart;
