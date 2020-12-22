import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../components/nav.jsx";
import useOrder from "../components/useOrder.jsx";
import "./orderPage.scss";

const OrderPage = () => {
  const history = useHistory();
  const {
    importShoppingCart,
    setAktion,
    getfreeOffer,
    getoptionalBuy,
    getName,
    settotalPrice,
    gettotalPrice,
    currentOrderedItems,
  } = useOrder();
  const [product, setProduct] = useState({
    size: "",
    topping: "puderzucker",
    quantity: 1,
  });
  const [shoppingCart, setShoppingCart] = useState([]);
  const [isSizeChosed, setIsSizeChosed] = useState(false);

  const addToCart = (prop) => {
    if (product.size !== "") {
      setShoppingCart((shoppingCart) => [...shoppingCart, prop]);
      setProduct({ ...product, size: "", topping: "puderzucker", quantity: 1 });
      setIsSizeChosed(false);
    }
  };

  const setItem = (e) => {
    if (product.size === "") {
      setProduct({ ...product, size: e.target.value });
      setIsSizeChosed(true);
    }
    if (product.size !== "" && product.topping === "puderzucker") {
      setProduct({ ...product, topping: e.target.value });
      setIsSizeChosed(false);
    } else {
      return 0;
    }
  };

  //For 2 big portion -> +1 Glühwein
  //For 3 small portion -> +1 Glühwein
  const setfreeOfferN = () => {
    /* let smallN = 0;
    let bigN = 0;
    shoppingCart.map((item, index) => {
      smallN = item.size === "small" ? smallN + item.quantity : smallN;
      bigN = item.size === "big" ? bigN + item.quantity : bigN;
      return { smallN, bigN };
    });
    const freeOfferN = Math.floor(smallN / 3) + Math.floor(bigN / 2); */
    const freeOfferN = Math.floor(gettotalPrice / 6);
    setAktion(freeOfferN);
  };

  const incQuantity = () => {
    setProduct({ ...product, quantity: (product.quantity += 1) });
  };
  const decQuantity = () => {
    if (product.quantity > 1) {
      setProduct({ ...product, quantity: (product.quantity += -1) });
    } else {
      return 0;
    }
  };

  const clearProduct = () => {
    setProduct({ ...product, size: "", topping: "puderzucker", quantity: 1 });
    setIsSizeChosed(false);
  };

  let listOrders = currentOrderedItems;
  let sum = 0;
  const calcPrice = (item) => {
    const price = item.topping === "puderzucker" ? 0 : 0.5;
    if (item.size === "big") {
      sum += item.quantity * 3 + item.quantity * price + getoptionalBuy;
    } else if (item.size === "small") {
      sum += item.quantity * 2 + item.quantity * price + getoptionalBuy;
    }
  };
  listOrders.forEach(calcPrice);

  useEffect(() => {
    const updateOrderedItems = async () => {
      settotalPrice(sum);
      importShoppingCart(shoppingCart);
    };
    updateOrderedItems();
    setfreeOfferN();
  }, [shoppingCart, sum, gettotalPrice]);

  if (getName === "") {
    history.push("/");
    return 0;
  } else {
    return (
      <div id="order-page">
        <Nav />
        <h2 className="mt-4 mb-1">
          {!isSizeChosed && product.topping === "puderzucker"
            ? "Please choose size"
            : isSizeChosed && product.topping === "puderzucker"
            ? "Please choose topping or click Add to Cart🔻 when you just need sugar powder"
            : "Press Add to Cart"}
          <span role="img" aria-label="heart">
            😘
          </span>
        </h2>
        <div className="mb-1">
          <button
            value={!isSizeChosed ? "small" : "chocolate"}
            onClick={(e) => {
              setItem(e);
            }}
            className="btn-product mr-1"
            style={
              !isSizeChosed
                ? {
                    backgroundImage:
                      "url(" + require("../statics/schmalzkuchen-sm.png") + ")",
                  }
                : {
                    backgroundImage:
                      "url(" + require("../statics/chocolate.png") + ")",
                  }
            }
          >
            {!isSizeChosed ? "small(2€)" : "chocolate (0.5€)"}
          </button>
          <button
            value={!isSizeChosed ? "big" : "nutella"}
            onClick={(e) => {
              setItem(e);
            }}
            className="btn-product"
            style={
              !isSizeChosed
                ? {
                    backgroundImage:
                      "url(" +
                      require("../statics/schmalzkuchen-big.png") +
                      ")",
                  }
                : {
                    backgroundImage:
                      "url(" + require("../statics/nutella.png") + ")",
                  }
            }
          >
            {!isSizeChosed ? "big(3€)" : "nutella (0.5€)"}
          </button>
        </div>
        <p
          className="mb-1"
          style={{ fontSize: "1.3em", fontWeight: "bold", color: "darkred" }}
        >
          Your order: {product.quantity}{" "}
          {product.size === "" ? "?" : product.size} size and {product.topping}{" "}
          topping.
        </p>
        <div className="mb-1">
          <h3>How many portion do you want?</h3>
          <button
            className="btn-primary btn-quantity"
            onClick={() => decQuantity()}
          >
            -
          </button>
          <span className="ml-1 mr-1" style={{ fontSize: "2rem" }}>
            {product.quantity}
          </span>
          <button
            className="btn-primary btn-quantity"
            onClick={() => incQuantity()}
          >
            +
          </button>
        </div>
        <div className="mb-1 order-row">
          <button
            className="btn-secondary ml-1"
            style={{
              padding: "0 1rem 5px 1rem",
              height: "60px",
              fontWeight: "600",
            }}
            onClick={() => clearProduct()}
          >
            Rechoose
          </button>
          <p className="ml-1" style={{ fontWeight: "600" }}>
            or
          </p>
          <button
            className="btn-primary  ml-1"
            style={{ padding: "0 1rem 5px 1rem", height: "60px" }}
            onClick={() => addToCart(product)}
          >
            Add to Cart{" "}
            <span role="img" aria-label="heart">
              🔻
            </span>
          </button>
        </div>

        <div className="shopping-cart">
          <h2 className="mb-1">Your sweetness orders</h2>
          <div className="mb-1">
            {shoppingCart.map((cartItem, index) => (
              <>
                <p key={index}>
                  {cartItem.quantity} times of {cartItem.size} size with topping{" "}
                  {cartItem.topping}
                </p>
              </>
            ))}
          </div>
          <p>gratis + {getfreeOffer} free hot Glühwein cup</p>
          <h2>Your order price is totally: {gettotalPrice}€</h2>
          <button
            className="btn-primary mt-1"
            style={{ padding: "0.8rem 1.5rem 1rem 1.5rem" }}
            disabled={
              shoppingCart.length === 0 || getName === "" ? true : false
            }
            onClick={() => (getoptionalBuy >= 0 ? history.push("/payment") : 0)}
          >
            Go to checkout
          </button>
        </div>
      </div>
    );
  }
};
export default OrderPage;
