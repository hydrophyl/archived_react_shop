import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../components/nav.jsx";
import useOrder from "../components/useOrder.jsx";
import "./paymentPage.scss";

const PaymentPage = () => {
  const {
    getName,
    pushOrder,
    setpaymentMethod,
    getpaymentMethod,
    gettotalPrice,
  } = useOrder();
  const history = useHistory();

  useEffect(() => {
    const checkPayment = async () => {
      if (getpaymentMethod === "paypal") {
        await pushOrder();
        history.push("/paypal");
      }
      if (getpaymentMethod === "cash") {
        await pushOrder();
        history.push("/receipt");
      }
    };
    checkPayment();
  }, [getpaymentMethod]);

  const goHome = () => {
    setpaymentMethod("bar");
    history.push("/");
  };

  if (getName === "") {
    goHome();
    return 0;
  } else {
    return (
      <div id="payment-page">
        <Nav />
        <h2 className="mt-4">
          Please let us know <br /> how you can help us share the joys! ❤
        </h2>
        <h2 className="mt-1">Your order price is totally: {gettotalPrice}€</h2>
        <h3>Please choose the payment option that you prefer ❤</h3>
        <div className="btn-group">
          <button
            className="btn-secondary"
            value="cash"
            onClick={(e) => setpaymentMethod(e.target.value)}
          >
            Pay with cash/coins at pickup
          </button>
          <button
            className="btn-secondary"
            value="paypal"
            onClick={(e) => setpaymentMethod(e.target.value)}
          >
            Pay with Paypal
          </button>
        </div>
      </div>
    );
  }
};

export default PaymentPage;
