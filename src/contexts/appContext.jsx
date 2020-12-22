import React, { useState } from "react";

const Order = React.createContext([{}, () => {}]);

const OrderProvider = (props) => {
  const [state, setState] = useState({
    name: "",
    room: "",
    email: "",
    totalPrice: 0,
    freeOffer: 0,
    optionalBuy: 0,
    paymentMethod: "bar",
    pickupTime: "18:00-19:00",
    pickupDate: "19/12",
    orderedItems: [],
  });
  return (
    <Order.Provider value={[state, setState]}>{props.children}</Order.Provider>
  );
};

export { Order, OrderProvider };
