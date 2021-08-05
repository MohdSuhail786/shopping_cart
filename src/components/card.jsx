import React, { useEffect } from "react";
import cart from "../icons/cart.png";

export default function Card({ productId, name, price, image, callback }) {
  const [added, setAdded] = React.useState(false);

  function addToCart() {
    let presentCart = localStorage.cart;
    if (presentCart == undefined) {
      presentCart = `[]`;
    }
    presentCart = JSON.parse(presentCart);
    let currentItem = {
      id: productId,
      name: name,
      price: price,
      image: image,
      quantity: 1,
    };
    presentCart.push(currentItem);
    localStorage.cart = JSON.stringify(presentCart);
    setAdded(true);
    callback();
  }

  function removeFromCart() {
    let presentCart = localStorage.cart;
    presentCart = JSON.parse(presentCart);
    let updatedCart = [];
    for (let i = 0; i < presentCart.length; i++) {
      if (presentCart[i].id == productId) {
        continue;
      }
      updatedCart.push(presentCart[i]);
    }
    localStorage.cart = JSON.stringify(updatedCart);
    setAdded(false);
    callback();
  }

  useEffect(() => {
    if (localStorage.cart == undefined) return;
    let flag = false;
    for (let i = 0; i < JSON.parse(localStorage.cart).length; i++) {
      if (JSON.parse(localStorage.cart)[i].id == productId) {
        flag = true;
        break;
      }
    }
    setAdded(flag);
  }, []);

  return (
    <>
      <div className="card">
        <img
          src={image}
          alt="Avatar"
          style={{ width: "100%", height: 280 }}
        ></img>
        <div className="container">
          <h4>
            <b>{price} $</b>
          </h4>
          <p>{name}</p>
          {!added && (
            <div
              onClick={addToCart}
              style={{
                color: "dodgerblue",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              {" "}
              ADD TO CART
            </div>
          )}
          {added && (
            <div
              onClick={removeFromCart}
              style={{
                color: "dodgerblue",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              {" "}
              REMOVE FROM CART
            </div>
          )}
        </div>
      </div>
    </>
  );
}
