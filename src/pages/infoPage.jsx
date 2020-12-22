import React from "react";
import { useHistory } from "react-router-dom";
import useOrder from "../components/useOrder";
import { useForm } from "react-hook-form";
import Nav from "../components/nav.jsx";
import "./infoPage.scss";

const InfoPage = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });
  const {
    addInfos,
    setpickupTime,
    getpickupTime,
    setpickupDate,
    getpickupDate,
  } = useOrder();
  const onSubmit = (data) => {
    const name = data.name;
    const room = data.room;
    const email = data.email;
    addInfos({ name, room, email });
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("room", room);
    sessionStorage.setItem("email", email);
    history.push("/order");
  };
  return (
    <div id="info-page">
      <Nav />
      <h3 className="mt-4 mb-1">
        Selling Schmalzkuchen only <br /> on 19-20/12/2020 only in STW Grandweg{" "}
        <br />{" "}
        <span style={{ color: "darkgreen" }}>
          {" "}
          WE ARE CLOSED THE ORDERS FOR TODAYs MORNING, please choose Pickup Time
          since 18:00 today (19/12)
        </span>{" "}
        <span style={{ color: "darkgreen" }}>
          {" "}
          FREE SHIPPING TO YOUR ROOM <br /> Please wear mask to protect
          ourselves{" "}
        </span>{" "}
        <br />
      </h3>
      <h3 className="mb-1">
        Please fill in the form below{" "}
        <span role="img" aria-label="heart">
          💖
        </span>
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          style={{ borderColor: errors.name && "yellow" }}
          ref={register({ required: true })}
        />
        <br />
        <input
          type="text"
          name="room"
          placeholder="Room"
          style={{ borderColor: errors.room && "yellow" }}
          ref={register({ required: true })}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          style={{ borderColor: errors.email && "yellow" }}
          ref={register({ required: true })}
        />
        <br />
        <div className="checkbox-group">
          <div className="mb-1">
            <h4>
              Please choose the day you want to get <br />
              (19/12 or 20/12){" "}
            </h4>
            <label className="toggle" htmlFor="toggle-1">
              <input
                type="checkbox"
                id="toggle-1"
                value={getpickupDate === "19/12" ? "20/12" : "19/12"}
                onChange={(e) => setpickupDate(e.target.value)}
              />
              <div className="slider"></div>
            </label>
            <h3>{getpickupDate}</h3>
          </div>
          <div className="mb-1">
            <h4>
              At what time do you want to receive? <br />
              (18:00-19:00 or 12:00-13:00){" "}
            </h4>
            <label className="toggle" htmlFor="toggle">
              <input
                type="checkbox"
                id="toggle"
                value={
                  getpickupTime === "18:00-19:00"
                    ? "12:00-13:00"
                    : "18:00-19:00"
                }
                onChange={(e) => setpickupTime(e.target.value)}
              />
              <div className="slider"></div>
            </label>
            <h3>{getpickupTime}</h3>
          </div>
        </div>
        <button className="btn-submit mt-1" type="submit">
          Let's choose your orders{" "}
          <span role="img" aria-label="heart">
            💖😘
          </span>
        </button>
      </form>
    </div>
  );
};

export default InfoPage;
