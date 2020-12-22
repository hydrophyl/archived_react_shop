import { useContext } from "react";
import { Order } from "../contexts/appContext.jsx";
import { GAU_QUY_TOKEN, CHANNEL_ID } from "../pages/constant";
const { TelegramClient } = require("messaging-api-telegram");

const useOrder = () => {
  const client = new TelegramClient({
    accessToken: GAU_QUY_TOKEN,
  });
  const [state, setState] = useContext(Order);
  const currentOrderedItems = state.orderedItems;
  const getOrder = state;
  const getName = state.name;
  const getRoom = state.room;
  const getEmail = state.email;
  const gettotalPrice = state.totalPrice;
  const getfreeOffer = state.freeOffer;
  const getoptionalBuy = state.optionalBuy;
  const getpickupTime = state.pickupTime;
  const getpickupDate = state.pickupDate;
  const getpaymentMethod = state.paymentMethod;
  const exportOrder = JSON.stringify(getOrder, undefined, 4);
  const importShoppingCart = async (prop) => {
    await setState((state) => ({ ...state, orderedItems: prop }));
  };
  const pushOrder = async () => {
    try {
      await client.sendMessage(CHANNEL_ID, exportOrder);
    } catch (error) {
      console.log(error);
    }
  };

  const setpickupTime = (prop) => {
    setState((state) => ({ ...state, pickupTime: prop }));
  };

  const setpickupDate = (prop) => {
    setState((state) => ({ ...state, pickupDate: prop }));
  };

  const setpaymentMethod = (prop) =>
    setState((state) => ({ ...state, paymentMethod: prop }));

  const settotalPrice = (prop) =>
    setState((state) => ({ ...state, totalPrice: prop }));

  const setAktion = (prop) =>
    setState((state) => ({ ...state, freeOffer: prop }));

  const setOptionalBuy = (prop) =>
    setState((state) => ({ ...state, optionalBuy: prop }));

  const addInfos = (props) => {
    setState((state) => ({
      ...state,
      name: props.name,
      email: props.email,
      room: props.room,
    }));
  };

  return {
    currentOrderedItems,
    importShoppingCart,
    getOrder,
    addInfos,
    getName,
    getRoom,
    getEmail,
    getfreeOffer,
    getoptionalBuy,
    pushOrder,
    setAktion,
    setOptionalBuy,
    getpickupTime,
    setpickupTime,
    getpickupDate,
    setpickupDate,
    getpaymentMethod,
    setpaymentMethod,
    settotalPrice,
    gettotalPrice,
  };
};

export default useOrder;
