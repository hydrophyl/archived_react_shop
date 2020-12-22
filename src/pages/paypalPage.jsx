import React from "react";
import { useHistory } from "react-router-dom";
import Nav from "../components/nav.jsx";
import useOrder from "../components/useOrder.jsx";

const PaypalPage = () => {
  const history = useHistory();
  const { gettotalPrice, getpickupTime, getpickupDate } = useOrder();
  return (
    <div id="paypal-page" style={{ padding: "0 0.5rem" }}>
      <Nav />
      <h2 className="mt-4 mb-1">
        Great! We have received your order! <br /> You chose payment method as
        PayPal so please do as follow to make sure that your payment is legit!{" "}
        <span role="img" aria-label="heart">
          🤞
        </span>
      </h2>
      <h3>
        Please transfer this amount of money to my PayPal, which is:{" "}
        <span style={{ color: "red" }}> {gettotalPrice}€ </span>{" "}
      </h3>
      <h4>
        Please add some following information with the transaction:{" "}
        <span style={{ color: "red" }}> "yourName, yourRoom, yourEmail" </span>
        ,which you filled in the first page! Please come back when you're
        finished{" "}
      </h4>
      <h4 className="mt-1">Here is my paypal.me link: </h4>
      <a
        className="btn-secondary"
        href="https://paypal.me/dnguyenhnde"
        rel="noopener noreferrer"
        target="_blank"
        style={{ background: "#0096c7", fontSize: "1.2rem" }}
      >
        paypal.me/dnguyenhnde
      </a>
      <h5>
        Note that: Until your chosed pickup time {getpickupTime} on{" "}
        {getpickupDate} but we can't confirm per PayPal that you are already
        paid, we can't delivery the order to your place!
      </h5>

      <h5>
        All your information will be safe and deleted after we finished on
        20/12/2020
      </h5>

      <button
        className="btn-primary mt-1"
        onClick={() => history.push("/receipt")}
        style={{ padding: "0.7rem 10px 1rem 10px" }}
      >
        Go to receipt page
      </button>
    </div>
  );
};

export default PaypalPage;
