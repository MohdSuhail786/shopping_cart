import React, { useEffect } from "react";
import cart from "../icons/cart.png";

export default function Header({ noOfItem, callback }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px 20px",
          backgroundColor: "dodgerblue",
          height: 50,
        }}
      >
        <h2 style={{ margin: 0, padding: 0, color: "white" }}>Shopping</h2>
        <img
          src={cart}
          style={{ height: 25, cursor: "pointer" }}
          onClick={callback}
        ></img>
        <div
          style={{
            display: "flex",
            fontSize: "0.75rem",
            justifyContent: "center",
            alignItems: "center",
            width: 18,
            height: 18,
            borderRadius: "50%",
            backgroundColor: "#d50000",
            color: "white",
            position: "fixed",
            right: 13,
            top: 10,
          }}
        >
          {noOfItem}
        </div>
      </div>
    </>
  );
}
