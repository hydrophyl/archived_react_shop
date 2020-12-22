import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { OrderProvider } from "./contexts/appContext.jsx";
import InfoPage from "./pages/infoPage.jsx";
import OrderPage from "./pages/orderPage.jsx";
import ReceiptPage from "./pages/receiptPage.jsx";
import "./global.scss";
import "./style.scss";
import "./hamburgers.css";
import NotfoundPage from "./pages/notFound.jsx";
import PaymentPage from "./pages/paymentPage.jsx";
import PaypalPage from "./pages/paypalPage.jsx";

const App = () => {
  return (
    <OrderProvider>
      <div
        className="App"
        style={{
          backgroundImage: "url(" + require("./statics/bg.jpg") + ")",
        }}
      >
        <div className="bg"></div>

        <div className="main">
          <HashRouter>
            <Switch>
              <Route exact path="/" component={InfoPage} />
              <Route path="/order" component={OrderPage} />
              <Route path="/payment" component={PaymentPage} />
              <Route path="/paypal" component={PaypalPage} />
              <Route path="/receipt" component={ReceiptPage} />
              <Route component={NotfoundPage} />
            </Switch>
          </HashRouter>
        </div>
      </div>
    </OrderProvider>
  );
};

export default App;
