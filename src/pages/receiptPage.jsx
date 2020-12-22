import React from "react";
import { useHistory } from "react-router-dom";
import Nav from "../components/nav.jsx";
import useOrder from "../components/useOrder.jsx";
import "./receiptPage.scss";

const ReceiptPage = () => {
  const history = useHistory();
  const {
    getName,
    getRoom,
    gettotalPrice,
    getfreeOffer,
    getoptionalBuy,
    getpickupTime,
    getpickupDate,
    setpaymentMethod,
    currentOrderedItems,
  } = useOrder();
  const goHome = () => {
    setpaymentMethod("bar");
    history.push("/");
  };
  if (getName === "") {
    goHome();
    return 0;
  } else {
    return (
      <div id="receipt-page">
        <Nav />
        <div className="receipt-box mb-1 mt-4">
          <h3 className="mb-1">
            Thank youuu! Now your order is sent to us and we will confirm as
            soon as possible to your email!
          </h3>
          <div className="box">
            <h4>
              Customer: {getName} in Room: {getRoom} <br />
            </h4>
            <h5>Here are your orders:</h5>
            <ul>
              {currentOrderedItems.map((orderedItem, index) => (
                <li key={index}>
                  {orderedItem.quantity} {orderedItem.size} portion with topping{" "}
                  {orderedItem.topping}
                </li>
              ))}
            </ul>
            <h4 className="mt-1">
              {getfreeOffer !== 0
                ? "You have " +
                  getfreeOffer +
                  " Glühwein for free" +
                  ". Please bring your cup along to get the wine."
                : ""}
              <br />
              {getoptionalBuy !== 0
                ? "You have bought " + getoptionalBuy + " cups of wine 🥛"
                : ""}
            </h4>
            <h4 className="mt-1">Total price: {gettotalPrice} €</h4>
            <h3 className="mt-1">And please don't forget</h3>
            <p>Your pickup Time: {getpickupTime}</p>
            <p>Your pickup Date: {getpickupDate}</p>
            <h4 className="mt-1">
              Please be sure that you can stay at home and wait for us to come!{" "}
              <br />
              we will ring the bell 3 times in max 3min waiting!{" "}
            </h4>
          </div>
        </div>
        <button
          className="btn-primary"
          style={{ padding: "0.8rem 1.5rem 1rem 1.5rem" }}
          onClick={() => goHome()}
        >
          Back to first page{" "}
          <span role="img" aria-label="heart">
            💖😘
          </span>
        </button>
      </div>
    );
  }
};

export default ReceiptPage;
